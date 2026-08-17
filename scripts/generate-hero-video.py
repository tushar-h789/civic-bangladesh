#!/usr/bin/env python3
"""Compose a silent looping civic hero film from the homepage landmark stills."""

from __future__ import annotations

import os
import subprocess
import sys
from dataclasses import dataclass
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
HOME_IMAGES = ROOT / "public" / "images" / "home"
OUT_DIR = ROOT / "public" / "videos"
OUT_MP4 = OUT_DIR / "hero-civic.mp4"
OUT_POSTER = OUT_DIR / "hero-civic-poster.jpg"

OUT_W = 1920
OUT_H = 1080
FPS = 24
ASPECT = OUT_W / OUT_H
SCENE_FRAMES = 132  # 5.5s
FADE_FRAMES = 30  # 1.25s


@dataclass(frozen=True)
class Shot:
    file: str
    start_zoom: float
    end_zoom: float
    start_pan: tuple[float, float]
    end_pan: tuple[float, float]


@dataclass(frozen=True)
class FrameMix:
    a_shot: int
    a_frame: int
    b_shot: int
    b_frame: int
    mix: float


SHOTS = (
    Shot("hero-shaheed-minar.png", 1.05, 1.18, (0.48, 0.62), (0.50, 0.36)),
    Shot("hero-smriti-soudho.png", 1.18, 1.06, (0.36, 0.48), (0.64, 0.50)),
    Shot("hero-ahsan-manzil.png", 1.06, 1.16, (0.44, 0.54), (0.58, 0.40)),
    Shot("hero-sixty-dome.png", 1.16, 1.05, (0.56, 0.44), (0.42, 0.56)),
    Shot("hero-bangladesh.png", 1.05, 1.20, (0.50, 0.38), (0.48, 0.64)),
)


def ease_in_out(t: float) -> float:
    return t * t * (3.0 - 2.0 * t)


def lerp(a: float, b: float, t: float) -> float:
    return a + (b - a) * t


def load_shot(shot: Shot) -> Image.Image:
    image = Image.open(HOME_IMAGES / shot.file).convert("RGB")
    if image.width < 1200 or image.height < 800:
        raise SystemExit(f"{shot.file} is too small for a cinematic crop ({image.size})")
    return image


def crop_frame(image: Image.Image, zoom: float, pan_x: float, pan_y: float) -> Image.Image:
    width, height = image.size
    if width / height >= ASPECT:
        base_h = float(height)
        base_w = height * ASPECT
    else:
        base_w = float(width)
        base_h = width / ASPECT

    crop_w = base_w / zoom
    crop_h = base_h / zoom
    max_x = max(0.0, width - crop_w)
    max_y = max(0.0, height - crop_h)
    left = max_x * pan_x
    top = max_y * pan_y
    box = (left, top, left + crop_w, top + crop_h)
    return image.resize((OUT_W, OUT_H), Image.Resampling.LANCZOS, box=box)


def shot_frame(image: Image.Image, shot: Shot, index: int) -> Image.Image:
    t = ease_in_out(index / max(SCENE_FRAMES - 1, 1))
    zoom = lerp(shot.start_zoom, shot.end_zoom, t)
    pan_x = lerp(shot.start_pan[0], shot.end_pan[0], t)
    pan_y = lerp(shot.start_pan[1], shot.end_pan[1], t)
    return crop_frame(image, zoom, pan_x, pan_y)


def build_timeline() -> list[FrameMix]:
    timeline: list[FrameMix] = []

    def append_scene(shot_index: int, start: int, end: int) -> None:
        for frame_index in range(start, end):
            timeline.append(FrameMix(shot_index, frame_index, shot_index, frame_index, 0.0))

    append_scene(0, 0, SCENE_FRAMES)
    for shot_index in range(1, len(SHOTS)):
        del timeline[-FADE_FRAMES:]
        for fade_i in range(FADE_FRAMES):
            timeline.append(
                FrameMix(
                    shot_index - 1,
                    SCENE_FRAMES - FADE_FRAMES + fade_i,
                    shot_index,
                    fade_i,
                    (fade_i + 1) / (FADE_FRAMES + 1),
                )
            )
        append_scene(shot_index, FADE_FRAMES, SCENE_FRAMES)

    # Dissolve the last landscape into the opening still so HTML loop has no cut.
    del timeline[-FADE_FRAMES:]
    for fade_i in range(FADE_FRAMES):
        timeline.append(
            FrameMix(
                len(SHOTS) - 1,
                SCENE_FRAMES - FADE_FRAMES + fade_i,
                0,
                0,
                (fade_i + 1) / FADE_FRAMES,
            )
        )
    timeline.append(FrameMix(0, 0, 0, 0, 0.0))
    return timeline


def render(ffmpeg: str) -> None:
    images = [load_shot(shot) for shot in SHOTS]
    timeline = build_timeline()
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    command = [
        ffmpeg,
        "-y",
        "-f",
        "rawvideo",
        "-pix_fmt",
        "rgb24",
        "-s",
        f"{OUT_W}x{OUT_H}",
        "-r",
        str(FPS),
        "-i",
        "-",
        "-an",
        "-c:v",
        "libx264",
        "-preset",
        "slow",
        "-tune",
        "stillimage",
        "-crf",
        "24",
        "-pix_fmt",
        "yuv420p",
        "-movflags",
        "+faststart",
        str(OUT_MP4),
    ]

    process = subprocess.Popen(
        command,
        stdin=subprocess.PIPE,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.PIPE,
    )
    assert process.stdin is not None
    poster_written = False

    try:
        for item in timeline:
            frame_a = shot_frame(images[item.a_shot], SHOTS[item.a_shot], item.a_frame)
            if item.mix <= 0:
                frame = frame_a
            else:
                frame_b = shot_frame(images[item.b_shot], SHOTS[item.b_shot], item.b_frame)
                frame = Image.blend(frame_a, frame_b, item.mix)

            if not poster_written:
                frame.save(OUT_POSTER, "JPEG", quality=86, optimize=True)
                poster_written = True

            process.stdin.write(frame.tobytes())

        process.stdin.close()
        stderr = process.stderr.read().decode("utf-8", errors="replace") if process.stderr else ""
        code = process.wait()
        if code != 0:
            raise SystemExit(f"ffmpeg failed ({code}):\n{stderr[-4000:]}")
    except BrokenPipeError as error:
        stderr = process.stderr.read().decode("utf-8", errors="replace") if process.stderr else ""
        raise SystemExit(f"ffmpeg pipe broke:\n{stderr[-4000:]}") from error

    size_mb = OUT_MP4.stat().st_size / (1024 * 1024)
    duration = len(timeline) / FPS
    print(f"Wrote {OUT_MP4} ({size_mb:.2f} MB, {len(timeline)} frames, {duration:.2f}s)")
    print(f"Wrote {OUT_POSTER}")


def main() -> None:
    ffmpeg = os.environ.get("FFMPEG") or (sys.argv[1] if len(sys.argv) > 1 else "ffmpeg")
    if ffmpeg != "ffmpeg" and not Path(ffmpeg).exists():
        raise SystemExit(f"ffmpeg not found: {ffmpeg}")
    render(ffmpeg)


if __name__ == "__main__":
    main()

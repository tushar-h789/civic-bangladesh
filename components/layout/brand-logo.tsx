import Image from "next/image";

import { cn } from "@/lib/utils";

const LOGO_SRC = "/images/common/logo.png";
const LOGO_WIDTH = 1158;
const LOGO_HEIGHT = 215;

interface BrandLogoProps {
  alt: string;
  className?: string;
  /** Rendered height in pixels. Width follows the source aspect ratio. */
  height?: number;
  priority?: boolean;
}

function BrandLogo({
  alt,
  className,
  height = 36,
  priority = false,
}: BrandLogoProps) {
  const width = Math.round((LOGO_WIDTH / LOGO_HEIGHT) * height);

  return (
    <Image
      src={LOGO_SRC}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={cn("h-auto w-auto object-contain", className)}
    />
  );
}

export { BrandLogo };

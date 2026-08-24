"use client";

import * as React from "react";
import { ChevronUp } from "lucide-react";

import { useTranslation } from "@/hooks/use-translation";
import { Button } from "@/components/ui/button";

const SHOW_AFTER_PX = 400;

function prefersReducedMotion() {
  if (typeof document === "undefined") {
    return false;
  }

  return (
    document.documentElement.classList.contains("a11y-reduce-motion") ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function ScrollToTop() {
  const { t } = useTranslation();
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const update = () => {
      setVisible(window.scrollY > SHOW_AFTER_PX);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  };

  if (!visible) {
    return null;
  }

  return (
    <Button
      type="button"
      onClick={handleClick}
      aria-label={t.common.scrollToTop}
      className="fixed right-6 bottom-20 z-40 size-12 cursor-pointer rounded-full p-0 shadow-card hover:shadow-card-hover"
    >
      <ChevronUp className="size-5" aria-hidden />
    </Button>
  );
}

export { ScrollToTop };

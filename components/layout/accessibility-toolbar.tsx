"use client";

import * as React from "react";
import { Accessibility, RotateCcw } from "lucide-react";

import { useAccessibility } from "@/hooks/use-accessibility";
import { useTranslation } from "@/hooks/use-translation";
import {
  FONT_SCALE_MAX,
  FONT_SCALE_MIN,
} from "@/redux/slices/accessibility-slice";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface ToggleRowProps {
  id: string;
  label: string;
  description: string;
  checked: boolean;
  onCheckedChange: () => void;
}

function ToggleRow({
  id,
  label,
  description,
  checked,
  onCheckedChange,
}: ToggleRowProps) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div className="flex flex-col gap-0.5">
        <Label htmlFor={id} className="text-sm font-medium text-foreground">
          {label}
        </Label>
        <p className="text-xs text-text-secondary">{description}</p>
      </div>
      <Switch id={id} checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
}

/**
 * Global accessibility toolbar for Civic Bangladesh. Mounted once in the
 * root layout so it's available from every page. Owns no visual state of
 * its own beyond whether the panel is open — all preferences live in the
 * `accessibility` Redux slice via useAccessibility(), which also handles
 * hydration/persistence. All labels come from the centralized
 * translation dictionary via useTranslation(), not hardcoded strings.
 */
function AccessibilityToolbar() {
  const [open, setOpen] = React.useState(false);
  const { t } = useTranslation();
  const a11yText = t.accessibility;
  const {
    state,
    increaseFontSize,
    decreaseFontSize,
    resetFontSize,
    toggleHighContrast,
    toggleMonochrome,
    toggleInvertColors,
    toggleLargeCursor,
    toggleHighlightLinks,
    toggleHighlightHeadings,
    toggleReduceMotion,
    resetAccessibility,
  } = useAccessibility();

  return (
    <>
      <Button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={a11yText.trigger}
        className="fixed bottom-6 left-6 z-40 size-12 rounded-full p-0 shadow-card hover:shadow-card-hover"
      >
        <Accessibility className="size-5" />
      </Button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="left"
          className="flex w-full flex-col gap-0 sm:max-w-sm"
        >
          <SheetHeader>
            <SheetTitle>{a11yText.title}</SheetTitle>
            <SheetDescription>{a11yText.description}</SheetDescription>
          </SheetHeader>

          <div className="flex flex-1 flex-col gap-1 overflow-y-auto px-4">
            <section className="flex flex-col gap-2 border-b border-border py-3">
              <span className="text-sm font-medium text-foreground">
                {a11yText.textSize.label}
              </span>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="icon-sm"
                  onClick={decreaseFontSize}
                  disabled={state.fontScale <= FONT_SCALE_MIN}
                  aria-label={a11yText.textSize.decrease}
                >
                  <span aria-hidden="true" className="text-sm font-semibold">
                    A−
                  </span>
                </Button>
                <span
                  className="min-w-12 text-center text-sm text-text-secondary"
                  aria-live="polite"
                >
                  {state.fontScale}%
                </span>
                <Button
                  type="button"
                  variant="outline"
                  size="icon-sm"
                  onClick={increaseFontSize}
                  disabled={state.fontScale >= FONT_SCALE_MAX}
                  aria-label={a11yText.textSize.increase}
                >
                  <span aria-hidden="true" className="text-sm font-semibold">
                    A+
                  </span>
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={resetFontSize}
                  disabled={state.fontScale === FONT_SCALE_MIN}
                  className="ml-auto"
                  aria-label={a11yText.textSize.reset}
                >
                  {t.common.actions.reset}
                </Button>
              </div>
            </section>

            <section className="flex flex-col divide-y divide-border border-b border-border">
              <ToggleRow
                id="a11y-high-contrast"
                label={a11yText.toggles.highContrast.label}
                description={a11yText.toggles.highContrast.description}
                checked={state.highContrast}
                onCheckedChange={toggleHighContrast}
              />
              <ToggleRow
                id="a11y-monochrome"
                label={a11yText.toggles.monochrome.label}
                description={a11yText.toggles.monochrome.description}
                checked={state.monochrome}
                onCheckedChange={toggleMonochrome}
              />
              <ToggleRow
                id="a11y-invert-colors"
                label={a11yText.toggles.invertColors.label}
                description={a11yText.toggles.invertColors.description}
                checked={state.invertColors}
                onCheckedChange={toggleInvertColors}
              />
              <ToggleRow
                id="a11y-highlight-links"
                label={a11yText.toggles.highlightLinks.label}
                description={a11yText.toggles.highlightLinks.description}
                checked={state.highlightLinks}
                onCheckedChange={toggleHighlightLinks}
              />
              <ToggleRow
                id="a11y-highlight-headings"
                label={a11yText.toggles.highlightHeadings.label}
                description={a11yText.toggles.highlightHeadings.description}
                checked={state.highlightHeadings}
                onCheckedChange={toggleHighlightHeadings}
              />
            </section>

            <section className="flex flex-col divide-y divide-border">
              <ToggleRow
                id="a11y-large-cursor"
                label={a11yText.toggles.largeCursor.label}
                description={a11yText.toggles.largeCursor.description}
                checked={state.largeCursor}
                onCheckedChange={toggleLargeCursor}
              />
              <ToggleRow
                id="a11y-reduce-motion"
                label={a11yText.toggles.reduceMotion.label}
                description={a11yText.toggles.reduceMotion.description}
                checked={state.reduceMotion}
                onCheckedChange={toggleReduceMotion}
              />
            </section>
          </div>

          <SheetFooter>
            <Button
              type="button"
              variant="outline"
              onClick={resetAccessibility}
              className="w-full"
            >
              <RotateCcw />
              {a11yText.resetAll}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}

export { AccessibilityToolbar };

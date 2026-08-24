"use client";

import { CheckIcon, LanguagesIcon } from "lucide-react";

import { useLocale } from "@/hooks/use-locale";
import { useTranslation } from "@/hooks/use-translation";
import { LOCALES, LOCALE_LABELS } from "@/locales/types";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/**
 * Global language switcher for the Bangla/English system. Reusable
 * anywhere in the site (currently mounted in the root layout; move it
 * into the navbar once that exists — no changes needed to this file).
 */
interface LanguageSwitcherProps {
  className?: string;
  /** Short locale code for tight headers (EN / বাং). Footer keeps the full label. */
  compact?: boolean;
}

function LanguageSwitcher({
  className,
  compact = false,
}: LanguageSwitcherProps) {
  const { locale, setLocale } = useLocale();
  const { t } = useTranslation();
  const label = compact
    ? locale === "en"
      ? "EN"
      : "বাং"
    : LOCALE_LABELS[locale].native;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="sm"
          aria-label={t.common.languageSwitcher.selectLanguage}
          className={className}
        >
          <LanguagesIcon />
          {label}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {LOCALES.map((option) => (
          <DropdownMenuItem
            key={option}
            onSelect={() => setLocale(option)}
            aria-current={option === locale}
          >
            <span className="flex-1">{LOCALE_LABELS[option].native}</span>
            {option === locale && <CheckIcon className="size-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { LanguageSwitcher };

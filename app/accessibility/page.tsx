import type { Metadata } from "next";

import { AccessibilityPage } from "@/components/accessibility/accessibility-page";

export const metadata: Metadata = {
  title: "Accessibility | Civic Bangladesh",
  description:
    "Change how Civic Bangladesh looks on this device: text size, contrast, motion, and highlights. These controls do not change government websites, and this is not an official accessibility statement.",
};

export default function AccessibilityRoute() {
  return <AccessibilityPage />;
}

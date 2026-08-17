import type { Metadata } from "next";
import { Inter, Noto_Sans_Bengali } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { AccessibilityToolbar } from "@/components/layout/accessibility-toolbar";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { PageWatermark } from "@/components/layout/page-watermark";
import { ReduxProvider } from "@/redux/provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial", "sans-serif"],
});

// Loaded without a fixed `weight` so Next.js serves the variable-font
// build (100–900), keeping every Tailwind font-weight utility accurate
// for Bangla copy instead of relying on browser-synthesized bold.
const notoSansBengali = Noto_Sans_Bengali({
  variable: "--font-noto-bengali",
  subsets: ["bengali"],
  display: "swap",
  preload: true,
  adjustFontFallback: false,
  fallback: ["Noto Sans Bengali", "system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  title: "Civic Bangladesh | সিভিক বাংলাদেশ",
  description:
    "An independent civic-education and government-service learning platform for Bangladesh. Learn everyday civic habits and prepare to use government services correctly. Civic Bangladesh helps you prepare — it does not process government applications.",
  applicationName: "Civic Bangladesh",
  openGraph: {
    title: "Civic Bangladesh | সিভিক বাংলাদেশ",
    description:
      "Civic education and government-service learning for Bangladesh. Independent — not the official application portal.",
    siteName: "Civic Bangladesh",
    locale: "bn_BD",
    alternateLocale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="bn"
      suppressHydrationWarning
      className={cn(
        "h-full antialiased",
        inter.variable,
        notoSansBengali.variable,
      )}
    >
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col overflow-x-hidden font-sans"
      >
        <PageWatermark />
        <ReduxProvider>
          <TooltipProvider delayDuration={200}>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </TooltipProvider>
          <AccessibilityToolbar />
          <Toaster />
        </ReduxProvider>
      </body>
    </html>
  );
}

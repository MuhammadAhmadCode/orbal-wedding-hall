import type { Metadata, Viewport } from "next";
import Script from "next/script";
import {
  Instrument_Serif,
  Plus_Jakarta_Sans,
  Gulzar,
} from "next/font/google";
import "./globals.css";

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

const gulzar = Gulzar({
  variable: "--font-gulzar",
  subsets: ["arabic"],
  weight: ["400"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Orbal Shadi Hall | The Art of the Welcome — Pakistan",
  description:
    "Orbal Shadi Hall — a grand wedding and event venue in Pakistan for up to 1,000 guests. پخیر راغلے · خوش آمدید. In-house decor, fine catering, valet parking. Check live availability and book your date in one tap.",
  openGraph: {
    title: "Orbal Shadi Hall | The Art of the Welcome",
    description:
      "A grand wedding venue for up to 1,000 guests — separate halls, fine catering and decor handled end to end. Check availability and book in one tap.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6efe3" },
    { media: "(prefers-color-scheme: dark)", color: "#1c1712" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${instrument.variable} ${gulzar.variable} ${jakarta.variable}`}
    >
      <head>
        <Script id="theme-init" strategy="beforeInteractive">
          {`(function () {
            try {
              var theme = localStorage.getItem("orbal-theme") || "light";
              document.documentElement.dataset.theme = theme;
            } catch (e) {
              document.documentElement.dataset.theme = "light";
            }
          })();`}
        </Script>
      </head>
      <body className="bg-ink text-ivory antialiased">{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Bricolage_Grotesque, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { Analytics } from "@vercel/analytics/next";
import SmoothScroll from "@/components/motion/SmoothScroll";
import IntroProvider from "@/components/motion/IntroProvider";
import MotionRoot from "@/components/motion/MotionRoot";
import Cursor from "@/components/motion/Cursor";
import Background from "@/components/layout/Background";
import Navbar from "@/components/layout/Navbar";
import BackToTop from "@/components/ui/BackToTop";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["italic"],
  variable: "--font-serif",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "Jagdeep | iSekhon — Android Developer",
  description:
    "Portfolio of Jagdeep (iSekhon) — Android Developer specializing in Java, Kotlin, Jetpack Compose, and mobile app development.",
  icons: {
    icon: "https://github.com/isekhon.png",
    shortcut: "https://github.com/isekhon.png",
    apple: "https://github.com/isekhon.png",
  },
  openGraph: {
    title: "Jagdeep | iSekhon — Android Developer",
    description:
      "Android Developer specializing in Kotlin, Jetpack Compose, and mobile app development.",
    images: ["https://github.com/isekhon.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var t = localStorage.getItem('portfolio-theme');
                if (t === 'light') document.documentElement.setAttribute('data-theme', 'light');
                if (sessionStorage.getItem('portfolio-intro-seen') === '1') document.documentElement.setAttribute('data-intro', 'skip');
              } catch(e) {}
            `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${display.variable} ${serif.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          <MotionRoot>
            <SmoothScroll>
              <IntroProvider>
                <Background />
                <Navbar />
                {children}
                <BackToTop />
                <Cursor />
              </IntroProvider>
            </SmoothScroll>
          </MotionRoot>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}

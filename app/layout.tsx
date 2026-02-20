import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import ScrollProgress from "@/components/ui/ScrollProgress";


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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
              } catch(e) {}
            `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <ThemeProvider>
          <ScrollProgress />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

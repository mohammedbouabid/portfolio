import type { Metadata } from "next";
import { Space_Grotesk, Manrope, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", weight: ["300", "400", "500", "600", "700"] });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", weight: ["200", "300", "400", "500", "600", "700", "800"] });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", weight: ["400", "700", "900"] });

export const metadata: Metadata = {
  title: "Mohammed Bouabid — Full Stack & ERP Developer",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" }
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }]
  },
  manifest: "/site.webmanifest"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${manrope.variable} ${inter.variable}`}>
      <body className="bg-surface text-on-surface font-body selection:bg-primary selection:text-white">
        {children}
        <svg aria-hidden="true" style={{ position: "absolute", width: 0, height: 0 }}>
          <filter id="rough-edge">
            <feTurbulence baseFrequency="0.04" numOctaves={3} result="noise" type="fractalNoise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale={2} />
          </filter>
        </svg>
      </body>
    </html>
  );
}

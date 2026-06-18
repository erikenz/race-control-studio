import type { Metadata, Viewport } from "next";
import {
  Geist,
  Geist_Mono,
  Inter,
  Montserrat,
  Orbitron,
} from "next/font/google";
import { LangSetter } from "@/components/lang-setter";
import "./globals.css";

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["900"],
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ["900"],
});

export const metadata: Metadata = {
  description:
    "Configure and style premium Formula 1 telemetry overlay alerts for Kick, Twitch, and YouTube streams.",
  generator: "Next.js",
  title: "Race Control Studio - Custom Kick Stream Overlay Alerts",
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { color: "white", media: "(prefers-color-scheme: light)" },
    { color: "black", media: "(prefers-color-scheme: dark)" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${montserrat.variable} ${orbitron.variable}`}
      lang="en"
    >
      <body className="font-sans antialiased">
        <LangSetter />
        {children}
      </body>
    </html>
  );
}

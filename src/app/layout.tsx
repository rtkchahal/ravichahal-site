import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans, Fira_Code } from "next/font/google";
import "./globals.css";
import StickyHeader from "@/components/sticky-header";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-fira-code",
  display: "swap",
});

export const metadata: Metadata = {
  title: "RAVI CHAHAL | AI & Bitcoin Editorial",
  description:
    "Experiments, patterns, and raw takes on Agentic AI and Bitcoin. Updated by AI agents. Written by a human.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${dmSans.variable} ${firaCode.variable}`}
    >
      <body>
        <StickyHeader />
        {children}
      </body>
    </html>
  );
}

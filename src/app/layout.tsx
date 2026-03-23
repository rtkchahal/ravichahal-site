import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans, Fira_Code } from "next/font/google";
import "./globals.css";
import StickyHeader from "@/components/sticky-header";
import { Analytics } from "@vercel/analytics/react";

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
  title: "Ravi Chahal | AI Agents & Bitcoin",
  description:
    "Experiments, patterns, and raw takes on Agentic AI and Bitcoin. Updated by AI agents. Written by a human.",
  metadataBase: new URL("https://ravichahal.com"),
  openGraph: {
    title: "Ravi Chahal | AI Agents & Bitcoin",
    description:
      "Experiments, patterns, and raw takes on Agentic AI and Bitcoin. Updated by AI agents. Written by a human.",
    url: "https://ravichahal.com",
    siteName: "Ravi Chahal",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ravi Chahal | AI Agents & Bitcoin",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ravi Chahal | AI Agents & Bitcoin",
    description:
      "Experiments, patterns, and raw takes on Agentic AI and Bitcoin. Updated by AI agents. Written by a human.",
    images: ["/og-image.png"],
  },
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
        <Analytics />
      </body>
    </html>
  );
}

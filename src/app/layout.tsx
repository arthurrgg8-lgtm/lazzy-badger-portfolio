import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { generateSchemaGraph } from "@/lib/schema";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"]
});

const sans = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"]
});

const baseUrl = "https://anuditk.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Anudit Khatri (Lazzy Badger) | Cybersecurity Researcher & Systems Developer",
    template: "%s | Anudit Khatri (Lazzy Badger)"
  },
  description:
    "Official technical portfolio of Anudit Khatri (Lazzy Badger) — Senior Cybersecurity Researcher, AI Systems Architect, Fullstack Engineer, and 2nd Place Nepal Police Hackathon Winner. Explore verified systems, research writeups, and DataCamp AI/Cloud credentials.",
  keywords: [
    "Anudit Khatri",
    "Lazzy Badger",
    "LazzyBadger",
    "anuditk",
    "Arthurrgg8-lgtm",
    "Cybersecurity Researcher Nepal",
    "Bug Bounty Hunter",
    "Nepal Police Hackathon Winner",
    "Prahari-Link",
    "AI Systems Engineer",
    "Fullstack Developer Kathmandu",
    "Next.js Developer",
    "Rust Developer",
    "Python Automation",
    "DataCamp Certified AI Engineer",
    "AWS Certified",
    "Microsoft Azure",
    "LoRa Wireless Telemetry",
    "Hardware Hacking",
    "Forensic Biometrics",
    "AI Trial Nepal",
    "VastuVision AI"
  ],
  authors: [{ name: "Anudit Khatri", url: baseUrl }],
  creator: "Anudit Khatri (Lazzy Badger)",
  publisher: "Anudit Khatri",
  applicationName: "Lazzy Badger Portfolio",
  category: "Technology & Cybersecurity Portfolio",
  formatDetection: {
    email: false,
    address: false,
    telephone: false
  },
  alternates: {
    canonical: baseUrl
  },
  openGraph: {
    type: "profile",
    firstName: "Anudit",
    lastName: "Khatri",
    username: "LazzyBadger",
    gender: "male",
    title: "Anudit Khatri (Lazzy Badger) | Cybersecurity Researcher & Systems Developer",
    description:
      "Explore systems, security research, and verified credentials by Anudit Khatri (Lazzy Badger) — Winner of Nepal Police Hackathon 2083.",
    url: baseUrl,
    siteName: "Lazzy Badger Portfolio",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Anudit Khatri (Lazzy Badger) Portfolio Preview"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Anudit Khatri (Lazzy Badger) | Cybersecurity & Systems Engineer",
    description:
      "Explore systems, security research, and verified credentials by Anudit Khatri (Lazzy Badger) — Winner of Nepal Police Hackathon 2083.",
    images: ["/opengraph-image"],
    creator: "@anudit1.5"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  icons: {
    icon: "/assets/lazzy.jpeg",
    shortcut: "/assets/lazzy.jpeg",
    apple: "/assets/lazzy.jpeg"
  }
};

export const viewport: Viewport = {
  themeColor: "#030406"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schemaGraph = generateSchemaGraph();

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
        />
      </head>
      <body className={`${display.variable} ${sans.variable}`}>{children}</body>
    </html>
  );
}

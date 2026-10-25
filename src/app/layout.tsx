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
    default: "Anudit Khatri (Lazzy Badger) | Fullstack Developer, Cybersecurity Researcher & Systems Architect",
    template: "%s | Anudit Khatri (Lazzy Badger)"
  },
  description:
    "Official portfolio of Anudit Khatri (Lazzy Badger) — Premier Fullstack Developer, AI Systems Architect, and Cybersecurity Researcher based in Kathmandu, Nepal. Winner of 2nd Place in Nepal Police Hackathon 2083 and #1 All-Time DataCamp Leaderboard. Specializing in Next.js, React, Rust, Python, cloud architecture, and mission-critical systems engineering.",
  keywords: [
    "Anudit Khatri",
    "Lazzy Badger",
    "LazzyBadger",
    "anuditk",
    "Arthurrgg8-lgtm",
    "Fullstack Developer Nepal",
    "Fullstack Engineer Kathmandu",
    "Top Next.js Developer Nepal",
    "React Developer Kathmandu",
    "Python Developer Nepal",
    "Rust Systems Programmer",
    "Cybersecurity Researcher Nepal",
    "Bug Bounty Hunter Nepal",
    "Nepal Police Hackathon Winner",
    "Prahari-Link",
    "AI Systems Engineer",
    "AI Agent Developer",
    "Model Context Protocol MCP",
    "DataCamp Nepal Rank 1",
    "DataCamp Certified AI Engineer",
    "AWS Certified Developer",
    "Microsoft Azure Architecture",
    "LoRa Wireless Telemetry",
    "Hardware Hacking",
    "Mobile Forensics DFIR",
    "AI Trial Nepal",
    "VastuVision AI",
    "Best Software Developer Portfolio Nepal",
    "Hire Fullstack Developer Nepal",
    "Web Application Development Kathmandu"
  ],
  authors: [{ name: "Anudit Khatri", url: baseUrl }],
  creator: "Anudit Khatri (Lazzy Badger)",
  publisher: "Anudit Khatri",
  applicationName: "Anudit Khatri Portfolio",
  category: "Software Development & Cybersecurity Portfolio",
  classification: "Fullstack Web Engineering, Systems Architecture, Artificial Intelligence & Cybersecurity",
  formatDetection: {
    email: false,
    address: false,
    telephone: false
  },
  alternates: {
    canonical: baseUrl
  },
  openGraph: {
    type: "website",
    title: "Anudit Khatri (Lazzy Badger) | Fullstack Developer & Systems Architect",
    description:
      "Premier Fullstack Developer, AI Systems Architect, and Cybersecurity Researcher in Kathmandu, Nepal. 2nd Place Nepal Police Hackathon Winner and #1 All-Time DataCamp Leaderboard. Explore production systems and research.",
    url: baseUrl,
    siteName: "Anudit Khatri (Lazzy Badger) - Technical Engineering Portfolio",
    locale: "en_US",
    alternateLocale: ["ne_NP"],
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
    title: "Anudit Khatri (Lazzy Badger) | Fullstack Developer & Systems Engineer",
    description:
      "Premier Fullstack Developer, AI Systems Architect, and Cybersecurity Researcher in Kathmandu, Nepal. 2nd Place Nepal Police Hackathon Winner and #1 All-Time DataCamp Leaderboard.",
    images: ["/opengraph-image"],
    creator: "@anudit1.5"
  },
  other: {
    "geo.region": "NP-BA",
    "geo.placename": "Kathmandu",
    "geo.position": "27.7172;85.3240",
    "ICBM": "27.7172, 85.3240"
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
  themeColor: "#030406",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5
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

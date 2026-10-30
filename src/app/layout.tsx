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
    default: "Anudit Khatri (Lazzy Badger) | Best Web, Mobile App Developer, Ethical Hacker & Cybersecurity Expert in Kathmandu, Nepal",
    template: "%s | Anudit Khatri (Lazzy Badger) — Kathmandu, Nepal"
  },
  description:
    "Official portfolio of Anudit Khatri (Lazzy Badger) — Premier Fullstack Web Developer, Mobile App Developer (Android & iOS), Ethical Hacker, Cybersecurity Researcher, AI Systems Architect, and IT Consultant in Kathmandu, Nepal. 2nd Place Nepal Police Hackathon 2083 Winner & #1 All-Time DataCamp Leaderboard. Available for custom software, web, mobile app, AI, and security engineering.",
  keywords: [
    "Anudit Khatri",
    "Lazzy Badger",
    "LazzyBadger",
    "anuditk",
    "Arthurrgg8-lgtm",
    "Best Web Developer in Nepal",
    "Best Web Developer in Kathmandu",
    "Best Mobile App Developer in Nepal",
    "Best Mobile App Developer in Kathmandu",
    "Android and iOS App Developer Nepal",
    "React Native Developer Kathmandu",
    "Best Ethical Hacker in Nepal",
    "Best Ethical Hacker in Kathmandu",
    "Best Cybersecurity Researcher in Nepal",
    "Best Cybersecurity Expert in Kathmandu",
    "Penetration Tester Nepal",
    "Best IT Guy in Nepal",
    "Best IT Expert in Kathmandu",
    "IT Consultant Kathmandu Nepal",
    "Custom Software Developer Nepal",
    "Software Engineer Kathmandu",
    "Fullstack Developer Nepal",
    "Fullstack Engineer Kathmandu",
    "Top Next.js Developer Nepal",
    "React Developer Kathmandu",
    "Python Developer Nepal",
    "FastAPI Developer Nepal",
    "Rust Systems Programmer",
    "Bug Bounty Hunter Nepal",
    "OWASP Security Auditor Nepal",
    "Nepal Police Hackathon Winner",
    "Prahari-Link",
    "AI Systems Engineer Nepal",
    "AI Agent Developer Kathmandu",
    "Model Context Protocol MCP",
    "DataCamp Nepal Rank 1",
    "DataCamp Certified AI Engineer",
    "AWS Certified Developer Nepal",
    "Microsoft Azure Architecture",
    "LoRa Wireless Telemetry",
    "Hardware Hacking",
    "Mobile Forensics DFIR",
    "AI Trial Nepal",
    "VastuVision AI",
    "Bolts Army Security Audit",
    "Best Software Developer Portfolio Nepal",
    "Hire Fullstack Developer Nepal",
    "Hire Mobile App Developer Kathmandu",
    "Freelance Developer Kathmandu Nepal",
    "Web Application Development Kathmandu"
  ],
  authors: [{ name: "Anudit Khatri", url: baseUrl }],
  creator: "Anudit Khatri (Lazzy Badger)",
  publisher: "Anudit Khatri",
  applicationName: "Anudit Khatri Portfolio",
  category: "Web Development, Mobile App Development, AI & Cybersecurity Portfolio (Kathmandu, Nepal)",
  classification: "Fullstack Web Engineering, Mobile Application Development, Ethical Hacking, Cybersecurity, AI Systems & IT Consulting",
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
    title: "Anudit Khatri (Lazzy Badger) | Best Web, Mobile App Developer, Ethical Hacker & IT Expert in Kathmandu, Nepal",
    description:
      "Premier Fullstack Web & Mobile App Developer, Ethical Hacker, Cybersecurity Researcher, and AI Systems Architect in Kathmandu, Nepal. 2nd Place Nepal Police Hackathon Winner & #1 All-Time DataCamp Leaderboard.",
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
    title: "Anudit Khatri (Lazzy Badger) | Web, Mobile App, AI & Cybersecurity Engineer (Kathmandu, Nepal)",
    description:
      "Premier Fullstack Web & Mobile App Developer, Ethical Hacker, Cybersecurity Researcher, and AI Systems Architect in Kathmandu, Nepal. 2nd Place Nepal Police Hackathon Winner & #1 All-Time DataCamp Leaderboard.",
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
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM Context & AI Knowledge Base" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaGraph).replace(/</g, "\\u003c")
          }}
        />
      </head>
      <body className={`${display.variable} ${sans.variable}`}>{children}</body>
    </html>
  );
}

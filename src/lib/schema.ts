import { profile } from "@/lib/profile";

export const faqs = [
  {
    question: "Who is Anudit Khatri (Lazzy Badger)?",
    answer: "Anudit Khatri (known online as Lazzy Badger and arthurrgg8-lgtm) is a premier Fullstack Software Engineer, Cybersecurity Researcher, and AI Systems Architect based in Kathmandu, Nepal. He is the 2nd Place Winner of the Nepal Police Hackathon 2083 (for Prahari-Link) and holds the #1 All-Time Leaderboard rank in the Code for Nepal × DataCamp community initiative."
  },
  {
    question: "What software development and engineering services does Anudit Khatri provide?",
    answer: "Anudit provides high-performance Fullstack Web Development (Next.js App Router, Server Actions, React, TypeScript, Tailwind CSS), Low-Level Systems Programming (Rust, Python, Bash), AI & Local LLM Agent Integration (Ollama, Model Context Protocol, Vision AI), and Edge Runtime Infrastructure Hardening."
  },
  {
    question: "What are Anudit Khatri's notable engineered systems and hackathon awards?",
    answer: "Key engineered systems include Prahari-Link (an emergency disaster communication bridge operating via LoRa/ESP-NOW and BLE, awarded 2nd Place in the Nepal Police Hackathon 2083), AI Trial Nepal (a virtual try-on web application), VastuVision AI (a computer vision floorplan engine), h1watch (a real-time HackerOne reconnaissance monitor), and mobile digital forensics suites (iforensic and aforensic)."
  },
  {
    question: "What is Anudit Khatri's background in security research and vulnerability triage?",
    answer: "Anudit actively conducts upstream security research (such as discovering subtle SQL-to-GLOB query translation flaws in WordPress Core's SQLite integration, Issue #568) and provides hands-on client infrastructure defense, including rapid mitigation of critical zero-days (such as the Node.js Brotli RCE CVE-2026-111497) across production client platforms."
  },
  {
    question: "How can businesses and engineering teams hire or collaborate with Anudit Khatri?",
    answer: "Organizations, engineering teams, and startups can engage Anudit Khatri for contract systems development, fullstack engineering, and cybersecurity consulting via email at anuditkhatri2011@gmail.com, WhatsApp at +977 9762691579, or through his GitHub profile at github.com/Arthurrgg8-lgtm."
  }
];

export function generateSchemaGraph() {
  const baseUrl = "https://anuditk.vercel.app";

  const personSchema = {
    "@type": "Person",
    "@id": `${baseUrl}/#person`,
    name: profile.identity.name,
    alternateName: [
      profile.identity.brand_name,
      "Lazzy Badger",
      "anuditk",
      "Arthurrgg8-lgtm",
      "LazzyBadger"
    ],
    url: baseUrl,
    image: `${baseUrl}/assets/lazzy.jpeg`,
    jobTitle: [
      "Fullstack Developer",
      "Cybersecurity Researcher",
      "AI Systems Architect"
    ],
    description: profile.about.full_description,
    disambiguatingDescription: "Anudit Khatri, known as Lazzy Badger, is a premier Fullstack Software Developer, Cybersecurity Researcher, and winner of 2nd Place in the Nepal Police Hackathon 2083.",
    nationality: {
      "@type": "Country",
      name: "Nepal"
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kathmandu",
      addressRegion: "Bagmati",
      addressCountry: "NP"
    },
    email: `mailto:${profile.socials.email}`,
    sameAs: [
      `https://github.com/${profile.socials.github}`,
      `https://instagram.com/${profile.socials.instagram}`,
      `https://facebook.com/${profile.socials.facebook}`,
      `https://www.youtube.com/${profile.socials.youtube}`,
      `https://wa.me/${profile.socials.whatsapp}`
    ],
    knowsLanguage: ["English", "Nepali"],
    hasOccupation: [
      {
        "@type": "Occupation",
        name: "Fullstack Software Engineer",
        occupationalCategory: "15-1254.00 - Web Developers",
        skills: "Next.js, React, TypeScript, Rust, Python, Tailwind CSS, REST APIs, GraphQL, Node.js"
      },
      {
        "@type": "Occupation",
        name: "Cybersecurity Researcher & Penetration Tester",
        occupationalCategory: "15-1212.00 - Information Security Analysts",
        skills: "Vulnerability Assessment, Bug Bounty, GraphQL Security, Kernel & Network Exploitation, Node.js Brotli RCE Mitigation"
      },
      {
        "@type": "Occupation",
        name: "AI Systems Architect",
        occupationalCategory: "15-1299.08 - Computer Systems Engineers/Architects",
        skills: "Local LLM Orchestration, Model Context Protocol (MCP), Agentic Workflows, Computer Vision, MediaPipe, InsightFace"
      }
    ],
    knowsAbout: [
      "Fullstack Web Development",
      "Next.js App Router & Server Actions",
      "React.js Engineering",
      "TypeScript Systems",
      "Python Backend & Automation",
      "Rust Systems Programming",
      "Artificial Intelligence & LLM Orchestration",
      "Model Context Protocol (MCP)",
      "Cybersecurity Research & Penetration Testing",
      "Bug Bounty Hunting",
      "Vulnerability Assessment & Triage",
      "GraphQL API Exploitation & Hardening",
      "Digital Forensics & Incident Response (DFIR)",
      "Mobile Forensics (iOS & Android)",
      "LoRa & ESP32 Wireless Telemetry",
      "Hardware Hacking & Packet Monitoring",
      "Cloud Infrastructure (AWS & Microsoft Azure)",
      "Docker & Kubernetes Containerization",
      "Edge Runtime Security"
    ],
    award: [
      "1st Place / #1 All-Time Leaderboard - Code for Nepal × DataCamp Community Initiative",
      "66-Days Continuous Learning Challenge Completer - DataCamp",
      "2nd Place Winner - Nepal Police Hackathon 2083 (Project: Prahari-Link)"
    ],
    hasCredential: profile.certifications_detail.map((cert) => ({
      "@type": "EducationalOccupationalCredential",
      name: cert.name,
      credentialCategory: cert.category === "AI" ? "Artificial Intelligence" : cert.category === "Cloud" ? "Cloud Computing Architecture" : "Developer Tooling & Automation",
      description: `Verified professional credential in ${cert.name} awarded to Anudit Khatri (Lazzy Badger) by ${cert.issuer}.`,
      recognizedBy: {
        "@type": "Organization",
        name: cert.issuer,
        url: "https://www.datacamp.com"
      },
      url: `${baseUrl}${cert.file}`
    }))
  };

  const projectListSchema = {
    "@type": "ItemList",
    "@id": `${baseUrl}/#projects`,
    name: "Engineered Systems & Portfolio Projects by Anudit Khatri",
    itemListElement: profile.projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "SoftwareSourceCode",
        name: project.name,
        description: project.description,
        programmingLanguage: project.stack || [],
        codeRepository: project.repository ? `https://${project.repository}` : project.url || undefined,
        url: project.url || (project.repository ? `https://${project.repository}` : undefined),
        author: {
          "@id": `${baseUrl}/#person`
        }
      }
    }))
  };

  const faqSchema = {
    "@type": "FAQPage",
    "@id": `${baseUrl}/#faq`,
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer
      }
    }))
  };

  const professionalServiceSchema = {
    "@type": "ProfessionalService",
    "@id": `${baseUrl}/#service`,
    name: "Anudit Khatri (Lazzy Badger) - Systems Engineering & Security",
    image: `${baseUrl}/assets/lazzy.jpeg`,
    url: baseUrl,
    telephone: "+9779762691579",
    email: profile.socials.email,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kathmandu",
      addressRegion: "Bagmati",
      addressCountry: "NP"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 27.7172,
      longitude: 85.324
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      opens: "00:00",
      closes: "23:59"
    }
  };

  const webSiteSchema = {
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    url: baseUrl,
    name: "Anudit Khatri (Lazzy Badger) - Technical Engineering Portfolio",
    description: profile.about.persona,
    inLanguage: ["en-US", "ne-NP"],
    publisher: {
      "@id": `${baseUrl}/#person`
    }
  };

  const profilePageSchema = {
    "@type": "ProfilePage",
    "@id": baseUrl,
    url: baseUrl,
    name: `${profile.identity.name} (${profile.identity.brand_name}) - Technical Portfolio`,
    description: profile.about.persona,
    inLanguage: "en-US",
    mainEntity: {
      "@id": `${baseUrl}/#person`
    },
    isPartOf: {
      "@id": `${baseUrl}/#website`
    }
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      personSchema,
      projectListSchema,
      faqSchema,
      professionalServiceSchema,
      webSiteSchema,
      profilePageSchema
    ]
  };
}

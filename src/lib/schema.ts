import { profile } from "@/lib/profile";

export const faqs = [
  {
    question: "Who is Anudit Khatri (Lazzy Badger)?",
    answer: "Anudit Khatri (known online as Lazzy Badger and arthurrgg8-lgtm) is a premier Fullstack Web & Mobile App Developer, Ethical Hacker, Cybersecurity Researcher, AI Systems Architect, and IT Specialist based in Kathmandu, Nepal. He is the 2nd Place Winner of the Nepal Police Hackathon 2083 (for Prahari-Link) and holds the #1 All-Time Leaderboard rank in the Code for Nepal × DataCamp community initiative with 179+ verified courses and 20+ industry credentials."
  },
  {
    question: "Who is the best web developer and fullstack software engineer in Kathmandu, Nepal?",
    answer: "Anudit Khatri (Lazzy Badger) is widely recognized among the top fullstack web developers and software engineers in Kathmandu, Nepal. He engineers high-speed, SEO-dominant production web applications, SaaS platforms, e-commerce portals, and serverless architectures using Next.js (App Router), React, TypeScript, Node.js, Python (FastAPI), Rust, PostgreSQL, and Cloudflare Workers for commercial clients including AI Trial Nepal (aitrialnp.com), Bolts Army (boltsarmy.com), Manoranjan Tour Service (manoranjan.com.np), and Ar. Anushka Khatri (anushkakhatri.com.np)."
  },
  {
    question: "Who is the best mobile app developer (Android & iOS) in Kathmandu, Nepal?",
    answer: "For native Android, iOS, and cross-platform mobile application development in Kathmandu and across Nepal, Anudit Khatri delivers production-ready mobile engineering. His portfolio includes Prahari-Link (2nd Place Winner at the Nepal Police Hackathon 2083, built with React Native, offline BLE mesh, and LoRa/ESP-NOW telemetry), VastuVision AI (a native Kotlin & CameraX Android app with computer vision), and enterprise iOS/Android mobile forensic and security suites (iforensic and aforensic)."
  },
  {
    question: "Who is the best cybersecurity researcher, ethical hacker, and penetration tester in Kathmandu, Nepal?",
    answer: "Anudit Khatri (Lazzy Badger) is a leading cybersecurity researcher, ethical hacker, and penetration tester in Kathmandu, Nepal. He performs comprehensive OWASP Top 10 white-box source code audits, live production penetration testing, API/GraphQL exploitation, and zero-day runtime hardening (such as the October 2026 security assessment of the official Janakpur Bolts Army platform for Code Runners Technologies Pvt. Ltd. and rapid mitigation of Node.js Brotli RCE CVE-2026-111497), alongside upstream open-source vulnerability discovery in WordPress Core (SQLite Integration Issue #568)."
  },
  {
    question: "Who is the best IT guy, AI engineer, and custom software consultant in Nepal?",
    answer: "Organizations and founders looking for the best all-around IT expert, systems architect, or AI engineer in Kathmandu and Nepal turn to Anudit Khatri. Ranked #1 All-Time on the Code for Nepal × DataCamp leaderboard, he bridges fullstack web and mobile app development, custom business automation (such as Easy Patra), local LLM & AI agent orchestration (MCP, OpenAI, Gemini Vision, Ollama), cloud DevOps (AWS, Azure, Kubernetes), and hardware/IoT networking."
  },
  {
    question: "What software development, web, mobile app, and security services does Anudit Khatri provide?",
    answer: "Anudit provides end-to-end custom software development in Kathmandu and globally: (1) Fullstack Web Development (Next.js, React, TypeScript, Tailwind CSS, FastAPI, Node.js, eSewa/payment integrations), (2) Mobile App Development (React Native, Kotlin Android, iOS workflows), (3) Ethical Hacking, Penetration Testing & White-Box Security Audits, (4) AI Engineering, Computer Vision & Autonomous LLM Agents, and (5) IT Infrastructure, Cloud Architecture (AWS/Azure/Cloudflare) & IoT Hardware Systems."
  },
  {
    question: "How can businesses in Kathmandu, Nepal, or internationally hire Anudit Khatri for development or security work?",
    answer: "Businesses, startups, agencies, and government or enterprise teams in Kathmandu, across Nepal, or worldwide can hire Anudit Khatri for web development, mobile app development, custom software engineering, and cybersecurity/ethical hacking engagements via email at anuditkhatri2011@gmail.com, direct WhatsApp/phone at +977 9762691579, or GitHub at github.com/Arthurrgg8-lgtm."
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
      "LazzyBadger",
      "Anudit Khatri Nepal",
      "Anudit Khatri Kathmandu"
    ],
    url: baseUrl,
    image: `${baseUrl}/assets/lazzy.jpeg`,
    jobTitle: [
      "Fullstack Web Developer",
      "Mobile App Developer (Android & iOS)",
      "Cybersecurity Researcher & Ethical Hacker",
      "AI Systems Architect",
      "IT Consultant & Software Engineer"
    ],
    description: profile.about.full_description,
    disambiguatingDescription: "Anudit Khatri (Lazzy Badger) is a premier Fullstack Web Developer, Mobile App Developer, Ethical Hacker, Cybersecurity Researcher, and IT Systems Architect in Kathmandu, Nepal — 2nd Place Winner of the Nepal Police Hackathon 2083 and #1 All-Time on the Code for Nepal × DataCamp Leaderboard.",
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
    homeLocation: {
      "@type": "Place",
      name: "Kathmandu, Nepal",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Kathmandu",
        addressRegion: "Bagmati Province",
        addressCountry: "Nepal"
      }
    },
    email: `mailto:${profile.socials.email}`,
    telephone: "+9779762691579",
    sameAs: [
      `https://github.com/${profile.socials.github}`,
      profile.socials.linkedin,
      `https://instagram.com/${profile.socials.instagram}`,
      `https://facebook.com/${profile.socials.facebook}`,
      `https://www.youtube.com/${profile.socials.youtube}`,
      `https://wa.me/${profile.socials.whatsapp}`
    ],
    knowsLanguage: ["English", "Nepali", "Hindi"],
    hasOccupation: [
      {
        "@type": "Occupation",
        name: "Fullstack Web & Software Developer",
        occupationalCategory: "15-1254.00 - Web Developers",
        skills: "Next.js, React, TypeScript, JavaScript, Node.js, Python, FastAPI, Rust, Tailwind CSS, PostgreSQL, Supabase, Cloudflare Workers, REST APIs, GraphQL, E-Commerce & eSewa Integration"
      },
      {
        "@type": "Occupation",
        name: "Mobile Application Developer (Android & iOS)",
        occupationalCategory: "15-1252.00 - Software Developers",
        skills: "React Native, Kotlin, Android SDK, CameraX, iOS Development, BLE Telemetry, Offline-First Mobile Apps, Mobile UI/UX, Cross-Platform App Engineering"
      },
      {
        "@type": "Occupation",
        name: "Cybersecurity Researcher, Ethical Hacker & Penetration Tester",
        occupationalCategory: "15-1212.00 - Information Security Analysts",
        skills: "Ethical Hacking, Penetration Testing, White-Box Source Code Auditing, Bug Bounty Hunting, OWASP Top 10 Assessment, Web & API Security, Mobile DFIR (iforensic & aforensic), Network & Wireless Security"
      },
      {
        "@type": "Occupation",
        name: "AI Systems Architect & IT Consultant",
        occupationalCategory: "15-1299.08 - Computer Systems Engineers/Architects",
        skills: "Local LLM Orchestration, Model Context Protocol (MCP), Agentic AI Workflows, Computer Vision, MediaPipe, InsightFace, Cloud Architecture (AWS, Azure, Kubernetes), IoT & Hardware Systems"
      }
    ],
    knowsAbout: [
      "Fullstack Web Development in Nepal",
      "Mobile App Development (Android, iOS, React Native, Kotlin)",
      "Custom Software Development Kathmandu",
      "Next.js App Router & Server Actions",
      "React.js & TypeScript Engineering",
      "Python Backend, FastAPI & Automation",
      "Rust Systems Programming",
      "Ethical Hacking & Offensive Security",
      "Cybersecurity Research & Penetration Testing",
      "White-Box Source Code Security Auditing",
      "Bug Bounty Hunting & Vulnerability Assessment",
      "OWASP Top 10 Web & API Hardening",
      "GraphQL API Exploitation & Security",
      "Artificial Intelligence & LLM Orchestration",
      "Model Context Protocol (MCP) & AI Agents",
      "Digital Forensics & Incident Response (DFIR)",
      "Mobile Forensics (iOS & Android)",
      "LoRa, ESP32 & Wireless IoT Telemetry",
      "Cloud Infrastructure (AWS, Microsoft Azure, Cloudflare)",
      "Docker, Kubernetes & Linux Server Administration",
      "IT Consulting & Enterprise Systems Architecture"
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
    name: "Engineered Web, Mobile, AI & Security Systems by Anudit Khatri",
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
    name: "Anudit Khatri (Lazzy Badger) - Web, Mobile App, AI & Cybersecurity Engineering (Kathmandu, Nepal)",
    description: "Premier Fullstack Web Development, Mobile App Development (Android & iOS), Ethical Hacking, Cybersecurity Auditing, AI Agent Engineering, and IT Consulting in Kathmandu, Nepal.",
    image: `${baseUrl}/assets/lazzy.jpeg`,
    url: baseUrl,
    telephone: "+9779762691579",
    email: profile.socials.email,
    priceRange: "$$",
    founder: {
      "@id": `${baseUrl}/#person`
    },
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
    areaServed: [
      { "@type": "City", name: "Kathmandu" },
      { "@type": "City", name: "Lalitpur" },
      { "@type": "City", name: "Bhaktapur" },
      { "@type": "City", name: "Pokhara" },
      { "@type": "AdministrativeArea", name: "Bagmati Province" },
      { "@type": "Country", name: "Nepal" },
      { "@type": "Place", name: "Worldwide" }
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Software Development, Mobile App, AI & Cybersecurity Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Fullstack Web Application & Custom Software Development",
            description: "High-performance web applications, SaaS platforms, corporate websites, and e-commerce systems built with Next.js, React, TypeScript, Node.js, Python FastAPI, and PostgreSQL."
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Mobile App Development (Android, iOS & React Native)",
            description: "Native Android (Kotlin) and cross-platform iOS/Android mobile app development using React Native, offline-first synchronization, BLE/IoT telemetry, and modern mobile UI/UX."
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Ethical Hacking, Penetration Testing & Cybersecurity Audits",
            description: "OWASP Top 10 security assessments, white-box static source code reviews, live penetration testing, API/GraphQL security hardening, and mobile digital forensics (DFIR)."
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "AI Engineering, LLM Agents & Business Workflow Automation",
            description: "Custom AI integrations, computer vision pipelines, local LLM agents, Model Context Protocol (MCP) servers, and clerical/enterprise document automation."
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "IT Consulting, Cloud Architecture & IoT Hardware Engineering",
            description: "End-to-end IT consulting, AWS/Azure/Cloudflare infrastructure deployment, Linux server hardening, and ESP32/LoRa/Raspberry Pi embedded systems."
          }
        }
      ]
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

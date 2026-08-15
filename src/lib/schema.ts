import { profile } from "@/lib/profile";

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
    jobTitle: "Cybersecurity Researcher & Fullstack Systems Engineer",
    description: profile.about.full_description,
    disambiguatingDescription: "Anudit Khatri, known as Lazzy Badger, is a cybersecurity researcher, AI systems developer, and winner of 2nd Place in the Nepal Police Hackathon 2083.",
    nationality: {
      "@type": "Country",
      name: "Nepal"
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kathmandu",
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
    knowsAbout: [
      "Cybersecurity Research",
      "Vulnerability Assessment & Penetration Testing",
      "Bug Bounty",
      "Next.js Development",
      "Fullstack Web Development",
      "Rust Programming",
      "Python Systems",
      "Artificial Intelligence & LLM Orchestration",
      "LoRa & ESP32 Wireless Telemetry",
      "Hardware Hacking & Packet Monitoring",
      "Biometric Systems & Forensic Analysis",
      "Cloud Infrastructure (AWS & Azure)"
    ],
    award: [
      "2nd Place Winner - Nepal Police Hackathon 2083 (Prahari-Link)"
    ],
    hasCredential: profile.certifications_detail.map((cert) => ({
      "@type": "EducationalOccupationalCredential",
      name: cert.name,
      credentialCategory: cert.category,
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
      "@type": "WebSite",
      "@id": `${baseUrl}/#website`,
      url: baseUrl,
      name: "Lazzy Badger Portfolio",
      publisher: {
        "@id": `${baseUrl}/#person`
      }
    }
  };

  return {
    "@context": "https://schema.org",
    "@graph": [personSchema, projectListSchema, profilePageSchema]
  };
}

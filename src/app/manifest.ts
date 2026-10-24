import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Anudit Khatri (Lazzy Badger) - Fullstack Developer & Systems Architect",
    short_name: "LazzyBadger",
    description: "Official portfolio of Anudit Khatri (Lazzy Badger) — Premier Fullstack Developer, Cybersecurity Researcher, and AI Systems Architect based in Kathmandu, Nepal.",
    start_url: "/",
    display: "standalone",
    background_color: "#030406",
    theme_color: "#d7b56d",
    icons: [
      {
        src: "/assets/lazzy.jpeg",
        sizes: "192x192",
        type: "image/jpeg"
      },
      {
        src: "/assets/lazzy.jpeg",
        sizes: "512x512",
        type: "image/jpeg"
      }
    ]
  };
}

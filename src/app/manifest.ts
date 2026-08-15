import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Anudit Khatri (Lazzy Badger) - Technical Portfolio",
    short_name: "LazzyBadger",
    description: "Personal technical portfolio and cybersecurity systems workbench for Anudit Khatri (Lazzy Badger).",
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

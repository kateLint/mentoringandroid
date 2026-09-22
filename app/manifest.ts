import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Android System Design Mentorship | Kate Lint",
    short_name: "AndroidMentorship",
    description: "1:1 Android System Design & Senior Engineering Mentorship with Kate Lint.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#10b981",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
    shortcuts: [
      {
        name: "Book 1:1 Session",
        url: "/book",
        description: "Book an intensive 90-minute Android architecture session",
      },
      {
        name: "Diagnostic Quiz",
        url: "/assessment",
        description: "Assess your readiness for Staff/Senior Android interviews",
      },
      {
        name: "Architecture Resources",
        url: "/resources",
        description: "Explore free Android blueprints and checklists",
      },
    ],
  };
}

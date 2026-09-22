import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api/"],
      },
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "Google-Extended",
          "ClaudeBot",
          "PerplexityBot",
        ],
        allow: ["/", "/resources", "/assessment", "/llms.txt"],
        disallow: ["/admin", "/api/"],
      },
    ],
    sitemap: "https://mentoringandroid.dev/sitemap.xml",
  };
}

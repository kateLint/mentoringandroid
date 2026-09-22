import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://mentoringandroid.dev";
  const routes = [
    "",
    "/mentoring",
    "/book",
    "/booking/reschedule",
    "/resources",
    "/assessment",
    "/simulator",
    "/privacy",
    "/terms",
    "/refunds",
    "/contact",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" || route === "/resources" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : route === "/book" || route === "/resources" ? 0.9 : 0.7,
  }));
}

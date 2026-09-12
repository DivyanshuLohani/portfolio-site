import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://divyanshulohani.xyz";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/chat"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

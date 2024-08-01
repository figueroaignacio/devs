// Config
import { siteConfig } from "@/src/config/site";

import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/private/",
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
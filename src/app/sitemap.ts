import type { MetadataRoute } from "next";
import { services } from "@/lib/services";
import { site } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/services",
    ...services.map((s) => `/services/${s.slug}`),
    "/about",
    "/service-areas",
    "/contact",
    "/request-a-quote",
    "/privacy",
  ].map((path) => ({ url: site.url + path }));
}

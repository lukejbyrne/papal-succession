import type { MetadataRoute } from "next";
import { getPeople } from "@/lib/data";
import { canonicalUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const people = getPeople();
  return [
    { url: canonicalUrl("/"), priority: 1 },
    { url: canonicalUrl("/start-here"), priority: 0.9 },
    { url: canonicalUrl("/directory"), priority: 0.85 },
    { url: canonicalUrl("/antipopes"), priority: 0.75 },
    { url: canonicalUrl("/about"), priority: 0.7 },
    { url: canonicalUrl("/support"), priority: 0.55 },
    ...people.map((p) => ({ url: canonicalUrl(`/popes/${p.id}`), priority: p.significance >= 3 ? 0.65 : 0.5 })),
  ];
}

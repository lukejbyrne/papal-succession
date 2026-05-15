export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://popes.io").replace(/\/$/, "");

export const SITE_NAME = "Papal Succession";

export const SITE_DESC =
  "Trace every pope from Peter to Leo XIV through a sourced timeline, succession graph, and searchable directory.";

export function canonicalUrl(path = "/"): string {
  if (/^https?:\/\//.test(path)) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}

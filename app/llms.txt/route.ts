import { getPeople, getRelationships } from "@/lib/data";
import { pontificateRange } from "@/lib/dates";

export const dynamic = "force-static";

export function GET() {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://popes-io.netlify.app";
  const people = getPeople();
  const rels = getRelationships();
  const major = people
    .filter((p) => p.significance >= 3)
    .sort((a, b) => (a.papal_order ?? 9999) - (b.papal_order ?? 9999));

  const lines: string[] = [];
  lines.push("# Papal Succession");
  lines.push("");
  lines.push(
    "> A sourced visualization of every pope from Peter to Leo XIV, using the Holy See's Pontiffs table for pontificate dates, secular names, birthplaces, and order."
  );
  lines.push("");
  lines.push(`Total popes tracked: ${people.length}. Total succession links: ${rels.length}.`);
  lines.push("");
  lines.push("## Core pages");
  lines.push(`- [Succession home](${base}/): interactive timeline and local succession context for all popes.`);
  lines.push(`- [Start here](${base}/start-here): beginner guide to the timeline, evidence labels, and eras.`);
  lines.push(`- [Directory](${base}/directory): searchable index of every pope.`);
  lines.push(`- [Antipopes](${base}/antipopes): plan for disputed claimants as a separate layer.`);
  lines.push(`- [Methodology](${base}/about): source policy and caveats for early traditional dates.`);
  lines.push(`- [Support](${base}/support): support options for richer notes and future research layers.`);
  lines.push("");
  lines.push("## Data");
  lines.push(`- [Popes JSON](${base}/api/people.json): full structured data for all ${people.length} popes.`);
  lines.push(`- [Succession JSON](${base}/api/relationships.json): all ${rels.length} immediate succession links.`);
  lines.push("");
  lines.push("## Major popes");
  for (const p of major) {
    lines.push(`- [${p.name} (${pontificateRange(p).text})](${base}/popes/${p.id}): ${p.short_bio}`);
  }

  return new Response(lines.join("\n"), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}

import { getPeople } from "@/lib/data";
import DirectoryClient from "./DirectoryClient";
import { canonicalUrl } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Directory",
  description: "All popes from Peter to the current pope, searchable by papal name, secular name, birthplace, and century.",
  alternates: { canonical: canonicalUrl("/directory") },
  openGraph: {
    title: "Directory",
    description: "All popes from Peter to the current pope, searchable by papal name, secular name, birthplace, and century.",
    url: canonicalUrl("/directory"),
    type: "website",
  },
};

export default function DirectoryPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="font-serif text-4xl mb-2">Directory</h1>
      <p className="text-ink/60 mb-6">All {getPeople().length} popes, AD 30 to present. Search by name, secular name, birthplace, or century.</p>
      <DirectoryClient people={getPeople()} />
    </div>
  );
}

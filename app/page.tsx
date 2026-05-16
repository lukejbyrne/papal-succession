import { getPeople, getRelationships } from "@/lib/data";
import Link from "next/link";
import HomeView from "@/components/HomeView";
import HeroChain from "@/components/HeroChain";
import FutureLayers from "@/components/FutureLayers";
import SupportOptions from "@/components/SupportOptions";
import { canonicalUrl, SITE_DESC, SITE_NAME } from "@/lib/seo";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { absolute: SITE_NAME },
  description: SITE_DESC,
  alternates: { canonical: canonicalUrl("/") },
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESC,
    url: canonicalUrl("/"),
    type: "website",
  },
};

export default function Home() {
  const people = getPeople();
  const relationships = getRelationships();

  if (people.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20">
        <h1 className="text-4xl mb-4">Papal Succession</h1>
        <p className="text-ink/70">
          Data is being assembled. Run <code className="bg-ink/10 px-1 rounded">node scripts/build-pope-data.mjs</code> to fetch the official Pontiffs table and create <code>data/people.json</code> plus <code>data/relationships.json</code>.
        </p>
      </div>
    );
  }

  return (
    <>
      <HeroChain />
      <section className="max-w-5xl mx-auto px-4 py-10 border-t border-ink/10">
        <div className="grid md:grid-cols-2 gap-4">
          <Link
            href="/start-here"
            className="group rounded-md border border-ink/10 bg-ink/[0.025] p-5 hover:border-accent transition-colors"
          >
            <p className="text-[11px] uppercase tracking-[0.2em] text-ink/45 mb-3">
              Guided start
            </p>
            <h2 className="font-serif text-3xl text-ink group-hover:text-accent mb-2">
              Understand the sequence before the names blur
            </h2>
            <p className="text-sm text-ink/65">
              A plain-English route through the major eras, the evidence labels, and how to read
              date ranges in the early lists.
            </p>
          </Link>
          <Link
            href="/directory"
            className="group rounded-md border border-ink/10 bg-ink/[0.025] p-5 hover:border-accent transition-colors"
          >
            <p className="text-[11px] uppercase tracking-[0.2em] text-ink/45 mb-3">
              Directory
            </p>
            <h2 className="font-serif text-3xl text-ink group-hover:text-accent mb-2">
              Search every pope in the dataset
            </h2>
            <p className="text-sm text-ink/65">
              Filter by papal name, secular name, birthplace, century, or the note attached to the
              pontificate.
            </p>
          </Link>
          <Link
            href="/antipopes"
            className="group rounded-md border border-ink/10 bg-ink/[0.025] p-5 hover:border-accent transition-colors"
          >
            <p className="text-[11px] uppercase tracking-[0.2em] text-ink/45 mb-3">
              Disputed claimants
            </p>
            <h2 className="font-serif text-3xl text-ink group-hover:text-accent mb-2">
              Understand why antipopes need a separate layer
            </h2>
            <p className="text-sm text-ink/65">
              The official line stays clear, while rival obediences and contested claimants are
              handled honestly beside it.
            </p>
          </Link>
          <Link
            href="/support"
            className="group rounded-md border border-ink/10 bg-ink/[0.025] p-5 hover:border-accent transition-colors"
          >
            <p className="text-[11px] uppercase tracking-[0.2em] text-ink/45 mb-3">
              Support
            </p>
            <h2 className="font-serif text-3xl text-ink group-hover:text-accent mb-2">
              Fund richer notes and future research layers
            </h2>
            <p className="text-sm text-ink/65">
              Keep the site free while pricing the work needed for disputed claimants, teaching
              materials, and major pope essays.
            </p>
          </Link>
        </div>
      </section>
      <HomeView people={people} relationships={relationships} />
      <FutureLayers />
      <SupportOptions />
    </>
  );
}

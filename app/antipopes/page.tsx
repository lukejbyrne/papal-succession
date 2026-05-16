import Link from "next/link";
import type { Metadata } from "next";
import { canonicalUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Antipopes and disputed claimants",
  description:
    "Why Papal Succession keeps the official pope line clear while preparing a separate layer for antipopes and disputed claimants.",
  alternates: { canonical: canonicalUrl("/antipopes") },
  openGraph: {
    title: "Antipopes and disputed claimants",
    description:
      "Why Papal Succession keeps the official pope line clear while preparing a separate layer for antipopes and disputed claimants.",
    url: canonicalUrl("/antipopes"),
    type: "article",
  },
};

const CLAIMANTS = [
  ["Hippolytus", "Third century", "Early Roman division, later remembered with reconciliation in view."],
  ["Felix II", "Fourth century", "A useful test case for how later lists and local memory can diverge."],
  ["Laurentius", "498-506", "A contested Roman election where faction, imperial politics, and recognition matter."],
  ["Anacletus II", "1130-1138", "A medieval disputed election that cannot be explained by the official line alone."],
  ["Clement VII", "1378-1394", "The Avignon claimant who begins the Western Schism line."],
  ["Benedict XIII", "1394-1423", "The long Avignon persistence after much of Europe had moved toward settlement."],
  ["Alexander V", "1409-1410", "A Pisan claimant created by an attempted solution that became a third obedience."],
  ["John XXIII", "1410-1415", "The Pisan claimant whose numbering history is part of why John XXI looks strange."],
];

export default function AntipopesPage() {
  return (
    <article className="max-w-5xl mx-auto px-4 py-12 text-ink/85">
      <Link href="/" className="text-sm text-ink/60 hover:text-accent">
        ← Succession
      </Link>

      <header className="mt-4 mb-12 max-w-3xl">
        <p className="text-[11px] uppercase tracking-[0.22em] text-ink/45 mb-3">Disputed claimants</p>
        <h1 className="font-serif text-5xl sm:text-6xl text-ink leading-[1.02]">
          Antipopes belong beside the line, not inside it
        </h1>
        <p className="text-lg text-ink/70 mt-4 leading-relaxed">
          The main timeline follows the Holy See's official sequence of popes. Antipopes and disputed
          claimants are historically important, but mixing them into the same line would make the
          central reference harder to trust.
        </p>
      </header>

      <section className="grid md:grid-cols-3 gap-4 mb-12">
        <div className="rounded-md border border-ink/10 bg-ink/[0.025] p-5">
          <p className="text-[11px] uppercase tracking-[0.18em] text-ink/45 mb-2">Rule one</p>
          <h2 className="font-serif text-2xl text-ink">Official sequence first</h2>
          <p className="text-sm text-ink/65 mt-2">The primary timeline should remain a stable lookup tool.</p>
        </div>
        <div className="rounded-md border border-ink/10 bg-ink/[0.025] p-5">
          <p className="text-[11px] uppercase tracking-[0.18em] text-ink/45 mb-2">Rule two</p>
          <h2 className="font-serif text-2xl text-ink">Dispute labels visible</h2>
          <p className="text-sm text-ink/65 mt-2">Future claimant records need clear labels, dates, and source notes.</p>
        </div>
        <div className="rounded-md border border-ink/10 bg-ink/[0.025] p-5">
          <p className="text-[11px] uppercase tracking-[0.18em] text-ink/45 mb-2">Rule three</p>
          <h2 className="font-serif text-2xl text-ink">No false drama</h2>
          <p className="text-sm text-ink/65 mt-2">Only contested places should branch; most succession is simply ordered.</p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="font-serif text-3xl text-ink mb-4">Claimants a future layer should track</h2>
        <div className="divide-y divide-ink/10 border-y border-ink/10">
          {CLAIMANTS.map(([name, years, note]) => (
            <div key={name} className="grid sm:grid-cols-[170px_150px_1fr] gap-3 py-4">
              <strong className="font-serif text-xl text-ink">{name}</strong>
              <span className="text-sm tabular-nums text-ink/55">{years}</span>
              <span className="text-sm text-ink/65">{note}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-md border border-accent/25 bg-accent/10 p-5">
        <h2 className="font-serif text-2xl text-ink mb-2">Best next revision</h2>
        <p className="text-sm text-ink/70 max-w-3xl">
          Add these claimants as a toggleable layer on the timeline, with each disputed obedience
          visibly separate from the official papal sequence. That keeps the site honest and useful.
        </p>
        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          <Link href="/support" className="px-4 py-2 bg-ink text-parchment rounded hover:bg-accent">
            Fund this layer
          </Link>
          <Link href="/#crises" className="px-4 py-2 border border-ink/25 rounded hover:border-accent hover:text-accent">
            See succession crises
          </Link>
        </div>
      </section>
    </article>
  );
}

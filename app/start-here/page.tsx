import Link from "next/link";
import { getPeople, getRelationships } from "@/lib/data";
import { canonicalUrl } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Start here",
  description:
    "A plain-English guide to reading the papal succession timeline, evidence labels, and major eras.",
  alternates: { canonical: canonicalUrl("/start-here") },
  openGraph: {
    title: "Start here",
    description:
      "A plain-English guide to reading the papal succession timeline, evidence labels, and major eras.",
    url: canonicalUrl("/start-here"),
    type: "article",
  },
};

const ERAS = [
  ["AD 30-313", "Early church", "Peter through the age before Constantine."],
  ["313-590", "Imperial church", "The papacy inside a Christian Roman world."],
  ["590-1054", "Early medieval", "Gregory the Great through the widening East-West distance."],
  ["1054-1309", "High medieval", "Reform, crusades, canon law, and strong papal monarchy."],
  ["1309-1517", "Avignon and Renaissance", "Avignon, return to Rome, Renaissance politics."],
  ["1517-1870", "Reformation to Vatican I", "Reformation, missions, revolution, and modern states."],
  ["1870-present", "Modern", "Vatican I, Vatican II, global Catholicism, and the present pope."],
];

export default function StartHere() {
  const people = getPeople();
  const rels = getRelationships();
  const current = people.find((p) => p.current_pope);

  return (
    <article className="max-w-5xl mx-auto px-4 py-12 text-ink/85">
      <Link href="/" className="text-sm text-ink/60 hover:text-accent">
        ← Succession
      </Link>

      <header className="mt-4 mb-12 max-w-3xl">
        <p className="text-[11px] uppercase tracking-[0.22em] text-ink/45 mb-3">Beginner map</p>
        <h1 className="font-serif text-5xl sm:text-6xl text-ink leading-[1.02]">
          Read the papal timeline without getting lost
        </h1>
        <p className="text-lg text-ink/70 mt-4 leading-relaxed">
          Start with the sequence. Every pope is a bar, every immediate successor is a link, and
          the early succession is labelled more cautiously where the dates are traditional.
        </p>
      </header>

      <section className="grid md:grid-cols-3 gap-4 mb-12">
        <div className="border border-ink/10 rounded-md p-5 bg-ink/[0.025]">
          <div className="font-serif text-4xl text-ink">{people.length}</div>
          <p className="text-sm text-ink/60 mt-1">Popes in the dataset</p>
        </div>
        <div className="border border-ink/10 rounded-md p-5 bg-ink/[0.025]">
          <div className="font-serif text-4xl text-ink">{rels.length}</div>
          <p className="text-sm text-ink/60 mt-1">Immediate succession links</p>
        </div>
        <div className="border border-ink/10 rounded-md p-5 bg-ink/[0.025]">
          <div className="font-serif text-4xl text-ink">{current?.name ?? "Current"}</div>
          <p className="text-sm text-ink/60 mt-1">Current pope</p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="font-serif text-3xl text-ink mb-4">Use the site in three moves</h2>
        <ol className="grid md:grid-cols-3 gap-4">
          <li className="border-t border-ink/15 pt-4">
            <div className="text-[11px] uppercase tracking-wider text-ink/45 mb-2">1</div>
            <h3 className="font-serif text-2xl text-ink">Scan the timeline</h3>
            <p className="text-sm text-ink/65 mt-2">Long bars are long pontificates. Clusters show fast turnover.</p>
          </li>
          <li className="border-t border-ink/15 pt-4">
            <div className="text-[11px] uppercase tracking-wider text-ink/45 mb-2">2</div>
            <h3 className="font-serif text-2xl text-ink">Click a pope</h3>
            <p className="text-sm text-ink/65 mt-2">The line highlights predecessors back to Peter and successors forward.</p>
          </li>
          <li className="border-t border-ink/15 pt-4">
            <div className="text-[11px] uppercase tracking-wider text-ink/45 mb-2">3</div>
            <h3 className="font-serif text-2xl text-ink">Open the page</h3>
            <p className="text-sm text-ink/65 mt-2">Each page shows dates, secular name, birthplace, neighbors, and sources.</p>
          </li>
        </ol>
      </section>

      <section className="mb-12">
        <h2 className="font-serif text-3xl text-ink mb-4">Major eras</h2>
        <div className="divide-y divide-ink/10 border-y border-ink/10">
          {ERAS.map(([years, title, body]) => (
            <div key={title} className="grid sm:grid-cols-[140px_1fr] gap-3 py-4">
              <div className="text-sm tabular-nums text-ink/55">{years}</div>
              <div>
                <h3 className="font-serif text-xl text-ink">{title}</h3>
                <p className="text-sm text-ink/65 mt-1">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="flex flex-wrap gap-3">
        <Link href="/" className="px-4 py-2 bg-ink text-parchment rounded hover:bg-accent">
          Open the timeline
        </Link>
        <Link href="/directory" className="px-4 py-2 border border-ink/25 rounded hover:border-accent hover:text-accent">
          Browse the directory
        </Link>
        {current ? (
          <Link href={`/popes/${current.id}`} className="px-4 py-2 border border-ink/25 rounded hover:border-accent hover:text-accent">
            Current pope
          </Link>
        ) : null}
      </div>
    </article>
  );
}

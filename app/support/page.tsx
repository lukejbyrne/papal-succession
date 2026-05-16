import Link from "next/link";
import type { Metadata } from "next";
import { canonicalUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Support Papal Succession",
  description:
    "Support options for keeping Papal Succession free while funding research layers, richer notes, and printable teaching material.",
  alternates: { canonical: canonicalUrl("/support") },
  openGraph: {
    title: "Support Papal Succession",
    description:
      "Support options for keeping Papal Succession free while funding research layers, richer notes, and printable teaching material.",
    url: canonicalUrl("/support"),
    type: "article",
  },
};

const OPTIONS = [
  {
    price: "£7",
    cadence: "monthly",
    title: "Steward",
    body: "Keep the reference free and help cover hosting, source checks, and maintenance.",
  },
  {
    price: "£35",
    cadence: "one-off",
    title: "Note sponsor",
    body: "Fund one richer explanatory note for a major pope page.",
  },
  {
    price: "£150",
    cadence: "research pass",
    title: "Disputed-claimant layer",
    body: "Support a focused antipope and disputed-obedience research pass.",
  },
  {
    price: "£500",
    cadence: "commission",
    title: "Teaching pack",
    body: "Commission a printable timeline and parish or classroom handout.",
  },
];

export default function SupportPage() {
  return (
    <article className="max-w-5xl mx-auto px-4 py-12 text-ink/85">
      <Link href="/" className="text-sm text-ink/60 hover:text-accent">
        ← Succession
      </Link>

      <header className="mt-4 mb-12 max-w-3xl">
        <p className="text-[11px] uppercase tracking-[0.22em] text-ink/45 mb-3">Support options</p>
        <h1 className="font-serif text-5xl sm:text-6xl text-ink leading-[1.02]">
          Keep the reference free. Fund the careful layers.
        </h1>
        <p className="text-lg text-ink/70 mt-4 leading-relaxed">
          Papal Succession should remain open. Support is for the work around the core line:
          disputed claimants, richer major-pope notes, council context, and printable teaching tools.
        </p>
      </header>

      <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
        {OPTIONS.map((option) => (
          <article key={option.title} className="rounded-md border border-ink/10 bg-ink/[0.025] p-5">
            <p className="text-[11px] uppercase tracking-[0.18em] text-ink/45 mb-3">{option.cadence}</p>
            <div className="font-serif text-5xl text-ink mb-4">{option.price}</div>
            <h2 className="font-serif text-2xl text-ink mb-2">{option.title}</h2>
            <p className="text-sm text-ink/65">{option.body}</p>
          </article>
        ))}
      </section>

      <section className="rounded-md border border-ink/10 bg-ink/[0.025] p-5">
        <h2 className="font-serif text-2xl text-ink mb-2">Payment link is not wired yet</h2>
        <p className="text-sm text-ink/70 max-w-3xl">
          These are public price points so the work has shape before a checkout provider is added.
          For now, use email to request the option you want.
        </p>
        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          <a
            href="mailto:hello@ichthysstudios.com?subject=Papal%20Succession%20support"
            className="px-4 py-2 bg-ink text-parchment rounded hover:bg-accent"
          >
            Email about support
          </a>
          <Link href="/antipopes" className="px-4 py-2 border border-ink/25 rounded hover:border-accent hover:text-accent">
            See the antipope plan
          </Link>
        </div>
      </section>
    </article>
  );
}

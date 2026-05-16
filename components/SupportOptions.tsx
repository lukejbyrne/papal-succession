import Link from "next/link";

const OPTIONS = [
  {
    price: "£7",
    label: "Monthly",
    title: "Keep the reference free",
    body: "Small recurring support for hosting, data checks, and quiet maintenance.",
  },
  {
    price: "£35",
    label: "One-off",
    title: "Sponsor a major-pope note",
    body: "Funds one polished explanatory note for a major pontificate page.",
  },
  {
    price: "£150",
    label: "Research pass",
    title: "Fund the antipope layer",
    body: "Pays for a focused pass on disputed claimants, source notes, and interface copy.",
  },
  {
    price: "£500",
    label: "Commission",
    title: "Create a teaching pack",
    body: "Funds a printable timeline and parish or classroom handout version.",
  },
];

export default function SupportOptions() {
  return (
    <section className="max-w-5xl mx-auto px-4 py-14 border-t border-ink/10">
      <div className="max-w-3xl mb-8">
        <p className="text-[11px] uppercase tracking-[0.22em] text-ink/45 mb-3">Support future work</p>
        <h2 className="font-serif text-3xl text-ink mb-3">Price options, without a paywall</h2>
        <p className="text-ink/70">
          The reference stays free. Support goes toward the pieces that make it more trustworthy:
          better notes, disputed-claimant research, and printable teaching material.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {OPTIONS.map((option) => (
          <article key={option.title} className="rounded-md border border-ink/10 bg-ink/[0.025] p-4">
            <div className="flex items-baseline gap-2 mb-4">
              <span className="font-serif text-4xl text-ink">{option.price}</span>
              <span className="text-[11px] uppercase tracking-[0.18em] text-ink/45">{option.label}</span>
            </div>
            <h3 className="font-serif text-xl text-ink mb-2">{option.title}</h3>
            <p className="text-sm text-ink/65">{option.body}</p>
          </article>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap gap-3 text-sm">
        <Link href="/support" className="px-4 py-2 bg-ink text-parchment rounded hover:bg-accent">
          See support options
        </Link>
        <a
          href="mailto:hello@ichthysstudios.com?subject=Papal%20Succession%20support"
          className="px-4 py-2 border border-ink/25 rounded hover:border-accent hover:text-accent"
        >
          Ask about a custom commission
        </a>
      </div>
    </section>
  );
}

import Link from "next/link";

const LAYERS = [
  {
    title: "Antipopes and disputed claimants",
    status: "Next research layer",
    body:
      "Keep the official papal line clean, then let readers turn on disputed claimants when they want the messier historical map.",
    href: "/antipopes",
  },
  {
    title: "Councils and papal documents",
    status: "Context layer",
    body:
      "Short bars can matter more than long ones. Councils, reforms, and documents explain why some pontificates reshape the whole church.",
    href: "/support",
  },
  {
    title: "Printable teaching timeline",
    status: "Classroom layer",
    body:
      "A one-page version for parish groups, catechists, and teachers who need the sequence without opening the whole site.",
    href: "/support",
  },
];

export default function FutureLayers() {
  return (
    <section className="max-w-5xl mx-auto px-4 py-14 border-t border-ink/10">
      <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-8 items-start">
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-ink/45 mb-3">
            Make it great without confusing it
          </p>
          <h2 className="font-serif text-3xl text-ink mb-3">The official line stays clear. Extra layers come beside it.</h2>
          <p className="text-ink/70">
            The site should not pretend one straight line explains every controversy. The right move is layered history:
            official popes first, disputed claimants and councils when the reader asks for them.
          </p>
        </div>
        <div className="grid gap-3">
          {LAYERS.map((layer) => (
            <Link
              key={layer.title}
              href={layer.href}
              className="group grid sm:grid-cols-[170px_1fr] gap-4 rounded-md border border-ink/10 bg-ink/[0.025] p-4 hover:border-accent transition-colors"
            >
              <span className="text-[11px] uppercase tracking-[0.18em] text-ink/45 group-hover:text-accent">
                {layer.status}
              </span>
              <span>
                <strong className="block font-serif text-xl text-ink group-hover:text-accent">{layer.title}</strong>
                <span className="block text-sm text-ink/65 mt-1">{layer.body}</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

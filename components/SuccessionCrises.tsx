import Link from "next/link";
import type { Person } from "@/lib/schema";
import { pontificateRange } from "@/lib/dates";

const CRISES = [
  {
    title: "The Benedict IX crisis",
    years: "1032-1048",
    ids: ["pope-benedict-ix", "pope-sylvester-iii", "pope-benedict-ix-147", "pope-gregory-vi", "pope-clement-ii", "pope-benedict-ix-150"],
    body:
      "The same papal name appears three times in the official sequence. This is the rare place where a straight line needs commentary, because deposition, restoration, abdication, and imperial intervention all sit close together.",
  },
  {
    title: "The Western Schism aftermath",
    years: "1378-1417",
    ids: ["pope-urban-vi", "pope-boniface-ix", "pope-innocent-vii", "pope-gregory-xii", "pope-martin-v"],
    body:
      "The official list keeps the Roman line, while rival obediences claimed papal authority from Avignon and Pisa. This site keeps the official sequence first and leaves disputed claimants in a clearly labeled companion layer.",
  },
  {
    title: "Numbering oddities",
    years: "1276 onward",
    ids: ["pope-john-xxi", "pope-martin-iv"],
    body:
      "Some papal numbers preserve medieval counting mistakes. John XXI appears without a John XX, and Martin IV follows no Martin II or III. These are not data errors; they are historical numbering inheritances.",
  },
];

export default function SuccessionCrises({ people }: { people: Person[] }) {
  const peopleById = new Map(people.map((p) => [p.id, p]));

  return (
    <section id="crises" className="max-w-5xl mx-auto px-4 py-14 border-t border-ink/10 scroll-mt-24">
      <div className="max-w-3xl mb-8">
        <p className="text-[11px] uppercase tracking-[0.22em] text-ink/45 mb-3">Where the line gets messy</p>
        <h2 className="font-serif text-3xl text-ink mb-3">Succession crises and numbering traps</h2>
        <p className="text-ink/70">
          Most papal succession is a single ordered sequence. The useful exceptions are contested
          elections, repeated pontificates, antipopes, and inherited numbering mistakes.
        </p>
      </div>
      <div className="grid gap-5">
        {CRISES.map((crisis) => {
          const figures = crisis.ids.map((id) => peopleById.get(id)).filter(Boolean) as Person[];
          return (
            <article key={crisis.title} className="rounded-md border border-ink/10 bg-ink/[0.025] p-5">
              <div className="flex flex-wrap gap-x-4 gap-y-2 items-baseline mb-3">
                <h3 className="font-serif text-2xl text-ink">{crisis.title}</h3>
                <span className="text-xs tabular-nums text-ink/45">{crisis.years}</span>
              </div>
              <p className="text-sm text-ink/70 max-w-3xl mb-4">{crisis.body}</p>
              <div className="flex flex-wrap gap-2">
                {figures.map((pope) => (
                  <Link
                    key={pope.id}
                    href={`/popes/${pope.id}`}
                    className="rounded border border-ink/15 px-3 py-2 text-sm hover:border-accent hover:text-accent"
                    title={pontificateRange(pope).text}
                  >
                    {pope.papal_order ? `${pope.papal_order}. ` : ""}
                    {pope.name}
                  </Link>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

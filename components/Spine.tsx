"use client";

import { useMemo } from "react";
import Link from "next/link";
import type { Person, Relationship } from "@/lib/schema";
import { pontificateRange } from "@/lib/dates";

const DEFAULT_SPINE_IDS = [
  "pope-peter",
  "pope-leo-i",
  "pope-gregory-i",
  "pope-gregory-vii",
  "pope-innocent-iii",
  "pope-pius-v",
  "pope-leo-xiii",
  "pope-john-xxiii",
  "pope-john-paul-ii",
  "pope-francis",
  "pope-leo-xiv",
];

const ERA_NOTES: Record<string, string> = {
  "pope-leo-i": "Late antiquity — Roman primacy is argued in a newly imperial Christian world.",
  "pope-gregory-i": "Early medieval — Rome becomes a pastoral and missionary center after the fall of the western empire.",
  "pope-gregory-vii": "Reform papacy — disputes over investiture sharpen claims about church and empire.",
  "pope-innocent-iii": "High medieval — papal authority reaches one of its strongest institutional forms.",
  "pope-john-xxiii": "Modern church — Vatican II opens a new era of council-led reform.",
};

function findEdge(rels: Relationship[], a: string, b: string): Relationship | null {
  // Prefer "downstream" direction (a teaches b, a → b) and documented over tradition
  const matches = rels.filter(
    (r) => (r.from === a && r.to === b) || (r.from === b && r.to === a)
  );
  matches.sort((x, y) => {
    const order = (s: string) => (s === "documented" ? 0 : s === "tradition" ? 1 : 2);
    return order(x.strength) - order(y.strength);
  });
  return matches[0] ?? null;
}

type Props = {
  people: Person[];
  relationships: Relationship[];
  lockedId: string | null;
};

export default function Spine({ people, relationships, lockedId }: Props) {
  const peopleById = useMemo(() => new Map(people.map((p) => [p.id, p])), [people]);

  const isLocked = !!(lockedId && peopleById.has(lockedId));
  const lockedPerson = isLocked ? peopleById.get(lockedId!)! : null;
  const sortedPeople = useMemo(
    () => [...people].sort((a, b) => (a.papal_order ?? 9999) - (b.papal_order ?? 9999)),
    [people]
  );

  const stepIds = useMemo(() => {
    if (isLocked && lockedPerson?.papal_order) {
      return sortedPeople
        .filter((p) => p.papal_order != null && Math.abs(p.papal_order - lockedPerson.papal_order!) <= 3)
        .map((p) => p.id);
    }
    return DEFAULT_SPINE_IDS;
  }, [isLocked, lockedPerson, sortedPeople]);

  const steps = stepIds
    .map((id, i) => {
      const person = peopleById.get(id);
      if (!person) return null;
      const prevId = i > 0 ? stepIds[i - 1] : null;
      const edge = prevId ? findEdge(relationships, prevId, id) : null;
      return { person, edge };
    })
    .filter(Boolean) as { person: Person; edge: Relationship | null }[];

  const heading = isLocked
    ? `Around ${lockedPerson!.name}`
    : "The succession, told plainly";

  const subtitle = isLocked
    ? `Nearby pontificates before and after ${lockedPerson!.name}. This is more useful than drawing the whole line back to Peter for every click.`
    : "A short route through major pontificates. It is not the whole story, but it gives the long sequence enough handholds before you browse all 267 popes.";

  const totalCount = people.length;

  return (
    <section className="mb-16">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-baseline gap-3 mb-2 flex-wrap">
          <h2 className="font-serif text-3xl">{heading}</h2>
          {isLocked && (
            <span className="text-xs uppercase tracking-wider text-accent">
              following your selection
            </span>
          )}
        </div>
        <p className="text-ink/70 mb-8 max-w-2xl">{subtitle}</p>

        <ol className="relative">
          {steps.map(({ person, edge }, i) => (
            <li key={person.id} className="relative pl-12 pb-8 last:pb-0">
              {i < steps.length - 1 && (
                <span
                  className={`absolute left-[18px] top-9 bottom-0 w-px ${
                    edge?.strength === "tradition" ? "border-l border-dashed border-ink/30" : "bg-ink/40"
                  }`}
                  style={
                    edge?.strength === "tradition"
                      ? { backgroundColor: "transparent", borderLeftWidth: 1 }
                      : undefined
                  }
                />
              )}
              <span
                className={`absolute left-0 top-1 w-9 h-9 rounded-full flex items-center justify-center text-sm font-serif ${
                  person.id === "pope-peter"
                    ? "bg-accent text-parchment"
                    : "bg-parchment border-2 border-ink text-ink"
                } ${person.role.includes("bishop") ? "ring-2 ring-yellow-600 ring-offset-2 ring-offset-parchment" : ""}`}
              >
                {i + 1}
              </span>

              {edge && (
                <div className="text-[11px] uppercase tracking-wider text-ink/50 mb-1.5">
                  {edge.type.replace(/_/g, " ")}
                  {edge.strength === "tradition" && (
                    <span className="ml-2 italic text-ink/40 normal-case">— attested by tradition</span>
                  )}
                  {edge.strength === "disputed" && (
                    <span className="ml-2 italic text-accent normal-case">— disputed</span>
                  )}
                </div>
              )}

              <Link href={`/popes/${person.id}`} className="group block">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <h3 className="font-serif text-2xl group-hover:text-accent">{person.name}</h3>
                  <span className="text-sm text-ink/50" title={pontificateRange(person).explanation || undefined}>
                    {pontificateRange(person).text}
                    {person.papal_order ? ` · #${person.papal_order}` : ""}
                  </span>
                </div>
                <p className="text-ink/80 mt-1 max-w-2xl text-[15px] leading-relaxed">{person.short_bio}</p>
              </Link>

              {!isLocked && ERA_NOTES[person.id] && (
                <p className="mt-3 text-xs text-ink/55 italic max-w-xl border-l-2 border-ink/15 pl-3">
                  {ERA_NOTES[person.id]}
                </p>
              )}
            </li>
          ))}
        </ol>

        {!isLocked && (
          <div className="mt-10 pl-12">
            <p className="text-sm text-ink/60">
              These are {steps.length} of the {totalCount} popes in the dataset. The full succession is
              mapped above. Click any pontificate there to inspect local context.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

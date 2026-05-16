import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPeople, getPerson, getRelationshipsFor } from "@/lib/data";
import { canonicalUrl, SITE_NAME } from "@/lib/seo";
import { pontificateRange } from "@/lib/dates";
import { getPopeInsight } from "@/lib/pope-insights";
import type { Person, Relationship } from "@/lib/schema";

export function generateStaticParams() {
  return getPeople().map((p) => ({ slug: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pope = getPerson(slug);
  if (!pope) return {};
  const url = canonicalUrl(`/popes/${pope.id}`);
  return {
    title: `${pope.name}`,
    description: pope.short_bio,
    alternates: { canonical: url },
    openGraph: {
      title: `${pope.name} — ${SITE_NAME}`,
      description: pope.short_bio,
      url,
      type: "article",
    },
  };
}

function neighborLink(people: Person[], pope: Person, direction: -1 | 1) {
  const index = people.findIndex((p) => p.id === pope.id);
  if (index < 0) return null;
  return people[index + direction] ?? null;
}

function ordinal(value: number) {
  const mod10 = value % 10;
  const mod100 = value % 100;
  const suffix =
    mod10 === 1 && mod100 !== 11 ? "st" : mod10 === 2 && mod100 !== 12 ? "nd" : mod10 === 3 && mod100 !== 13 ? "rd" : "th";
  return `${value}${suffix}`;
}

function RelationList({
  title,
  relationships,
  peopleById,
  currentId,
}: {
  title: string;
  relationships: Relationship[];
  peopleById: Map<string, Person>;
  currentId: string;
}) {
  if (relationships.length === 0) return null;
  return (
    <section className="border-t border-ink/10 pt-6">
      <h2 className="font-serif text-2xl text-ink mb-3">{title}</h2>
      <ul className="space-y-3">
        {relationships.map((rel, index) => {
          const otherId = rel.from === currentId ? rel.to : rel.from;
          const other = peopleById.get(otherId);
          return (
            <li key={`${rel.from}-${rel.to}-${index}`} className="text-sm text-ink/75">
              <Link href={`/popes/${otherId}`} className="font-medium text-ink hover:text-accent">
                {other?.name ?? otherId}
              </Link>
              <span className="text-ink/45"> · {rel.type.replace(/_/g, " ")}</span>
              <span className="text-ink/45"> · {rel.strength}</span>
              {rel.notes ? <p className="mt-1 text-ink/60">{rel.notes}</p> : null}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default async function PopePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pope = getPerson(slug);
  if (!pope) notFound();

  const people = [...getPeople()].sort((a, b) => (a.papal_order ?? 9999) - (b.papal_order ?? 9999));
  const peopleById = new Map(people.map((p) => [p.id, p]));
  const previous = neighborLink(people, pope, -1);
  const next = neighborLink(people, pope, 1);
  const rels = getRelationshipsFor(pope.id);
  const predecessorRels = rels.filter((r) => r.to === pope.id);
  const successorRels = rels.filter((r) => r.from === pope.id);
  const range = pontificateRange(pope);
  const insight = getPopeInsight(pope.id);

  const ldPerson = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${canonicalUrl(`/popes/${pope.id}`)}#person`,
    name: pope.name,
    alternateName: pope.alt_names,
    description: pope.short_bio,
    birthPlace: pope.birth_place,
    jobTitle: "Bishop of Rome",
    mainEntityOfPage: canonicalUrl(`/popes/${pope.id}`),
    sameAs: pope.vatican_url ? [pope.vatican_url] : undefined,
    citation: pope.citations.map((c) => c.source),
  };

  return (
    <article className="max-w-5xl mx-auto px-4 py-10 text-ink/85">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ldPerson) }}
      />
      <Link href="/" className="text-sm text-ink/60 hover:text-accent">
        ← Succession
      </Link>

      <header className="grid lg:grid-cols-[1fr_260px] gap-8 items-start mt-4 mb-10">
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-ink/45 mb-3">
            {pope.papal_order ? `Pope ${pope.papal_order}` : "Pope"}
            {pope.current_pope ? " · current" : ""}
          </p>
          <h1 className="font-serif text-5xl sm:text-6xl text-ink leading-[1.02]">{pope.name}</h1>
          <p className="text-lg text-ink/70 mt-4 max-w-2xl leading-relaxed">{pope.short_bio}</p>
          <div className="flex flex-wrap gap-3 mt-6 text-sm">
            {previous ? (
              <Link href={`/popes/${previous.id}`} className="px-3 py-2 border border-ink/20 rounded hover:border-accent hover:text-accent">
                ← {previous.name}
              </Link>
            ) : null}
            {next ? (
              <Link href={`/popes/${next.id}`} className="px-3 py-2 bg-ink text-parchment rounded hover:bg-accent">
                {next.name} →
              </Link>
            ) : null}
            {pope.vatican_url ? (
              <a href={pope.vatican_url} className="px-3 py-2 border border-ink/20 rounded hover:border-accent hover:text-accent">
                Vatican page
              </a>
            ) : null}
          </div>
        </div>

        <aside className="border border-ink/10 bg-ink/[0.025] rounded-md p-4">
          {pope.image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={pope.image_url}
              alt={pope.name}
              className="w-full aspect-square object-cover object-top rounded-sm mb-4 bg-ink/5"
            />
          ) : (
            <div className="w-full aspect-square rounded-sm bg-ink/5 mb-4 flex items-center justify-center font-serif text-6xl text-ink/30">
              {pope.name.charAt(0)}
            </div>
          )}
          <dl className="space-y-3 text-sm">
            <div>
              <dt className="text-ink/45">Pontificate</dt>
              <dd title={range.explanation}>{range.text}</dd>
            </div>
            <div>
              <dt className="text-ink/45">Secular name</dt>
              <dd>{pope.secular_name ?? "Not listed"}</dd>
            </div>
            <div>
              <dt className="text-ink/45">Birthplace</dt>
              <dd>{pope.birth_place ?? "Not listed"}</dd>
            </div>
            <div>
              <dt className="text-ink/45">Century</dt>
              <dd>{pope.century ? ordinal(pope.century) : "Not listed"}</dd>
            </div>
          </dl>
        </aside>
      </header>

      <div className="grid lg:grid-cols-[1fr_300px] gap-10">
        <div className="space-y-8">
          {insight ? (
            <section className="border-t border-ink/10 pt-6">
              <p className="text-[11px] uppercase tracking-[0.2em] text-ink/45 mb-3">
                Why this pontificate matters
              </p>
              <p className="text-[15px] leading-relaxed text-ink/80 max-w-3xl">{insight.summary}</p>
              <div className="grid sm:grid-cols-2 gap-3 mt-4">
                {insight.watch.map((item) => (
                  <div key={item} className="rounded-md border border-ink/10 bg-ink/[0.025] p-3 text-sm text-ink/65">
                    {item}
                  </div>
                ))}
              </div>
              {insight.next ? (
                <Link
                  href={insight.next.href}
                  className="inline-flex mt-4 px-3 py-2 border border-ink/25 rounded text-sm hover:border-accent hover:text-accent"
                >
                  {insight.next.label}
                </Link>
              ) : null}
            </section>
          ) : null}
          <RelationList
            title="Predecessor"
            relationships={predecessorRels}
            peopleById={peopleById}
            currentId={pope.id}
          />
          <RelationList
            title="Successor"
            relationships={successorRels}
            peopleById={peopleById}
            currentId={pope.id}
          />
        </div>

        <aside className="space-y-6">
          <section className="border-t border-ink/10 pt-6">
            <h2 className="font-serif text-2xl text-ink mb-3">Sources</h2>
            <ul className="space-y-2 text-sm">
              {pope.citations.map((citation) => (
                <li key={`${citation.source}-${citation.url ?? ""}`}>
                  {citation.url ? (
                    <a href={citation.url} className="underline decoration-ink/20 underline-offset-4 hover:text-accent">
                      {citation.source}
                    </a>
                  ) : (
                    citation.source
                  )}
                  <span className="text-ink/45"> · {citation.kind}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="border-t border-ink/10 pt-6">
            <h2 className="font-serif text-2xl text-ink mb-3">Data note</h2>
            <p className="text-sm text-ink/65 leading-relaxed">
              The visual timeline uses pontificate years as its date range. For Leo XIV, the end
              year is the current year so the bar can render through the present.
            </p>
          </section>
        </aside>
      </div>
    </article>
  );
}

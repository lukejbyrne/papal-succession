import Link from "next/link";
import { getPeople, getPerson, getRelationships } from "@/lib/data";
import { pontificateRange } from "@/lib/dates";

const ANCHORS = [
  { id: "pope-peter", era: "Beginning" },
  { id: "pope-damasus-i", era: "Latin West" },
  { id: "pope-leo-i", era: "Late antiquity" },
  { id: "pope-gregory-i", era: "Early medieval" },
  { id: "pope-gregory-vii", era: "Reform" },
  { id: "pope-innocent-iii", era: "High medieval" },
  { id: "pope-john-xxiii", era: "Vatican II" },
  { id: "pope-leo-xiv", era: "Current" },
];

export default function HeroChain() {
  const totalPeople = getPeople().length;
  const relationships = getRelationships();
  const documentedCount = relationships.filter((r) => r.strength === "documented").length;
  const figures = ANCHORS.map((a) => ({
    person: getPerson(a.id),
    era: a.era,
  })).filter((f) => f.person);

  return (
    <section className="relative max-w-7xl mx-auto px-4 pt-12 pb-10">
      <div className="text-center mb-16 sm:mb-20">
        <p className="text-[11px] uppercase tracking-[0.3em] text-ink/50 mb-3 font-serif italic">
          AD 30 — present
        </p>
        <h1 className="font-serif text-4xl sm:text-6xl mb-4 leading-[1.05]">
          Every pope from Peter to Leo XIV
        </h1>
        <p className="text-base sm:text-lg text-ink/70 max-w-2xl mx-auto leading-relaxed">
          Browse the bishops of Rome in one sourced succession: pontificate dates,
          birthplace, secular names, major eras, and evidence labels for the early
          traditional lists.
        </p>
        <p className="text-xs text-ink/50 mt-3">
          {totalPeople} popes · {relationships.length} succession links · {documentedCount} documented links.
          {" "}
          <Link href="/about" className="underline decoration-ink/20 underline-offset-4 hover:text-accent">
            Read the methodology
          </Link>
          .
        </p>

        <div className="mt-8 grid sm:grid-cols-3 gap-3 max-w-4xl mx-auto text-left">
          <Link
            href="/start-here"
            className="group rounded-md border border-ink/15 bg-ink/[0.025] px-4 py-3 hover:border-accent transition-colors"
          >
            <span className="block text-[11px] uppercase tracking-wider text-ink/45 mb-1">
              Beginner
            </span>
            <span className="block font-serif text-xl leading-tight group-hover:text-accent">
              I'm new to papal history
            </span>
          </Link>
          <Link
            href="/popes/pope-leo-xiv"
            className="group rounded-md border border-ink/15 bg-ink/[0.025] px-4 py-3 hover:border-accent transition-colors"
          >
            <span className="block text-[11px] uppercase tracking-wider text-ink/45 mb-1">
              Current pope
            </span>
            <span className="block font-serif text-xl leading-tight group-hover:text-accent">
              Open Leo XIV
            </span>
          </Link>
          <Link
            href="/directory"
            className="group rounded-md border border-ink/15 bg-ink/[0.025] px-4 py-3 hover:border-accent transition-colors"
          >
            <span className="block text-[11px] uppercase tracking-wider text-ink/45 mb-1">
              Browse
            </span>
            <span className="block font-serif text-xl leading-tight group-hover:text-accent">
              Search all 267
            </span>
          </Link>
        </div>

        <p className="text-[12px] text-ink/55 mt-8">
          Primary source:{" "}
          <a
            href="https://www.vatican.va/content/vatican/en/holy-father.html"
            className="underline decoration-ink/20 underline-offset-4 hover:text-accent"
          >
            The Holy See, Pontiffs
          </a>
          .
        </p>
      </div>

      {/* Portrait strip */}
      <div className="relative -mx-4 sm:mx-0 overflow-x-auto pt-2 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex items-start gap-2 sm:gap-3 px-4 sm:justify-between min-w-[640px] sm:min-w-0">
          {figures.map(({ person, era }, i) => {
            if (!person) return null;
            const isPeter = person.id === "pope-peter";
            const isBishop = person.role.includes("bishop");
            const ringClass = isPeter
              ? "ring-2 ring-accent ring-offset-2 ring-offset-parchment"
              : isBishop
                ? "ring-2 ring-yellow-600/70 ring-offset-2 ring-offset-parchment"
                : "ring-1 ring-ink/30 ring-offset-2 ring-offset-parchment";
            return (
              <div key={person.id} className="relative flex-1 min-w-0 flex flex-col items-center text-center">
                {/* Connecting line — extends from this medallion's left to previous */}
                {i > 0 && (
                  <span
                    aria-hidden
                    className="absolute top-[44px] sm:top-[56px] right-1/2 left-[-50%] h-px bg-ink/30"
                    style={{ marginRight: "44px", marginLeft: "44px" }}
                  />
                )}
                <Link
                  href={`/popes/${person.id}`}
                  className="group relative flex flex-col items-center"
                >
                  <span
                    className={`relative block w-[88px] h-[88px] sm:w-[112px] sm:h-[112px] rounded-full overflow-hidden bg-ink/5 ${ringClass} transition-transform group-hover:scale-105`}
                  >
                    {person.image_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={person.image_url}
                        alt={person.name}
                        loading={i < 4 ? "eager" : "lazy"}
                        className="w-full h-full object-cover"
                        style={{ objectPosition: "center top" }}
                      />
                    ) : (
                      <span className="w-full h-full flex items-center justify-center font-serif text-2xl text-ink/40">
                        {person.name.charAt(0)}
                      </span>
                    )}
                  </span>
                  <span className="font-serif text-sm sm:text-base mt-2 leading-tight group-hover:text-accent">
                    {person.name.split(" of ")[0]}
                  </span>
                  <span
                    className="text-[10px] sm:text-xs text-ink/55 tabular-nums mt-0.5"
                    title={pontificateRange(person).explanation || undefined}
                  >
                    {pontificateRange(person).text}
                  </span>
                  {era && (
                    <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.15em] text-ink/45 mt-1.5 italic">
                      {era}
                    </span>
                  )}
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-center gap-3 mt-10 text-sm">
        <Link
          href="/directory"
          className="px-4 py-2 bg-ink text-parchment rounded hover:bg-accent transition-colors"
        >
          Browse all {totalPeople}
        </Link>
        <Link
          href="/about"
          className="px-4 py-2 border border-ink/30 rounded hover:border-accent hover:text-accent transition-colors"
        >
          Methodology
        </Link>
      </div>
    </section>
  );
}

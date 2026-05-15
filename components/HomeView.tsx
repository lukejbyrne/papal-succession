"use client";

import { useState } from "react";
import type { Person, Relationship } from "@/lib/schema";
import Timeline from "./Timeline";
import Spine from "./Spine";
import SuccessionCrises from "./SuccessionCrises";

export default function HomeView({
  people,
  relationships,
}: {
  people: Person[];
  relationships: Relationship[];
}) {
  const [lockedId, setLockedId] = useState<string | null>(null);

  return (
    <>
      <section className="px-4 pb-12">
        <header className="mb-6 max-w-3xl">
          <h2 className="font-serif text-3xl mb-2">The full succession</h2>
          <p className="text-ink/70 mb-4">
            All {people.length} popes as a horizontal timeline. Each bar spans a
            pontificate, colored by birthplace region. Click a bar to inspect that
            pope with nearby predecessors and successors; double-click to open the
            full page.
          </p>
        </header>
        <Timeline
          people={people}
          relationships={relationships}
          lockedId={lockedId}
          setLockedId={setLockedId}
        />
      </section>

      <div className="max-w-5xl mx-auto px-4 pt-10 border-t border-ink/10">
        <Spine people={people} relationships={relationships} lockedId={lockedId} />
      </div>
      <SuccessionCrises people={people} />
    </>
  );
}

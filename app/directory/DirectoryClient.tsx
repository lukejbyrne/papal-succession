"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Fuse from "fuse.js";
import type { Person } from "@/lib/schema";
import { pontificateRange } from "@/lib/dates";

export default function DirectoryClient({ people }: { people: Person[] }) {
  const [q, setQ] = useState("");
  const fuse = useMemo(
    () =>
      new Fuse(people, {
        keys: ["name", "alt_names", "birth_place", "secular_name", "century", "short_bio"],
        threshold: 0.35,
        ignoreLocation: true,
      }),
    [people]
  );

  const results = q.trim() === "" ? people : fuse.search(q).map((r) => r.item);
  const sorted = [...results].sort((a, b) => (a.born ?? 9999) - (b.born ?? 9999));

  return (
    <>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search by pope, secular name, birthplace, or century..."
        className="w-full border border-ink/20 rounded px-3 py-2 mb-6 bg-parchment focus:outline-none focus:border-accent"
      />
      <div className="md:hidden divide-y divide-ink/10 border-y border-ink/10">
        {sorted.map((p) => (
          <Link key={p.id} href={`/popes/${p.id}`} className="block py-4 hover:text-accent">
            <div className="flex items-baseline gap-2">
              <span className="text-xs tabular-nums text-ink/45">{p.papal_order}</span>
              <h2 className="font-serif text-2xl text-ink">{p.name}</h2>
            </div>
            <p className="text-sm text-ink/65 mt-1" title={pontificateRange(p).explanation || undefined}>
              {pontificateRange(p).text}
            </p>
            <p className="text-xs text-ink/50 mt-1">
              {p.secular_name ?? "Secular name not listed"}
              {p.birth_place ? ` · ${p.birth_place}` : ""}
            </p>
          </Link>
        ))}
      </div>

      <table className="hidden md:table w-full text-sm">
        <thead className="text-ink/60 border-b border-ink/15">
          <tr>
            <th className="text-left py-2">Name</th>
            <th className="text-left py-2">Pontificate</th>
            <th className="text-left py-2">Secular name</th>
            <th className="text-left py-2">Birthplace</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((p) => (
            <tr key={p.id} className="border-b border-ink/5 hover:bg-ink/5">
              <td className="py-2">
                <Link href={`/popes/${p.id}`} className="font-medium hover:text-accent">
                  {p.papal_order ? `${p.papal_order}. ` : ""}
                  {p.name}
                </Link>
              </td>
              <td className="py-2 text-ink/70" title={pontificateRange(p).explanation || undefined}>
                {pontificateRange(p).text}
              </td>
              <td className="py-2 text-ink/70">{p.secular_name ?? "—"}</td>
              <td className="py-2 text-ink/70">{p.birth_place ?? p.region}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

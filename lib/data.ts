import fs from "node:fs";
import path from "node:path";
import { Person, Relationship } from "./schema";

const DATA_DIR = path.join(process.cwd(), "data");

let _people: Person[] | null = null;
let _rels: Relationship[] | null = null;

function readJsonIfExists<T>(file: string): T | null {
  if (!fs.existsSync(file)) return null;
  try {
    return JSON.parse(fs.readFileSync(file, "utf8")) as T;
  } catch {
    return null;
  }
}

export function getPeople(): Person[] {
  if (_people) return _people;
  const file = path.join(DATA_DIR, "people.json");
  if (!fs.existsSync(file)) return (_people = []);
  const base = JSON.parse(fs.readFileSync(file, "utf8")) as Person[];

  const portraits = readJsonIfExists<Record<string, string>>(path.join(DATA_DIR, "portrait-manifest.json")) ?? {};

  _people = base.map((p) => {
    // Prefer locally-cached portrait (no third-party cookies, faster).
    const localPortrait = portraits[p.id];
    return {
      ...p,
      image_url: localPortrait ?? p.image_url,
    };
  });
  return _people!;
}

export function getRelationships(): Relationship[] {
  if (_rels) return _rels;
  const file = path.join(DATA_DIR, "relationships.json");
  if (!fs.existsSync(file)) return (_rels = []);
  _rels = JSON.parse(fs.readFileSync(file, "utf8"));
  return _rels!;
}

export function getPerson(id: string): Person | undefined {
  return getPeople().find((p) => p.id === id);
}

export function getRelationshipsFor(id: string): Relationship[] {
  return getRelationships().filter((r) => r.from === id || r.to === id);
}

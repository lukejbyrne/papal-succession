import { z } from "zod";

export const Region = z.enum([
  "east",
  "west",
  "syria",
  "egypt",
  "asia-minor",
  "gaul",
  "africa",
  "palestine",
  "other",
]);
export type Region = z.infer<typeof Region>;

export const Role = z.enum([
  "apostle",
  "bishop",
]);
export type Role = z.infer<typeof Role>;

export const EraKey = z.enum([
  "early-church",
  "imperial-church",
  "early-medieval",
  "high-medieval",
  "avignon-renaissance",
  "reformation",
  "modern",
]);
export type EraKey = z.infer<typeof EraKey>;

export const RelationshipType = z.enum([
  "taught_by",
  "taught",
  "met",
  "corresponded",
  "knew_of",
  "succeeded_in_see",
  "baptized_by",
  "ordained_by",
  "opposed",
  "cited",
]);
export type RelationshipType = z.infer<typeof RelationshipType>;

export const Strength = z.enum(["documented", "tradition", "disputed"]);
export type Strength = z.infer<typeof Strength>;

const optStr = z.string().nullish().transform((v) => v ?? undefined);
const optUrl = z
  .string()
  .nullish()
  .transform((v) => (v && /^https?:\/\//.test(v) ? v : undefined));

export const Citation = z.object({
  source: z.string().min(1),
  url: optUrl,
  kind: z.enum(["primary", "secondary", "reference"]),
});
export type Citation = z.infer<typeof Citation>;

export const Person = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/, "must be kebab-case slug"),
  name: z.string().min(1),
  alt_names: z.array(z.string()).nullish().transform((v) => v ?? undefined),
  born: z.number().int().nullish().transform((v) => v ?? undefined),
  born_circa: z.boolean().nullish().transform((v) => v ?? undefined),
  died: z.number().int().nullish().transform((v) => v ?? undefined),
  died_circa: z.boolean().nullish().transform((v) => v ?? undefined),
  birth_place: optStr,
  region: Region,
  role: z.array(Role).min(1),
  see: optStr,
  era_key: EraKey,
  significance: z.number().int().min(1).max(4),
  short_bio: z.string().min(1),
  citations: z.array(Citation).min(1),
  image_url: optUrl,
  image_credit: optStr,
  image_license: optStr,
  papal_order: z.number().int().nullish().transform((v) => v ?? undefined),
  pontificate_start_text: optStr,
  pontificate_end_text: optStr,
  pontificate_start_year: z.number().int().nullish().transform((v) => v ?? undefined),
  pontificate_end_year: z.number().int().nullish().transform((v) => v ?? undefined),
  secular_name: optStr,
  century: z.number().int().nullish().transform((v) => v ?? undefined),
  vatican_url: optUrl,
  current_pope: z.boolean().nullish().transform((v) => v ?? undefined),
});
export type Person = z.infer<typeof Person>;

export const Relationship = z.object({
  from: z.string(),
  to: z.string(),
  type: RelationshipType,
  strength: Strength,
  notes: optStr,
  citations: z.array(Citation).min(1),
});
export type Relationship = z.infer<typeof Relationship>;

export function relationshipId(r: Pick<Relationship, "from" | "to" | "type">) {
  return `${r.from}__${r.type}__${r.to}`;
}

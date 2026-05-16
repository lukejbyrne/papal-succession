# Papal Succession Handoff

This is the pope-site version of the succession reference project.

## Current Scope

- 267 popes from Peter through Leo XIV.
- Source of record: the Holy See Pontiffs table.
- Visual model: one continuous papal sequence, with local context on click instead of drawing a full path from Peter every time.
- Deliberately out of scope for this first version: all bishops, ordination trees, antipopes as first-class records, conclave data, and papal documents as a full database.

## Main Routes

- `/` - hero, portrait strip, full timeline, local context spine, and succession-crisis notes.
- `/directory` - searchable table/card directory.
- `/popes/[slug]` - individual pope pages with predecessor, successor, source links, available portrait, and curated notes for major pontificates.
- `/start-here` - plain-language guide.
- `/antipopes` - disputed claimants explained beside the official succession line.
- `/support` - public support and research funding options.
- `/about` - data source and methodology.
- `/api/people.json` and `/api/relationships.json` - JSON exports.

## Data Workflow

Run:

```sh
pnpm data
```

This fetches `https://www.vatican.va/content/vatican/en/holy-father.html`, regenerates:

- `data/people.json`
- `data/relationships.json`
- `data/portrait-manifest.json`

Local portrait files live in `public/portraits`. The manifest only points at files that exist locally.

## Verification

Use:

```sh
pnpm build
pnpm smoke
```

`pnpm smoke` expects a local server at `http://localhost:3000` unless `PAPAL_SUCCESSION_BASE_URL` is set.

## Product Notes

- The click behavior is local context only. A single succession line does not need a dramatic drawn path from Peter to the selected pope.
- The exception content is handled in `components/SuccessionCrises.tsx`, especially Benedict IX, the Western Schism aftermath, and numbering oddities.
- Major-pope interpretive notes live in `lib/pope-insights.ts`.
- Competitor lists usually win on raw tabular detail and antipopes; this site should win on orientation, source transparency, and fast browsing.

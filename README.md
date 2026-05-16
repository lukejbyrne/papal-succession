# Papal Succession

Interactive Next.js site that traces every pope from Peter to Leo XIV with a sourced timeline, searchable directory, local succession context, and JSON API.

## Stack

- Next.js 15 App Router, React 19, TypeScript, Tailwind
- Fuse.js for directory search
- Zod schema types for local data

## Core Workflow

```sh
pnpm install
pnpm data
pnpm dev
```

`pnpm data` runs `scripts/build-pope-data.mjs`, fetches the Holy See Pontiffs table, and writes:

- `data/people.json`
- `data/relationships.json`
- `data/portrait-manifest.json`

The generator treats the Holy See list as the canonical sequence, marks the earliest succession links as `tradition`, and later links as `documented`.

## Verification

```sh
pnpm build
node --check scripts/build-pope-data.mjs
node --check scripts/smoke.mjs
```

For a browser smoke test, start the app first and then run:

```sh
pnpm dev
pnpm smoke
```

The smoke script defaults to `http://localhost:3000` and writes screenshots to `/tmp/papal-succession-smoke`. Override when needed:

```sh
PAPAL_SUCCESSION_BASE_URL=http://localhost:3001 pnpm smoke
PAPAL_SUCCESSION_SMOKE_OUT=/tmp/pope-smoke pnpm smoke
```

## Key Routes

- `/` - hero, portrait strip, timeline, local context spine, and succession-crisis notes
- `/directory` - searchable pope directory
- `/popes/[slug]` - individual pope pages
- `/start-here` - beginner guide to the timeline and evidence labels
- `/antipopes` - disputed-claimant layer kept beside the official line
- `/support` - public support and research funding options
- `/about` - methodology and source notes
- `/api/people.json` - pope records
- `/api/relationships.json` - immediate succession links
- `/llms.txt` - compact machine-readable site summary

## Source And Scope

The current scope is popes only. The main source is:

`https://www.vatican.va/content/vatican/en/holy-father.html`

The live Netlify URL is `https://popes-io.netlify.app`. Set `NEXT_PUBLIC_SITE_URL` to a custom domain when one is configured.

The data model still uses generic people and relationships, so future work can add other bishops, sees, antipopes, councils, ordination links, or disputed succession claims without replacing the timeline.

## Current Caveats

- `pnpm data` requires network access to the Vatican source page. Avoid running it from restricted sandboxes unless the source fetch is expected to work.
- Antipopes and broader episcopal succession are intentionally not first-class records yet. The homepage and `/antipopes` explain where the straight line needs historical caution without mixing disputed claimants into the canonical pope sequence.

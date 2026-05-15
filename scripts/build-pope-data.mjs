import fs from "node:fs";
import path from "node:path";

const SOURCE_URL = "https://www.vatican.va/content/vatican/en/holy-father.html";
const SITE_URL = "https://www.vatican.va";
const CURRENT_YEAR = new Date().getFullYear();

const html = await fetch(SOURCE_URL).then((res) => {
  if (!res.ok) throw new Error(`Failed to fetch ${SOURCE_URL}: ${res.status}`);
  return res.text();
});

const tableMatch = html.match(/<table[^>]+id="holy-father"[\s\S]*?<\/table>/i);
if (!tableMatch) throw new Error("Could not find the Holy See pontiffs table.");

function decode(value) {
  return value
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&eacute;/g, "e")
    .replace(/&Eacute;/g, "E")
    .replace(/&agrave;/g, "a")
    .replace(/&Agrave;/g, "A")
    .replace(/&igrave;/g, "i")
    .replace(/&ograve;/g, "o")
    .replace(/&uuml;/g, "u")
    .replace(/&ccedil;/g, "c");
}

function cleanCell(cell) {
  return decode(cell.replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeDateText(value) {
  return value.replace(/\s*,\s*/g, ", ");
}

function slugify(value) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
}

function extractYear(value) {
  const years = value.match(/\d{1,4}/g)?.map(Number) ?? [];
  const plausible = years.filter((year) => year >= 1 && year <= CURRENT_YEAR);
  return plausible.at(-1);
}

function regionFromBirthPlace(place) {
  const p = place.toLowerCase();
  if (!p || p === "unknown") return "other";
  if (/(bethsaida|galilee|jerusalem|palestine)/.test(p)) return "palestine";
  if (/(syria|emesa|damascus)/.test(p)) return "syria";
  if (/(africa|carthage|hippo|numidia)/.test(p)) return "africa";
  if (/(greece|epirus|sicily|dalmatia|constantinople|rhodes|crete)/.test(p)) return "east";
  if (/(france|limousin|bourgogne|savoy|troyes|poitiers|lorraine|auvergne|champagne|aquitaine|grizac|maumont|monts|rosiers)/.test(p)) return "gaul";
  if (/(rome|tuscia|italy|frosinone|campania|sardinia|samnium|naples|todi|segni|venice|florence|bologna|milan|siena|pistoia|urbino|cesena|senigallia|brescia|belluno|marktl|wadowice|genga|fabriano|civitavecchia|como|spinazzola|pol[iy]|canino|concesio|desio|riese|cingoli|genoa|anagni|sora|sulmona|gavignano|benevento|pisa|fano|grottammare|alessandria|orvieto|perugia|subiaco|fiesole|viterbo|ravello|gravina|carpineto|bavaria|krakow|poland)/.test(p)) {
    return "west";
  }
  return "other";
}

function eraKey(startYear) {
  if (startYear < 313) return "early-church";
  if (startYear < 590) return "imperial-church";
  if (startYear < 1054) return "early-medieval";
  if (startYear < 1309) return "high-medieval";
  if (startYear < 1517) return "avignon-renaissance";
  if (startYear < 1870) return "reformation";
  return "modern";
}

const majorPopes = new Set([
  "Peter",
  "Damasus I",
  "Leo I",
  "Gelasius I",
  "Gregory I",
  "Leo III",
  "Nicholas I",
  "Gregory VII",
  "Urban II",
  "Innocent III",
  "Boniface VIII",
  "Pius V",
  "Benedict XIV",
  "Pius IX",
  "Leo XIII",
  "Pius X",
  "Benedict XV",
  "Pius XI",
  "Pius XII",
  "John XXIII",
  "Paul VI",
  "John Paul II",
  "Benedict XVI",
  "Francis",
  "Leo XIV",
]);

const portraitFiles = new Map(
  fs
    .readdirSync(path.join(process.cwd(), "public", "portraits"))
    .map((file) => [file.replace(/\.(jpg|jpeg|png|gif|webp)$/i, ""), `/portraits/${file}`])
);

const portraitAliases = new Map([
  ["pope-peter", "/portraits/peter-the-apostle.jpg"],
  ["pope-linus", "/portraits/linus-of-rome.jpg"],
  ["pope-anacletus-or-cletus", "/portraits/anacletus-of-rome.jpg"],
  ["pope-clement", "/portraits/clement-of-rome.jpg"],
  ["pope-gregory-i", "/portraits/gregory-the-great.jpg"],
]);

const rows = [...tableMatch[0].matchAll(/<tr>([\s\S]*?)<\/tr>/gi)]
  .map((match) => match[1])
  .filter((row) => !/<th/i.test(row));

const people = [];
const portraitManifest = {};
const slugCounts = new Map();

for (const row of rows) {
  const cells = [...row.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)].map((match) => match[1]);
  if (cells.length < 7) continue;

  const order = Number(cleanCell(cells[0]));
  if (!Number.isFinite(order)) continue;

  const link = cells[1].match(/href="([^"]+)"/i)?.[1];
  const title = cells[1].match(/title="([^"]+)"/i)?.[1];
  const name = cleanCell(title ?? cells[1]);
  const startText = normalizeDateText(cleanCell(cells[2]));
  const endTextRaw = normalizeDateText(cleanCell(cells[3]));
  const endText = endTextRaw || "present";
  const secularName = cleanCell(cells[4]);
  const birthPlace = cleanCell(cells[5]);
  const century = Number(cleanCell(cells[6]));
  const baseId = `pope-${slugify(name)}`;
  const seen = slugCounts.get(baseId) ?? 0;
  slugCounts.set(baseId, seen + 1);
  const id = seen === 0 ? baseId : `${baseId}-${order}`;
  const startYear = order === 1 ? 30 : extractYear(startText) ?? extractYear(endText) ?? 30;
  const isCurrent = !endTextRaw;
  const endYear = isCurrent ? CURRENT_YEAR : extractYear(endText) ?? startYear;
  const vaticanUrl = link ? new URL(link, SITE_URL).toString() : SOURCE_URL;
  const displayStart = startText || "c. 30";
  const displayEnd = isCurrent ? "present" : endText;
  const role = order === 1 ? ["apostle", "bishop"] : ["bishop"];
  const significance = majorPopes.has(name) ? 4 : order <= 10 || order >= 255 ? 3 : 2;

  const person = {
    id,
    name,
    alt_names: secularName ? [secularName] : undefined,
    born: startYear,
    born_circa: /(^$|\bor\b|\.{3}|c\.|circa)/i.test(startText) || order === 1,
    died: endYear,
    died_circa: !isCurrent && /(\bor\b|\.{3}|c\.|circa)/i.test(endText),
    birth_place: birthPlace || undefined,
    region: regionFromBirthPlace(birthPlace),
    role,
    see: "Rome",
    era_key: eraKey(startYear),
    significance,
    short_bio: [
      `The ${ordinal(order)} pope in the Holy See's list of Supreme Pontiffs, serving as Bishop of Rome from ${displayStart} to ${displayEnd}.`,
      secularName ? `His secular name is listed as ${secularName}.` : "",
      birthPlace ? `The Holy See lists his birthplace as ${birthPlace}.` : "",
    ]
      .filter(Boolean)
      .join(" "),
    citations: [
      {
        source: "The Holy See, Pontiffs",
        url: SOURCE_URL,
        kind: "reference",
      },
      ...(vaticanUrl !== SOURCE_URL
        ? [
            {
              source: `The Holy See, ${name}`,
              url: vaticanUrl,
              kind: "reference",
            },
          ]
        : []),
    ],
    papal_order: order,
    pontificate_start_text: displayStart,
    pontificate_end_text: displayEnd,
    pontificate_start_year: startYear,
    pontificate_end_year: endYear,
    secular_name: secularName || undefined,
    century,
    vatican_url: vaticanUrl,
    current_pope: isCurrent || undefined,
  };

  people.push(person);

  const directPortrait = portraitFiles.get(id);
  const aliasPortrait = portraitAliases.get(id);
  if (aliasPortrait || directPortrait) {
    portraitManifest[id] = aliasPortrait ?? directPortrait;
  }
}

if (people.length < 260) {
  throw new Error(`Expected the full pope list, got ${people.length} rows.`);
}

const relationships = people.slice(1).map((person, index) => {
  const previous = people[index];
  return {
    from: previous.id,
    to: person.id,
    type: "succeeded_in_see",
    strength: person.papal_order <= 30 ? "tradition" : "documented",
    notes: `${person.name} follows ${previous.name} as Bishop of Rome in the Holy See's sequential list of Supreme Pontiffs.`,
    citations: [
      {
        source: "The Holy See, Pontiffs",
        url: SOURCE_URL,
        kind: "reference",
      },
    ],
  };
});

function ordinal(n) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  const suffix = mod10 === 1 && mod100 !== 11 ? "st" : mod10 === 2 && mod100 !== 12 ? "nd" : mod10 === 3 && mod100 !== 13 ? "rd" : "th";
  return `${n}${suffix}`;
}

function writeJson(file, value) {
  fs.writeFileSync(path.join(process.cwd(), file), `${JSON.stringify(value, null, 2)}\n`);
}

writeJson("data/people.json", people);
writeJson("data/relationships.json", relationships);
writeJson("data/portrait-manifest.json", portraitManifest);

console.log(`Wrote ${people.length} popes and ${relationships.length} succession links from ${SOURCE_URL}`);

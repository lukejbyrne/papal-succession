import { chromium } from "playwright";
import fs from "node:fs";

const OUT = process.env.PAPAL_SUCCESSION_SMOKE_OUT ?? "/tmp/papal-succession-smoke";
const BASE_URL = (process.env.PAPAL_SUCCESSION_BASE_URL ?? "http://localhost:3000").replace(/\/$/, "");
fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();

const errors = [];
page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));
page.on("console", (m) => {
  if (m.type() === "error") errors.push(`console: ${m.text()}`);
});
page.on("requestfailed", (r) => {
  const url = r.url();
  const reason = r.failure()?.errorText ?? "";
  const isNextDevProbe =
    url.includes("/_next/static/webpack/") ||
    (url.includes("_rsc=") && reason.includes("ERR_ABORTED"));
  if (!isNextDevProbe) errors.push(`requestfailed: ${url} ${reason}`);
});

function url(path) {
  return `${BASE_URL}${path}`;
}

async function shot(path, name) {
  const target = url(path);
  console.log(`→ ${target}`);
  const resp = await page.goto(target, { waitUntil: "networkidle" });
  const status = resp?.status();
  console.log(`  status: ${status}`);
  if (!status || status >= 400) errors.push(`status ${status ?? "unknown"} for ${target}`);
  await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: true });
}

await shot("/", "01-home");

const timelineLinks = await page.locator('a[href^="/popes/"]').count();
console.log(`  pope links on home: ${timelineLinks}`);
if (timelineLinks < 20) errors.push(`expected pope links on home, got ${timelineLinks}`);

const timelineBars = page.locator('a[title^="Click to inspect nearby popes"]');
const barCount = await timelineBars.count();
console.log(`  timeline bars rendered: ${barCount}`);
if (barCount < 200) errors.push(`expected pope timeline bars, got ${barCount}`);

const bar = timelineBars.nth(20);
if (await bar.count()) {
  await bar.click();
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${OUT}/02-locked.png`, fullPage: false });
  const lockedText = await page.getByText(/nearby pontificate/).count();
  console.log(`  nearby context visible: ${lockedText}`);
  if (lockedText < 1) errors.push("timeline click did not show nearby context");
  console.log(`  url after click: ${page.url()}`);
  const cond = page.getByRole("button", { name: "Show nearby only" });
  if (await cond.count()) {
    await cond.click();
    await page.waitForTimeout(300);
    await page.screenshot({ path: `${OUT}/03-condensed.png`, fullPage: false });
  }
}

await shot("/directory", "04-directory");
await page.fill("input", "leo xiv");
await page.waitForTimeout(200);
const leoResult = await page.locator('a[href="/popes/pope-leo-xiv"]').count();
console.log(`  Leo XIV result links: ${leoResult}`);
if (leoResult < 1) errors.push("directory search did not surface Leo XIV");
await page.screenshot({ path: `${OUT}/05-directory-search.png`, fullPage: false });

await shot("/popes/pope-peter", "06-peter");
await shot("/popes/pope-leo-i", "07-leo-i");
await shot("/popes/pope-gregory-i", "08-gregory-i");
await shot("/popes/pope-john-paul-ii", "09-john-paul-ii");
await shot("/popes/pope-leo-xiv", "10-leo-xiv");
await shot("/antipopes", "11-antipopes");
await shot("/support", "12-support");

await browser.close();

if (errors.length) {
  console.log(`\n❌ ${errors.length} errors:`);
  errors.forEach((e) => console.log("  " + e));
  process.exit(1);
}
console.log("\n✓ no client errors. screenshots in", OUT);

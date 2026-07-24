import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import { chromium } from "playwright";

const component = await readFile(new URL("../components/marketing/RuntimeLandingPage.tsx", import.meta.url), "utf8");
const baseUrl = (process.env.ASTRAIL_BASE_URL ?? "http://127.0.0.1:3000").replace(/\/$/, "");

assert.match(component, /Connect your tools\./, "Landing hero must describe Astrail's unified runtime.");
assert.match(component, /Put them to work everywhere\./, "Landing hero must retain the funding-page headline.");
assert.match(component, /ONE RUNTIME\. EVERYWHERE\./, "Landing must explain the runtime architecture.");
assert.match(component, /DETERMINISTIC BY DESIGN/, "Landing must communicate deterministic execution.");
assert.match(component, /href="\/signup"/, "Landing must link its primary CTA to signup.");
assert.match(component, /href="\/docs"/, "Landing must link to product documentation.");

for (const asset of [
  "all-your-tools.png",
  "your-rules.png",
  "no-reconnecting.png",
]) {
  await access(new URL(`../public/runtime-home/feature-art/${asset}`, import.meta.url));
}

const browser = await chromium.launch({ headless: true });
try {
  for (const viewport of [{ name: "desktop", width: 1440, height: 1000 }, { name: "mobile", width: 390, height: 844 }]) {
    const page = await browser.newPage({ viewport });
    const browserErrors = [];
    page.on("console", message => { if (message.type() === "error") browserErrors.push(message.text()); });
    page.on("pageerror", error => browserErrors.push(error.message));
    await page.goto(baseUrl, { waitUntil: "networkidle" });

    assert.equal(await page.title(), "Astrail | Connect your tools. Run them anywhere.");
    assert.match(await page.locator("h1").innerText(), /Connect your tools/);
    assert.equal(await page.locator("main.runtime-home > section").count(), 11);
    assert.deepEqual(await page.locator("img").evaluateAll(images => images.filter(image => !image.complete || image.naturalWidth === 0).map(image => image.getAttribute("src"))), []);

    const revealTargets = page.locator("main.runtime-home > section:not(.hero), main.runtime-home > footer");
    for (let index = 0; index < await revealTargets.count(); index += 1) {
      await revealTargets.nth(index).evaluate(element => element.scrollIntoView({ block: "center" }));
      await page.waitForFunction((targetIndex) => {
        const targets = document.querySelectorAll("main.runtime-home > section:not(.hero), main.runtime-home > footer");
        return targets[targetIndex]?.classList.contains("in-view");
      }, index);
    }
    assert.equal(await page.locator("main.runtime-home > section.in-view, main.runtime-home > footer.in-view").count(), await revealTargets.count());

    if (viewport.name === "mobile") {
      await page.getByRole("button", { name: "Open menu" }).click();
      assert.equal(await page.locator("#marketing-navigation").evaluate(element => element.classList.contains("open")), true);
    }
    assert.deepEqual(browserErrors, []);
    await page.close();
  }
} finally {
  await browser.close();
}

console.log("Landing page matches the funding design at desktop and mobile sizes.");

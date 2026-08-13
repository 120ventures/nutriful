import { test, expect, Page } from "@playwright/test";

// Verification pass around the signup smoke test: cookie banner, CTAs,
// tracking and onboarding edge paths, on mobile and desktop.

const errors: string[] = [];
test.beforeEach(({ page }) => {
  page.on("pageerror", (e) => errors.push("pageerror: " + e.message));
});
test.afterEach(() => {
  expect(errors, "no runtime errors").toEqual([]);
  errors.length = 0;
});

const click = (page: Page, name: string | RegExp) =>
  page.getByRole("button", { name }).first().click();

const scrollTo = (page: Page, y: number) =>
  page.evaluate((top) => window.scrollTo({ top, behavior: "instant" as ScrollBehavior }), y);

async function answerUpToSuspects(page: Page) {
  await page.goto("/start");
  await click(page, "Endlich wissen, was ich vertrage");
  await click(page, "Blähungen");
  await click(page, "Weiter");
  await click(page, "Kurz nach dem Essen");
  await click(page, "Täglich");
  await click(page, "3");
}

async function answerToEmail(page: Page, suspect: string | RegExp = /Milchprodukte/) {
  await answerUpToSuspects(page);
  await click(page, suspect);
  await click(page, "Weiter");
  await click(page, "Noch nichts");
  await click(page, "Weiter");
  await click(page, "1 bis 5 Jahre");
  await click(page, "Nein, nichts davon");
  await click(page, "35 - 44");
  await expect(
    page.getByRole("heading", { name: "Wohin sollen wir deinen Startplan schicken?" }),
  ).toBeVisible();
}

test("cookie banner does not block the hero CTA (regression)", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("button", { name: "Akzeptieren" })).toBeVisible();
  // With the banner still up, the hero CTA must be clickable - it was buried
  // underneath the banner on mobile before the --consent-h fix.
  await page.getByRole("link", { name: "2-Minuten-Check starten" }).first().click();
  await expect(page.getByRole("heading", { name: "Was möchtest du erreichen?" })).toBeVisible();
});

test("onboarding works with the banner still showing", async ({ page }) => {
  await answerToEmail(page);
});

test("multi-select blocks Weiter until something is picked", async ({ page }) => {
  await page.goto("/start");
  await click(page, "Endlich wissen, was ich vertrage");
  await expect(page.getByRole("button", { name: "Weiter" })).toBeDisabled();
  await click(page, "Blähungen");
  await expect(page.getByRole("button", { name: "Weiter" })).toBeEnabled();
});

test("back button returns to the previous question", async ({ page }) => {
  await page.goto("/start");
  await click(page, "Endlich wissen, was ich vertrage");
  await page.getByRole("button", { name: "Zurück" }).click();
  await expect(page.getByRole("heading", { name: "Was möchtest du erreichen?" })).toBeVisible();
});

test("red flag shows the doctor warning and still lets you continue", async ({ page }) => {
  await answerUpToSuspects(page);
  await click(page, /Milchprodukte/);
  await click(page, "Weiter");
  await click(page, "Noch nichts");
  await click(page, "Weiter");
  await click(page, "1 bis 5 Jahre");
  await click(page, "Blut im Stuhl");
  await expect(page.getByText("Bitte ärztlich abklären")).toBeVisible();
  await click(page, "Weiter");
  await expect(page.getByRole("heading", { name: "Wie alt bist du?" })).toBeVisible();
});

test("flow also completes when no suspect is known", async ({ page }) => {
  await answerToEmail(page, "Ich weiß es nicht");
});

test("invalid email shows inline errors and sends no request", async ({ page }) => {
  let posted = false;
  page.on("request", (r) => {
    if (r.url().includes("/rest/v1/signups")) posted = true;
  });
  await answerToEmail(page);
  await page.getByLabel("E-Mail-Adresse").fill("kaputt");
  await click(page, "Startplan kostenlos anfordern");
  await expect(page.getByText("Bitte gib eine gültige E-Mail-Adresse ein.")).toBeVisible();
  await expect(page.getByText("Ohne dein Einverständnis")).toBeVisible();
  expect(posted, "must not hit the database on invalid input").toBe(false);
  await page.getByLabel("E-Mail-Adresse").fill("valid@example.com");
  await expect(page.getByText("Bitte gib eine gültige E-Mail-Adresse ein.")).toHaveCount(0);
});

test("every landing CTA leads into the check", async ({ page }) => {
  await page.goto("/");
  expect(await page.locator('a[href="/start"]').count()).toBeGreaterThanOrEqual(5);
  await expect(page.getByText("Jetzt bestellen")).toHaveCount(0);
});

// Note on tracking assertions: PostHog batches events and snapshots its
// transport before any test hook can watch it, so network-level interception
// is unreliable here. Event arrival is verified against the PostHog project
// itself (events show up with the page URL of the run).

test("accept: SDKs load; sticky CTA appears on mobile after consent", async ({
  page,
  isMobile,
}) => {
  const trackers: string[] = [];
  page.on("request", (r) => {
    if (/posthog\.com|googletagmanager|analytics\.tiktok/.test(r.url())) trackers.push(r.url());
  });
  await page.goto("/");
  await page.getByRole("button", { name: "Akzeptieren" }).click();
  await expect(page.getByRole("button", { name: "Akzeptieren" })).toHaveCount(0);
  // Script/config loads are plain GETs and reliably observable.
  await expect.poll(() => trackers.length, { timeout: 15_000 }).toBeGreaterThan(0);

  if (isMobile) {
    const sticky = page
      .locator("div.fixed.inset-x-0.bottom-0")
      .filter({ hasText: "2-Minuten-Check" });
    await expect(sticky).toHaveClass(/translate-y-full/); // hero still in view
    await scrollTo(page, 2500);
    await expect(sticky).toHaveClass(/translate-y-0/);
    await expect(sticky).toBeInViewport();
  }
});

test("decline: no tracker loads, signup still works", async ({ page, context }) => {
  // gtag.js itself is exempt: it ships in index.html with Consent Mode v2
  // defaults "denied" (cookieless pings, no cookies) - a deliberate setup.
  // Everything consent-gated (PostHog, TikTok, Meta) must stay silent.
  const trackers: string[] = [];
  page.on("request", (r) => {
    if (/posthog\.com|analytics\.tiktok|facebook/.test(r.url())) trackers.push(r.url());
  });

  await page.goto("/");
  await page.getByRole("button", { name: "Ablehnen" }).click();
  await answerToEmail(page);
  await page.getByLabel("E-Mail-Adresse").fill(`smoke-test+decline-${Date.now()}@gutiful.at`);
  await page.getByRole("checkbox").check();
  const insert = page.waitForResponse(
    (r) => r.url().includes("/rest/v1/signups") && r.request().method() === "POST",
    { timeout: 30_000 },
  );
  await click(page, "Startplan kostenlos anfordern");
  expect((await insert).status()).toBe(201);
  await expect(page.getByText("Passt - wir haben alles.")).toBeVisible();
  expect(trackers, "no consent-gated tracker may load without consent").toEqual([]);

  // Consent Mode denied => Google must not set ad cookies (_gcl_*).
  const cookies = await context.cookies();
  expect(cookies.filter((c) => c.name.startsWith("_gcl")), "no ad cookies on decline").toEqual([]);
});

import { test, expect } from "@playwright/test";

/**
 * Walks the real onboarding on a deployed site and asserts that the signup
 * actually reaches Supabase.
 *
 * This exists because of the 30.07.-03.08.2026 outage: a missing import made
 * the submit button hang, no request was ever sent, and every signup for three
 * days was lost while Google Ads kept spending. The page still looked fine, so
 * only an end-to-end run catches it.
 *
 * Writes a real row. The address is prefixed `smoke-test+` so those rows are
 * easy to find and purge:
 *   delete from public.signups where email like 'smoke-test+%';
 */

const testEmail = () => `smoke-test+${Date.now()}@gutiful.at`;

test("onboarding signup reaches the database", async ({ page }) => {
  const insert = page.waitForResponse(
    (r) => r.url().includes("/rest/v1/signups") && r.request().method() === "POST",
    { timeout: 30_000 },
  );

  await page.goto("/start");

  // Cookie banner, if it is showing.
  const accept = page.getByRole("button", { name: /akzeptieren|alle akzeptieren/i });
  if (await accept.isVisible().catch(() => false)) await accept.click();

  // Answer every question. Single-choice steps auto-advance, multi-select and
  // the severity scale need an explicit "Weiter".
  const answer = async (label: string | RegExp) => {
    await page.getByRole("button", { name: label }).first().click();
  };
  const next = async () => {
    await page.getByRole("button", { name: "Weiter" }).click();
  };

  await answer("Endlich wissen, was ich vertrage"); // goal
  await answer("Blähungen"); // symptoms (multi)
  await next();
  await answer("Kurz nach dem Essen"); // when
  await answer("Täglich"); // frequency
  await answer("3"); // severity scale
  await answer(/Milchprodukte/); // suspects (multi)
  await next();
  await answer("Noch nichts"); // tried (multi)
  await next();
  await answer("1 bis 5 Jahre"); // duration
  await answer("Nein, nichts davon"); // red flags
  await answer("35 - 44"); // age

  await expect(
    page.getByRole("heading", { name: "Wohin sollen wir deinen Startplan schicken?" }),
  ).toBeVisible();

  await page.getByLabel("E-Mail-Adresse").fill(testEmail());
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Startplan kostenlos anfordern" }).click();

  const response = await insert;
  expect(response.status(), "Supabase must accept the insert").toBe(201);

  await expect(page.getByText("Passt - wir haben alles.")).toBeVisible();
});

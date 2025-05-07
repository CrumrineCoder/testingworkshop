import { test, expect } from "playwright/test";

test("tab title test", async ({ page }) => {
  await page.goto("https://www.shino.de/parkcalc/index.php");
  const title = await page.title();
  expect(title).toBe("Parking Cost Calculator");
});

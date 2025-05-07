import { test, expect } from "playwright/test";

async function navHomePage(page: any) {
  await page.goto("https://www.shino.de/parkcalc/index.php");
}

test("tab title test", async ({ page }) => {
  await navHomePage(page);
  const title = await page.title();
  expect(title).toBe("Parking Cost Calculator");
});

test("dropdown options test", async ({ page }) => {
  await navHomePage(page);

  const dropdown = await page.locator("select[id='ParkingLot']");
  await expect(dropdown).toBeVisible();

  const options = await dropdown.locator("option").allTextContents();

  expect(options).toEqual([
    "Valet Parking",
    "Short-Term Parking",
    "Economy Parking",
    "Long-Term Garage Parking",
    "Long-Term Surface Parking",
  ]);
});

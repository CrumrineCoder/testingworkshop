import { test, expect } from "playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://www.shino.de/parkcalc/index.php");
});

test("tab title", async ({ page }) => {
  const title = await page.title();
  expect(title).toBe("Parking Cost Calculator");
});

test("dropdown options", async ({ page }) => {
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

test("date options", async ({ page }) => {
  const Startingdate = await page.locator("input[id='StartingDate']");
  await expect(Startingdate).toBeVisible();
  const startingDateText = await Startingdate.inputValue();
  expect(startingDateText).toBe("MM/DD/YYYY");

  const leavingDate = await page.locator("input[id='LeavingDate']");
  await expect(leavingDate).toBeVisible();
  const leavingDateText = await leavingDate.inputValue();
  expect(leavingDateText).toBe("MM/DD/YYYY");
});

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

  const StartingTime = await page.locator("input[id='StartingTime']");
  await expect(StartingTime).toBeVisible();
  const startingTimeText = await StartingTime.inputValue();
  expect(startingTimeText).toBe("12:00");

  const leavingTime = await page.locator("input[id='LeavingTime']");
  await expect(leavingTime).toBeVisible();
  const leavingTimeText = await leavingTime.inputValue();
  expect(leavingTimeText).toBe("12:00");
});

test("calendar button", async ({ page }) => {
  const calendarButtons = await page.locator("a[href*='NewCal']");

  const firstCalendarButton = calendarButtons.nth(0);
  await expect(firstCalendarButton).toBeVisible();

  const [popup] = await Promise.all([
    page.waitForEvent("popup"),
    firstCalendarButton.click(), 
  ]);

  const popupTitle = await popup.title();
  expect(popupTitle).toContain("Pick a Date");

  await popup.close();
});

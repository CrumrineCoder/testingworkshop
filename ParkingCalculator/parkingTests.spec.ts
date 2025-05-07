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

  const entryDateCalendar = calendarButtons.nth(0);
  await expect(entryDateCalendar).toBeVisible();

  const [popup] = await Promise.all([
    page.waitForEvent("popup"),
    entryDateCalendar.click(),
  ]);

  const popupTitle = await popup.title();
  expect(popupTitle).toContain("Pick a Date");

  await popup.close();
});

test("AM/PM radios", async ({ page }) => {
  const amRadioButtons = await page.locator("input[type='radio'][value='AM']");
  const pmRadioButtons = await page.locator("input[type='radio'][value='PM']");

  const entryAMRadio = amRadioButtons.nth(0);
  const entryPMRadio = pmRadioButtons.nth(0);
  const departureAMRadio = amRadioButtons.nth(1);
  const departurePMRadio = pmRadioButtons.nth(1);
  
  await expect(entryAMRadio).toBeChecked();
  await expect(entryPMRadio).not.toBeChecked();
  await expect(departureAMRadio).toBeChecked();
  await expect(departurePMRadio).not.toBeChecked();

  await entryPMRadio.click();
  await expect(entryPMRadio).toBeChecked();
  await expect(entryAMRadio).not.toBeChecked();

  await departurePMRadio.click();
  await expect(departurePMRadio).toBeChecked();
  await expect(departureAMRadio).not.toBeChecked();
});

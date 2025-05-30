import { test, expect } from "playwright/test";

// For each test in this doc, we're going to be using the home page
test.beforeEach(async ({ page }) => {
  await page.goto("https://www.shino.de/parkcalc/index.php");
});

// Verify the Tab's title
test("tab title", async ({ page }) => {
  const title = await page.title();
  expect(title).toBe("Parking Cost Calculator");
});

// Verify the Parking Lot dropdown contains all 5 lots. 
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

// Ensures that the date inputs have the correct default value
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

// Ensure that the Calendar button opens a Popup, which has the correct 
// Title, months (which are all pickable), and days (which are also all pickable)
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

  const monthDropdown = await popup.locator("select[name='MonthSelector']");
  await expect(monthDropdown).toBeVisible();

  const options = await monthDropdown.locator("option").allTextContents();
  const trimmedOptions = options.map(option => option.trim());

  expect(trimmedOptions).toEqual([
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]);

  await popup.close();
});

// Ensures AM & PM radio buttons have the correct default value, and toggling works
test("AM/PM radios", async ({ page }) => {
  const amRadioButtons = await page.locator("input[type='radio'][value='AM']");
  const pmRadioButtons = await page.locator("input[type='radio'][value='PM']");

  const entryAMRadio = amRadioButtons.nth(0);
  const entryPMRadio = pmRadioButtons.nth(0);
  const departureAMRadio = amRadioButtons.nth(1);
  const departurePMRadio = pmRadioButtons.nth(1);

  // Validate default values
  await expect(entryAMRadio).toBeChecked();
  await expect(entryPMRadio).not.toBeChecked();
  await expect(departureAMRadio).toBeChecked();
  await expect(departurePMRadio).not.toBeChecked();

  // Click on PM for both radio buttons and validate only the PM option is selected
  await entryPMRadio.click();
  await expect(entryPMRadio).toBeChecked();
  await expect(entryAMRadio).not.toBeChecked();

  await departurePMRadio.click();
  await expect(departurePMRadio).toBeChecked();
  await expect(departureAMRadio).not.toBeChecked();
});


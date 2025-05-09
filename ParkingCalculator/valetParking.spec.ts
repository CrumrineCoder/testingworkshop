import { test, expect } from "@playwright/test";

import {
  PressCalculate,
  ValidateParkingCost,
  ValidateTime,
  inputCalendarDate,
  inputDay,
  inputTime
} from "./FormFunctions.spec";

/*
test.use({
  launchOptions: {
    headless: false,
  },
});
*/

// For each test in this doc, we're going to be using the home page
test.beforeEach(async ({ page }) => {
    await page.goto("https://www.shino.de/parkcalc/index.php");
  });

// Test 1 day interval for Valet Parking. This should be $18 since it's 1 day difference.
test("Valet Parking Midnight 1 day Interval with Calendars", async ({ page }) => {
  await inputCalendarDate({ page }, "entry", 8);
  await inputCalendarDate({ page }, "leaving", 9);

  await PressCalculate({ page });

  await ValidateParkingCost({ page }, "$ 18.00");

  await ValidateTime({ page }, "(1 Days, 0 Hours, 0 Minutes)");
});

test("Valet Parking Midnight 1 day Interval with Inputs", async ({ page }) => {
    await inputDay({ page }, "StartingDate", "5/8/2025");
    await inputDay({ page }, "LeavingDate", "5/9/2025");
  
    await PressCalculate({ page });
  
    await ValidateParkingCost({ page }, "$ 18.00");
  
    await ValidateTime({ page }, "(1 Days, 0 Hours, 0 Minutes)");
  });

  test("Valet Parking Same Day 12 hours Interval with Inputs", async ({ page }) => {
    await inputDay({ page }, "StartingDate", "5/9/2025");
    await inputDay({ page }, "LeavingDate", "5/9/2025");

    await inputTime({ page }, "StartingTime", "1:00");
    await inputTime({ page }, "LeavingTime", "13:00");
    await page.pause();
    await PressCalculate({ page });
  
    await ValidateParkingCost({ page }, "$ 18.00");
  
    await ValidateTime({ page }, "(0 Days, 12 Hours, 0 Minutes)");
  });
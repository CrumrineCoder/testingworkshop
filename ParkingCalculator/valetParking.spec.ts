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

// Full 1 day Interval but uses the inputs instead of calendars
test("Valet Parking Midnight 1 day Interval with Inputs", async ({ page }) => {
    await inputDay({ page }, "StartingDate", "5/8/2025");
    await inputDay({ page }, "LeavingDate", "5/9/2025");
  
    await PressCalculate({ page });
  
    await ValidateParkingCost({ page }, "$ 18.00");
  
    await ValidateTime({ page }, "(1 Days, 0 Hours, 0 Minutes)");
  });

  // Same day but drastically over 5 hours
  test("Valet Parking Same Day 12 hours Interval with Inputs", async ({ page }) => {
    await inputDay({ page }, "StartingDate", "5/9/2025");
    await inputDay({ page }, "LeavingDate", "5/9/2025");

    await inputTime({ page }, "StartingTime", "1:00");
    await inputTime({ page }, "LeavingTime", "13:00");

    await PressCalculate({ page });
  
    await ValidateParkingCost({ page }, "$ 18.00");
  
    await ValidateTime({ page }, "(0 Days, 12 Hours, 0 Minutes)");
  });

  // 5 hours exactly should be 12 dollars
  test("Valet Parking Same Day 5 hours Interval with Inputs", async ({ page }) => {
    await inputDay({ page }, "StartingDate", "5/9/2025");
    await inputDay({ page }, "LeavingDate", "5/9/2025");

    await inputTime({ page }, "StartingTime", "1:00");
    await inputTime({ page }, "LeavingTime", "6:00");

    await PressCalculate({ page });
  
    await ValidateParkingCost({ page }, "$ 12.00");
  
    await ValidateTime({ page }, "(0 Days, 5 Hours, 0 Minutes)");
  });

  // A random time under 5 hours
  test("Valet Parking Same Day 4 hours Interval with Inputs", async ({ page }) => {
    await inputDay({ page }, "StartingDate", "5/9/2025");
    await inputDay({ page }, "LeavingDate", "5/9/2025");

    await inputTime({ page }, "StartingTime", "1:00");
    await inputTime({ page }, "LeavingTime", "5:00");

    await PressCalculate({ page });
  
    await ValidateParkingCost({ page }, "$ 12.00");
  
    await ValidateTime({ page }, "(0 Days, 4 Hours, 0 Minutes)");
  });

  // Testing bare minimum time
  test("Valet Parking Same Day 1 Minute Interval with Inputs", async ({ page }) => {
    await inputDay({ page }, "StartingDate", "5/9/2025");
    await inputDay({ page }, "LeavingDate", "5/9/2025");

    await inputTime({ page }, "StartingTime", "1:00");
    await inputTime({ page }, "LeavingTime", "1:01");

    await PressCalculate({ page });
  
    await ValidateParkingCost({ page }, "$ 12.00");
  
    await ValidateTime({ page }, "(0 Days, 0 Hours, 1 Minutes)");
  });

  // This should count as a day because it's over the same day and over 5 hours
  test("Valet Parking Same Day 5 Hours 1 Minute Interval with Inputs", async ({ page }) => {
    await inputDay({ page }, "StartingDate", "5/9/2025");
    await inputDay({ page }, "LeavingDate", "5/9/2025");

    await inputTime({ page }, "StartingTime", "1:00");
    await inputTime({ page }, "LeavingTime", "6:01");

    await PressCalculate({ page });
  
    await ValidateParkingCost({ page }, "$ 18.00");
  
    await ValidateTime({ page }, "(0 Days, 5 Hours, 1 Minutes)");
  });

  // Just over 1 day
  test("Valet Parking Same Day 1 Day 1 Minute Interval with Inputs", async ({ page }) => {
    await inputDay({ page }, "StartingDate", "5/8/2025");
    await inputDay({ page }, "LeavingDate", "5/9/2025");

    await inputTime({ page }, "StartingTime", "1:00");
    await inputTime({ page }, "LeavingTime", "1:01");

    await PressCalculate({ page });
  
    // This is actually probably a bug, but it depends how the app is defining a day. It should be 30$ because it's under 5 hours into the next day. But right now this is how it works. 
    await ValidateParkingCost({ page }, "$ 36.00");
  
    await ValidateTime({ page }, "(1 Days, 0 Hours, 1 Minutes)");
  });
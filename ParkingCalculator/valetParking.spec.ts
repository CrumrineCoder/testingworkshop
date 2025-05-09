import { test, expect } from "@playwright/test";

import {
  PressCalculate,
  ValidateParkingCost,
  ValidateTime,
  inputCalendarDate,
} from "./FormFunctions.spec";


test.use({
  launchOptions: {
    headless: false,
  },
});


// Test 1 day interval for Valet Parking. This should be $18 since it's 1 day difference.
test("Default Valet Parking Midnight 1 day Interval", async ({ page }) => {
  await page.goto("https://www.shino.de/parkcalc/index.php");
  await inputCalendarDate({ page }, "entry", 8);
  await inputCalendarDate({ page }, "leaving", 9);

  await PressCalculate({ page });

  await ValidateParkingCost({ page }, "$ 18.00");

  await ValidateTime({ page }, "(1 Days, 0 Hours, 0 Minutes)");
});

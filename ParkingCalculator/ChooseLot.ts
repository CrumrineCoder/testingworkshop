import { test } from "@playwright/test";
import { setLot } from "./FormFunctions.spec";

export function setupParkingLot(lotName: string) {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.shino.de/parkcalc/index.php");
    await setLot({ page }, lotName);
  });
}
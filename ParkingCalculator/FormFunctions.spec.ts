import { test, expect } from "@playwright/test";

export async function PressCalculate({ page }: { page: any }) {
  await page.getByRole("button", { name: "Calculate" }).click();
}

export async function ValidateParkingCost(
  { page }: { page: any },
  expectedValue: string
) {
  const ParkingCost = await page.locator("span[class='SubHead']").nth(0);
  await expect(ParkingCost).toHaveText(expectedValue);
}

export async function ValidateTime(
  { page }: { page: any },
  expectedValue: string
) {
  const ParkingCost = await page.locator("span[class='BodyCopy']");
  await expect(ParkingCost).toHaveText(expectedValue);
}

export async function inputCalendarDate(
    { page }: { page: any },
    type: string,
    day: number
  ) {
    const page1Promise = page.waitForEvent("popup");
  
    // Corrected string concatenation
    await page
      .getByRole("row", { name: `Please input ${type} date and` }) // Use template literals
      .getByRole("link")
      .click();
  
    const page1 = await page1Promise;
    await page1.getByRole("link", { name: day.toString(), exact: true }).click();
  }

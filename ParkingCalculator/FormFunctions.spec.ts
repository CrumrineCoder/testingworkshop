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
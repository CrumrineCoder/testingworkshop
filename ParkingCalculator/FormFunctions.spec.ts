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

  await page
    .getByRole("row", { name: `Please input ${type} date and` })
    .getByRole("link")
    .click();

  const page1 = await page1Promise;
  await page1.getByRole("link", { name: day.toString(), exact: true }).click();
}

export async function inputDay(
    {page}: {page: any}, 
    type: string,
    day: string
){
    const StartingDate = await page.locator(`input[id='${type}']`);
    await StartingDate.fill(day);
}

export async function inputTime(
    {page}: {page: any}, 
    type: string,
    time: string
){
    const StartingTime = await page.locator(`input[id='${type}']`);
    await StartingTime.fill(time);
}

export async function setLot(
    {page}: {page: any},
    lot: string
){
    const dropdown = await page.locator("select[id='ParkingLot']");
    await dropdown.selectOption({ label: lot });
}
import { test, expect } from "@playwright/test";

export async function PressCalculate({ page }: { page: any }) {
    await page.getByRole("button", { name: "Calculate" }).click();
  }
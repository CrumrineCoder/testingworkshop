import { test, expect } from '@playwright/test';

// Test 1 day interval ($18)
test('Default Valet Parking Midnight 1 day Interval', async ({ page }) => {
  await page.goto('https://www.shino.de/parkcalc/index.php');
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('row', { name: 'Please input entry date and' }).getByRole('link').click();
  const page1 = await page1Promise;
  await page1.getByRole('link', { name: '8', exact: true }).click();
  const page2Promise = page.waitForEvent('popup');
  await page.getByRole('cell', { name: 'MM/DD/YYYY Pick a date 12:00' }).getByRole('link').click();
  const page2 = await page2Promise;
  await page2.getByRole('link', { name: '9', exact: true }).click();
  await page.getByRole('button', { name: 'Calculate' }).click();
});
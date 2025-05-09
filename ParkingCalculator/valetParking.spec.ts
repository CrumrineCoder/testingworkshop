import { test, expect } from "@playwright/test";

import { setupParkingLot } from "./ChooseLot";

setupParkingLot("Valet Parking");

import {
  testMidnight1DayIntervalWithCalendars,
  testMidnight1DayIntervalWithInputs,
  testSameDay12HoursIntervalWithInputs,
  testSameDay5HoursIntervalWithInputs,
  testSameDay4HoursIntervalWithInputs,
  testSameDay1MinuteIntervalWithInputs,
  test1Day1MinuteIntervalWithInputs,
} from "./sameDayTests.spec";

test("Valet Parking - Midnight 1 Day Interval with Calendars", async ({
  page,
}) => {
  await testMidnight1DayIntervalWithCalendars({ page });
});

test("Valet Parking - Midnight 1 Day Interval with Inputs", async ({
  page,
}) => {
  await testMidnight1DayIntervalWithInputs({ page });
});

test("Valet Parking - Same Day 12 Hours Interval with Inputs", async ({
  page,
}) => {
  await testSameDay12HoursIntervalWithInputs({ page });
});

test("Valet Parking - Same Day 5 Hours Interval with Inputs", async ({
  page,
}) => {
  await testSameDay5HoursIntervalWithInputs({ page });
});

test("Valet Parking - Same Day 4 Hours Interval with Inputs", async ({
  page,
}) => {
  await testSameDay4HoursIntervalWithInputs({ page });
});

test("Valet Parking - Same Day 1 Minute Interval with Inputs", async ({
  page,
}) => {
  await testSameDay1MinuteIntervalWithInputs({ page });
});

test("Valet Parking - 1 Day 1 Minute Interval with Inputs", async ({
  page,
}) => {
  await test1Day1MinuteIntervalWithInputs({ page });
});

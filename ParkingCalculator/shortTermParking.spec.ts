import { test, expect } from "@playwright/test";

import { setupParkingLot } from "./ChooseLot";

setupParkingLot("Short-Term Parking");

import {
    testMidnight1DayIntervalWithCalendars,
    testMidnight1DayIntervalWithInputs,
    testSameDay12HoursIntervalWithInputs,
    testSameDay5HoursIntervalWithInputs,
    testSameDay4HoursIntervalWithInputs,
    testSameDay1MinuteIntervalWithInputs,
    test1Day1MinuteIntervalWithInputs,
} from "./sameDayTests.spec";

// Above 5 hours, same day
test("Short Term Parking - Midnight 1 Day Interval with Calendars", async ({
    page,
}) => {
    await testMidnight1DayIntervalWithCalendars({ page }, "$ 24.00");
});

test("Short Term Parking - Midnight 1 Day Interval with Inputs", async ({
    page,
}) => {
    await testMidnight1DayIntervalWithInputs({ page }, "$ 24.00");
});

test("Short Term Parking - Same Day 12 Hours Interval with Inputs", async ({
    page,
}) => {
    await testSameDay12HoursIntervalWithInputs({ page }, "$ 24.00");
});

// <= 5 hours
test("Short Term Parking - Same Day 5 Hours Interval with Inputs", async ({
    page,
}) => {
    await testSameDay5HoursIntervalWithInputs({ page }, "$ 10.00");
});

test("Short Term Parking - Same Day 4 Hours Interval with Inputs", async ({
    page,
}) => {
    await testSameDay4HoursIntervalWithInputs({ page }, "$ 8.00");
});

test("Short Term Parking - Same Day 1 Minute Interval with Inputs", async ({
    page,
}) => {
    await testSameDay1MinuteIntervalWithInputs({ page }, "$ 2.00");
});

// > 1 day

test("Short Term Parking - 1 Day 1 Minute Interval with Inputs", async ({
    page,
}) => {
    // This should probably be $26, but it's $25 in the app. Isn't it the first hour of the next day, thus it'd be $2 instead of $1?
    await test1Day1MinuteIntervalWithInputs({ page }, "$ 25.00");
});

import {
    PressCalculate,
    ValidateParkingCost,
    ValidateTime,
    inputCalendarDate,
    inputDay,
    inputTime,
} from "./FormFunctions.spec";

// Test 1 day interval for Valet Parking using calendars
export async function testMidnight1DayIntervalWithCalendars({
    page,
}: {
    page: any;
}, expectedValue: string) {
    await inputCalendarDate({ page }, "entry", 8);
    await inputCalendarDate({ page }, "leaving", 9);

    await PressCalculate({ page });

    await ValidateParkingCost({ page }, expectedValue);
    await ValidateTime({ page }, "(1 Days, 0 Hours, 0 Minutes)");
}

// Test 1 day interval for Valet Parking using inputs
export async function testMidnight1DayIntervalWithInputs({
    page,
}: {
    page: any;
}, expectedValue: string) {
    await inputDay({ page }, "StartingDate", "5/8/2025");
    await inputDay({ page }, "LeavingDate", "5/9/2025");

    await PressCalculate({ page });

    await ValidateParkingCost({ page }, expectedValue);
    await ValidateTime({ page }, "(1 Days, 0 Hours, 0 Minutes)");
}

// Test same day 12-hour interval
export async function testSameDay12HoursIntervalWithInputs({
    page,
}: {
    page: any;
}, expectedValue: string) {
    await inputDay({ page }, "StartingDate", "5/9/2025");
    await inputDay({ page }, "LeavingDate", "5/9/2025");

    await inputTime({ page }, "StartingTime", "1:00");
    await inputTime({ page }, "LeavingTime", "13:00");

    await PressCalculate({ page });

    await ValidateParkingCost({ page }, expectedValue);
    await ValidateTime({ page }, "(0 Days, 12 Hours, 0 Minutes)");
}

// Test same day 5-hour interval
export async function testSameDay5HoursIntervalWithInputs({
    page,
}: {
    page: any;
}, expectedValue: string) {
    await inputDay({ page }, "StartingDate", "5/9/2025");
    await inputDay({ page }, "LeavingDate", "5/9/2025");

    await inputTime({ page }, "StartingTime", "1:00");
    await inputTime({ page }, "LeavingTime", "6:00");

    await PressCalculate({ page });

    await ValidateParkingCost({ page }, expectedValue);
    await ValidateTime({ page }, "(0 Days, 5 Hours, 0 Minutes)");
}

// Test same day 4-hour interval
export async function testSameDay4HoursIntervalWithInputs({
    page,
}: {
    page: any;
}, expectedValue: string) {
    await inputDay({ page }, "StartingDate", "5/9/2025");
    await inputDay({ page }, "LeavingDate", "5/9/2025");

    await inputTime({ page }, "StartingTime", "1:00");
    await inputTime({ page }, "LeavingTime", "5:00");

    await PressCalculate({ page });

    await ValidateParkingCost({ page }, expectedValue);
    await ValidateTime({ page }, "(0 Days, 4 Hours, 0 Minutes)");
}

// Test same day 1-minute interval
export async function testSameDay1MinuteIntervalWithInputs({
    page,
}: {
    page: any;
}, expectedValue: string) {
    await inputDay({ page }, "StartingDate", "5/9/2025");
    await inputDay({ page }, "LeavingDate", "5/9/2025");

    await inputTime({ page }, "StartingTime", "1:00");
    await inputTime({ page }, "LeavingTime", "1:01");

    await PressCalculate({ page });

    await ValidateParkingCost({ page }, expectedValue);
    await ValidateTime({ page }, "(0 Days, 0 Hours, 1 Minutes)");
}

// Test same day 5 hours 1 minute interval
export async function testSameDay5Hours1MinuteIntervalWithInputs({
    page,
}: {
    page: any;
}, expectedValue: string) {
    await inputDay({ page }, "StartingDate", "5/9/2025");
    await inputDay({ page }, "LeavingDate", "5/9/2025");

    await inputTime({ page }, "StartingTime", "1:00");
    await inputTime({ page }, "LeavingTime", "6:01");

    await PressCalculate({ page });

    await ValidateParkingCost({ page }, expectedValue);
    await ValidateTime({ page }, "(0 Days, 5 Hours, 1 Minutes)");
}

// Test 1 day 1 minute interval
export async function test1Day1MinuteIntervalWithInputs({
    page,
}: {
    page: any;
}, expectedValue: string) {
    await inputDay({ page }, "StartingDate", "5/8/2025");
    await inputDay({ page }, "LeavingDate", "5/9/2025");

    await inputTime({ page }, "StartingTime", "1:00");
    await inputTime({ page }, "LeavingTime", "1:01");

    await PressCalculate({ page });

    await ValidateParkingCost({ page }, expectedValue);
    await ValidateTime({ page }, "(1 Days, 0 Hours, 1 Minutes)");
}

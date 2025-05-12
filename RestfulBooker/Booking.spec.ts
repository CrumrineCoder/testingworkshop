import { test, expect } from "playwright/test";
test("Check All Bookings", async ({request}) => {
    const bookings = await request.get("https://restful-booker.herokuapp.com/booking")
    expect(bookings.ok()).toBeTruthy(); 
    const bookingsJson = await bookings.json();
    console.log(bookingsJson);
});

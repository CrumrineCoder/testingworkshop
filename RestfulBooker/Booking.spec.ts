import { test, expect } from "playwright/test";

// from https://www.geeksforgeeks.org/javascript-program-to-check-if-an-array-contains-only-unique-values/
function checkDistinct(array) {
    const checkSet = new Set(array);
    return checkSet.size === array.length;  
}

let firstBookingid: number; 

test("Check All Bookings", async ({request}) => {
    const bookings = await request.get("https://restful-booker.herokuapp.com/booking");
    expect(bookings.ok()).toBeTruthy(); 
    expect(bookings.status()).toBe(200);
    const bookingsJson: { bookingid: number }[] = await bookings.json();
    expect(checkDistinct(bookingsJson));
    firstBookingid = bookingsJson[0]?.bookingid; 
});

test("Get First Booking", async ({request}) => {
    const firstBooking = await request.get("https://restful-booker.herokuapp.com/booking/" + firstBookingid);
    expect(firstBooking.ok()).toBeTruthy(); 
    expect(firstBooking.status()).toBe(200);
    console.log(await firstBooking.json());
})

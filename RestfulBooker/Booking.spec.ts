import { test, expect } from "playwright/test";

type BookingData = {
  firstname: string;
  lastname: string;
  totalprice: number;
  depositpaid: boolean;
  bookingdates: {
    checkin: string;
    checkout: string;
  };
  additionalneeds: string;
};

// from https://www.geeksforgeeks.org/javascript-program-to-check-if-an-array-contains-only-unique-values/
function checkDistinct(array) {
  const checkSet = new Set(array);
  return checkSet.size === array.length;
}

let firstBookingid: number;
let firstBookingData: BookingData;
let token: string;

test("Check All Bookings", async ({ request }) => {
  const bookings = await request.get("/booking");
  expect(bookings.ok()).toBeTruthy();
  expect(bookings.status()).toBe(200);
  const bookingsJson: { bookingid: number }[] = await bookings.json();
  expect(checkDistinct(bookingsJson));
  firstBookingid = bookingsJson[0]?.bookingid;
});

test("Get First Booking", async ({ request }) => {
  const firstBooking = await request.get("/booking/" + firstBookingid);
  expect(firstBooking.ok()).toBeTruthy();
  expect(firstBooking.status()).toBe(200);
  firstBookingData = await firstBooking.json();
  //  console.log(firstBookingData);
});

test("Get Token", async ({ request }) => {
  const tokenRequestBody = {
    username: "admin",
    password: "password123",
  };
  const tokenRequest = await request.post("/auth", {
    data: tokenRequestBody,
  });
  expect(tokenRequest.ok()).toBeTruthy();
  expect(tokenRequest.status()).toBe(200);
  const { token: receivedToken } = await tokenRequest.json();
  token = receivedToken;
});

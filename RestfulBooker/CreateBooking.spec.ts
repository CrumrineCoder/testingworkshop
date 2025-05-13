import { test, expect } from "playwright/test";

test("Create Correct Booking", async ({ request }) => {
  const bookingData = {
    firstname: "Nicolas",
    lastname: "Crumrine",
    totalprice: 100,
    depositpaid: true,
    bookingdates: {
      checkin: "10/10/2010",
      checkout: "10/20/2010",
    },
    additionalneeds: "Water",
  };
  const createBookingRequest = await request.post("/booking", {
    data: bookingData
  });
  expect(createBookingRequest.ok()).toBeTruthy();
  expect(createBookingRequest.status()).toBe(200);
});

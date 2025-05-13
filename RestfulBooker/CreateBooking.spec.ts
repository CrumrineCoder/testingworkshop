import { test, expect } from "playwright/test";
import { BookingData } from "./Booking.spec";

type ExpectedCreateBookingData = {
    bookingid: number,
    booking: BookingData
}

function isExpectedCreateBookingData(data: any): data is ExpectedCreateBookingData {
  return (
    typeof data.firstname === "string" &&
    typeof data.lastname === "string" &&
    typeof data.totalprice === "number" &&
    typeof data.depositpaid === "boolean" &&
    typeof data.bookingdates === "object" &&
    typeof data.bookingdates.checkin === "string" &&
    typeof data.bookingdates.checkout === "string" &&
    typeof data.additionalneeds === "string"
  );
}

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
  let createdBooking = await createBookingRequest.json();
  expect(isExpectedCreateBookingData(createdBooking))
});

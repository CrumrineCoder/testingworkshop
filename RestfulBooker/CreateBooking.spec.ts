import { test, expect } from "playwright/test";
import { BookingData } from "./Booking.spec";

type ExpectedCreateBookingData = {
  bookingid: number;
  booking: BookingData;
};

// Type Guard; not sure if there's a way to just inherently check the Type of the returned API response but this was the best solution I could find for determining if the data we put in the database matches what we add. Besides checking that the added data is the same as the data that we do add, which I'm doing, but I think this is more modular in case we change the default data we add.
function isExpectedCreateBookingData(
  data: any
): data is ExpectedCreateBookingData {
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

const baseBookingData = {
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

test("Create Correct Booking", async ({ request }) => {
  const createBookingRequest = await request.post("/booking", {
    data: baseBookingData,
  });
  expect(createBookingRequest.ok()).toBeTruthy();
  expect(createBookingRequest.status()).toBe(200);
  let createdBooking = await createBookingRequest.json();
  expect(isExpectedCreateBookingData(createdBooking));
  const getCreatedbooking = await request.get(
    "/booking/" + createdBooking.bookingid
  );
  expect(getCreatedbooking.ok()).toBeTruthy();
  expect(getCreatedbooking.status()).toBe(200);
  let checkCreatedBookingInDB = await createBookingRequest.json();
  // Need to make sure what we added to the database didn't get transformed or changed
  expect(checkCreatedBookingInDB.booking === baseBookingData);
});

test.describe("Create Incorrect Booking", () => {
  // Currently Total price, Deposit Paid, Checkin, Checkout, and Additional needs are not being validated in the back end correctly
  const invalidTestCases = [
    { field: "firstname", data: { ...baseBookingData, firstname: 1337 } },
    { field: "lastname", data: { ...baseBookingData, lastname: 123 } },
    {
      field: "totalprice",
      data: { ...baseBookingData, totalprice: "one hundred" },
    },
    { field: "depositpaid", data: { ...baseBookingData, depositpaid: "yes" } },
    {
      field: "bookingdates",
      data: { ...baseBookingData, bookingdates: "invalid" },
    },
    {
      field: "checkin",
      data: {
        ...baseBookingData,
        bookingdates: { checkin: 123, checkout: "10/20/2010" },
      },
    },
    {
      field: "checkout",
      data: {
        ...baseBookingData,
        bookingdates: { checkin: "10/10/2010", checkout: 456 },
      },
    },
    {
      field: "additionalneeds",
      data: { ...baseBookingData, additionalneeds: 789 },
    },
  ];

  for (const testCase of invalidTestCases) {
    test(`should fail when ${testCase.field} is invalid`, async ({
      request,
    }) => {
      const createBookingRequest = await request.post("/booking", {
        data: testCase.data,
      });
      expect(createBookingRequest.status()).toBe(500);
    });
  }
});

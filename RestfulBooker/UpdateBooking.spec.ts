import { test, expect } from "playwright/test";

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

const updatedBookingData = {
  firstname: "Greg",
  lastname: "Ducat",
  totalprice: 400,
  depositpaid: false,
  bookingdates: {
    checkin: "12/10/2000",
    checkout: "12/11/2000",
  },
  additionalneeds: "Fun",
};

let token: string;
let bookingID: number;

test.beforeAll(async ({ request }) => {
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
  console.log(token);
});

test("Update Booking Success", async ({ request }) => {
  const createBookingRequest = await request.post("/booking", {
    data: baseBookingData,
  });
  expect(createBookingRequest.ok()).toBeTruthy();
  expect(createBookingRequest.status()).toBe(200);
  const bookingResponse = await createBookingRequest.json();
  bookingID = bookingResponse.bookingid;

  const headers = {
    Cookie: `token=${token}`,
  };
  const updateBookingRequest = await request.put("/booking/" + bookingID, {
    data: updatedBookingData,
    headers: headers,
  });
  expect(updateBookingRequest.ok()).toBeTruthy();
  expect(updateBookingRequest.status()).toBe(200);
  let updatedBookingResponse = await updateBookingRequest.json();
  console.log(updatedBookingResponse);
});

test.describe("Update Incorrect Booking", () => {
  const invalidTestCases = [
    { field: "firstname", data: { ...baseBookingData, firstname: 1337 } },
    { field: "lastname", data: { ...baseBookingData, lastname: 123 } },
    {
      field: "totalprice",
      data: { ...baseBookingData, totalprice: "one hundred" },
    },
    {
      field: "depositpaid",
      data: { ...baseBookingData, depositpaid: "yes" },
    },
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
      const headers = {
        Cookie: `token=${token}`,
      };
      const updateBookingRequest = await request.put("/booking/" + bookingID, {
        data: testCase.data,
        headers: headers,
      });
      // Total price is error code 200; depositpaid, bookingdates, checkin, checkout, additionalneeds, totalprice are 405
      expect(updateBookingRequest.status()).toBe(500);
    });
  }
});

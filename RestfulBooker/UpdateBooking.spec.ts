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

test("Update Booking Success", async ({ request }) => {
  const createBookingRequest = await request.post("/booking", {
    data: baseBookingData,
  });
  expect(createBookingRequest.ok()).toBeTruthy();
  expect(createBookingRequest.status()).toBe(200);

  const bookingResponse = await createBookingRequest.json();

  const headers = {
    Cookie: `token=${token}`,
  };
  const updateBookingRequest = await request.put(
    "/booking/" + bookingResponse.bookingid,
    {
      data: updatedBookingData,
      headers: headers,
    }
  );
  expect(updateBookingRequest.ok()).toBeTruthy();
  expect(updateBookingRequest.status()).toBe(200);
  let updatedBookingResponse = await updateBookingRequest.json();
  console.log(updatedBookingResponse);
});

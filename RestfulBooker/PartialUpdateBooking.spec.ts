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

  const createBookingRequest = await request.post("/booking", {
    data: baseBookingData,
  });
  expect(createBookingRequest.ok()).toBeTruthy();
  expect(createBookingRequest.status()).toBe(200);
  const bookingResponse = await createBookingRequest.json();
  bookingID = bookingResponse.bookingid;
});

test("Partial Update Booking Success", async ({ request }) => {
  const headers = {
    Cookie: `token=${token}`,
  };
  const partialUpdateData = {
    firstname: updatedBookingData.firstname,
    lastname: updatedBookingData.lastname,
  };
  const partialUpdateBookingRequest = await request.patch(
    "/booking/" + bookingID,
    {
      data: partialUpdateData,
      headers: headers,
    }
  );
  expect(partialUpdateBookingRequest.ok()).toBeTruthy();
  expect(partialUpdateBookingRequest.status()).toBe(200);
  let updatedBookingResponse = await partialUpdateBookingRequest.json();
  console.log(updatedBookingResponse);
});

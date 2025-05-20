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
    checkin: "2000-12-10",
    checkout: "2000-12-11",
  },
  additionalneeds: "Fun",
};

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

const fieldsToUpdate = [
  { field: "firstname", data: { firstname: updatedBookingData.firstname } },
  { field: "lastname", data: { lastname: updatedBookingData.lastname } },
  {
    field: "totalprice",
    data: { totalprice: updatedBookingData.totalprice },
  },
  {
    field: "depositpaid",
    data: { depositpaid: updatedBookingData.depositpaid },
  },
  {
    field: "bookingdates",
    data: { bookingdates: updatedBookingData.bookingdates },
  },
  {
    field: "additionalneeds",
    data: { additionalneeds: updatedBookingData.additionalneeds },
  },
];

test.describe("Partial Update Booking - Field-by-Field", () => {
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
  
  for (const testCase of fieldsToUpdate) {
    test(`should successfully update ${testCase.field}`, async ({
      request,
    }) => {
      const headers = {
        Cookie: `token=${token}`,
      };

      const partialUpdateBookingRequest = await request.patch(
        "/booking/" + bookingID,
        {
          data: testCase.data,
          headers: headers,
        }
      );

      expect(partialUpdateBookingRequest.status()).toBe(200);

      const updatedBookingResponse = await partialUpdateBookingRequest.json();
      const updatedField = Object.keys(testCase.data)[0];
      expect(updatedBookingResponse[updatedField]).toEqual(
        testCase.data[updatedField]
      );
    });
  }
  
  for (const invalidtestCase of invalidTestCases) {
    test(`should error when updating ${invalidtestCase.field}`, async ({
      request,
    }) => {
      const headers = {
        Cookie: `token=${token}`,
      };

      const partialUpdateBookingRequest = await request.patch(
        "/booking/" + bookingID,
        {
          data: invalidtestCase.data,
          headers: headers,
        }
      );
      // Should be 400 not 200
       expect(partialUpdateBookingRequest.status()).toBe(400);
    });
  }

  test("PartialUpdateBooking with empty fields", async ({ request }) => {
    const headers = {
      Cookie: `token=${token}`,
    };
    const EmptyPartialUpdateBookingRequest = await request.patch(
      "/booking/" + bookingID,
      { headers: headers }
    );
    // ERROR: This should be 400, not 200
    expect(EmptyPartialUpdateBookingRequest.status()).toBe(400);
  });
});

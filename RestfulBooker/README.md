https://restful-booker.herokuapp.com/
https://github.com/mwinteringham/restful-booker

# Errors

* Delete API pathway returns 201 not 204. 
* Ping Testing API pathway returns 201 not 200. It also says "Created" when that's not what the function is meant to do. 
* For Create Booking, when the Total price, Deposit Paid, Checkin, Checkout, and Additional needs are incorrect we receive HTTP code 200 instead of 500. 
* For Update Booking, Total price is error code 200; depositpaid, bookingdates, checkin, checkout, additionalneeds, totalprice are 405. These should all be 500.
* DELETE, UPDATE, and PARTIAL UPDATE should probably all be authenticated for the correct user but I can understand why this example API doesn't have that functionality. 
* CREATE doesn't require any fields to add a listing!! It returns 200 instead of 400
* PARTIAL UPDATE doesn't require any fields. It returns 200 instead of 400. 

# Test Cases

## Get Booking IDs (GET)

* Check that Booking IDs are unique
* Check that only Booking IDs are returned

## Get Booking (GET)

* Check that a booking ID returns the correct formatting:
    * Firstname: string
    * Lastname: string
    * Totalprice: Number
    * Depositpaid: Boolean
    * Booking Dates: Object
        * Checkin: Date
        * Checkout: Date
    * Additionalneeds: String

## Create Booking (POST)

* Check that a booking with the above formatting can be created
* Check that a proper error message is created when the data is incorrectly formatted
* Check that the created booking has the correct format and has the data that we inserted
* Check that additionalneeds is optional; either the field is not added, or is undefined. 
* Check that each other field returns an error if undefined or not added. 

## Update Booking (PUT)

* Check that a user can correctly replace an existing record so long as it's correctly formatted
* Check that the user receives a 500 HTTP code when they incorrectly format any part of the booking data
* Invalid field
* 403 Forbidden without correct Cookies/Headers

## Partial Update Booking (PATCH)

* Check that a user can correclty replacing an existing record's fields so long as it's correctly formatted
* Check that the user receives a 500 HTTP code when they incorrectly format their booking data
* Invalid field
* 403 Forbidden without correct Cookies/Headers

## Delete Booking (DELETE)

* If a user authenticates correctly they're able to remove a record from the booking database by ID

## Health Check (GET)
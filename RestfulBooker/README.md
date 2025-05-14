https://restful-booker.herokuapp.com/
https://github.com/mwinteringham/restful-booker

# Errors

* Delete API pathway returns 201 not 204. 
* Ping Testing API pathway returns 201 not 200. It also says "Created" when that's not what the function is meant to do. 
* For Create Booking, when the Total price, Deposit Paid, Checkin, Checkout, and Additional needs are incorrect we receive HTTP code 200 instead of 500. 

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

## Update Booking (PUT)

## Partial Update Booking (PATCH)

## Delete Booking (DELETE)

## Health Check (GET)
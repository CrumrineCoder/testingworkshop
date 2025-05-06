https://www.shino.de/parkcalc/

# Manual Test Cases for Parking Calculator

Confirm form is USEABLE: 
- Interact with "Choose a Parking Lot" dropdown and verify each option is selectable
    - Valet Parking
    - Short-Term Parking
    - Economy Parking
    - Long-Term Garage Parking
    - Long-Term Surface Parking
- Interact with Radio buttons and verify both options are selectable
    - Entry AM
    - Entry PM
    - Leaving AM 
    - Leaving PM
- Interact with Input fields and verify each option is editable
    - Entry Day
    - Entry Time
    - Leaving Day
    - Leaving Time
- Interact with Calendar buttons and verify an external window opens, and dates are clickable
    - Entry Calendar
    - Leaving Calendar
    - Month Dropdown
    - Past Year and Future Year
    - Clickable Day Buttons
    - Window closes when a Date is selected
- Interact with the Calculate button and verify form is submitted

Check Errors:
- Interact with dates and input an entry date in the past
- Interact with dates and input a leaving date that is before the entry date (after the present)
- Interact with Calculate button without inputting data into each field
- Input non-numbers into Date input fields
- Input the same date into the Date input fields 
- Input an incomplete date into the Date input fields 
- Input a number over 12 into the hour fields. While the application automatically converts PM to AM for the user, it does not adjust the DAY. 
    - As an aside, why would we have the radio buttons for AM and PM if it's going to automatically convert to military time? The app should either automatically maintain AM and PM for the user, or the user shouldn't have an option besides military time. 

Valet Parking:

- Confirm five hours or less
    - Input Noon of next day for Entry Date and 5 PM of the same day for Leaving Date
    
    - Input Noon of next day for Entry Date, and 5 AM of the same day for Leaving Date
    - Input Midnight of next day for Entry Date, and 5 AM of the same day for Leaving Date
    - Input Midnight of next day for Entry Date, and 5 PM of the same day for Leaving Date
- Confirm how a day is calculated
    - Input 11:59 PM of next day for Entry Date, and 12:01 AM of day after for Leaving Date
    - Input 11:59 PM of next day for Entry Date, and 12:01 AM of two days after for Leaving Date

- With Valet Parking, input the same date (current time) for both fields. Value will be $12, although should probably be invalid. 



Parking Rates

Valet Parking
$18 per day
$12 for five hours or less

Short-Term (hourly) Parking
$2.00 first hour; $1.00 each additional 1/2 hour
$24.00 daily maximum

Long-Term Garage Parking
$2.00 per hour
$12.00 daily maximum
$72.00 per week (7th day free)

Long-Term Surface Parking (North Lot)
$2.00 per hour
$10.00 daily maximum
$60.00 per week (7th day free)

Economy Lot Parking
$2.00 per hour
$9.00 daily maximum
$54.00 per week (7th day free)

A Lost Ticket Fee of $10.00 will be assessed when the original parking stub cannot be produced when exiting the parking facilities (does not apply to Valet Parking).

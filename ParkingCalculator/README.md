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
     - This does seem to be validated, except the user can input negative numbers so you can get -1 Day, -20 hours, etc. 
     - It's not validated for same day but the departure time is before the entry time. It seems to only check the DAY, which can also be avoided with negative numbers. 
- Interact with Calculate button without inputting data into each field
- Input non-numbers into Date input fields
- Input the same date into the Date input fields
- Input an incomplete date into the Date input fields
- Input a number over 12 into the hour fields. While the application automatically converts PM to AM for the user, it does not adjust the DAY.
  - As an aside, why would we have the radio buttons for AM and PM if it's going to automatically convert to military time? The app should either automatically maintain AM and PM for the user, or the user shouldn't have an option besides military time.
    - It's also an issue if the user inputs 12:01 PM but then it'll set the time to 12:01 AM. The form will still submit with the correct time, but adjusting will require the user to adjust it back to PM unnecessarily. 
- Formatting error, but if the value is 1 (eg. 1 Day) it's currently reading as Days or Minutes, when it should just be singular Day or Minute or Hour. 
- Dates should be formatted like 00/00/0000 (Also it should be clear which is the day and which is the month). Currently the user can add any number, or anyTHING to these input fields. For example while 00005/07/2025 does work, the user can also add 5/700/2025, which should return an error. 
- Negative numbers should not be allowed
- Days should not be allowed to go over 31 (and should be validated to the month, eg February 28 or 29). Months should not go over 12. Year shouldn't be able to go below 2025, and probably shouldn't be able to go more than a year in the future? Not sure on the last one. 
- When the form is submitted, Parking Lot dropdown resets to Valet parking. This probably shouldn't happen.
- Small UI thing but the calendar popup should probably have easier access to selecting the next or previous month instead of next or previous year since that's the more likely usecase. 
- Form should probably reset on refresh; the url updates so the user can manually edit the URL to reset but there might want to be a dedicated reset button. 

Valet Parking:

- Confirm five hours or less
  - Input Noon of next day for Entry Date and 5 PM of next day for Leaving Date
  - Input Noon of next day for Entry Date, and 5:01 PM of next day for Leaving Date
  - Input Noon of next day for Entry Date, and 5 AM of next day for Leaving Date
  - Input Midnight of next day for Entry Date, and 5 AM of next day for Leaving Date
  - Input Midnight of next day for Entry Date, and 5 PM of next day for Leaving Date
- Confirm how a day is calculated
  - Input 11:59 PM of next day for Entry Date, and 12:01 AM of day after for Leaving Date
  - Input 11:59 PM of next day for Entry Date, and 12:01 AM of two days after for Leaving Date
  - Input current day at 0 AM (midnight) and next day at 23:59 AM. Value should be $36 (1 day 23 hours 59 minutes). 
  - Input current day at 0 AM and current day at 23:59 AM. Value should be $18 (23 hours 59 minutes).
  - Input current day at 0 AM and next day at 0:01 AM. Value should be $36 (1 Day 1 Minutes)

- With Valet Parking, input the same date (current time) for both fields. Value will be $12, although should probably be invalid.

Hourly Parking:

- Input a date range under 1 hour. ($2)
- Input a date ranger of 1 hour ($2)
- Input a date range 1 hour and 1 minute. ($3)
- Input a date range 1 hour 30 minutes ($3)
- Input a date range 1 hour 31 minutes ($4)

By $24 daily maximum, does that mean the user can't reserve more than that amount? Or does it mean the user is only charged $24 a day? $24 equates to 12 hours, so if the user reserves 14 hours should that throw an error? 
    - Also, does a day mean 24 hours, or passing a calendar day? Or is it a combination of the two? Like if they reserve at 10 PM, and pass onto a new day, is that going past the daily maximum? 
    - If the user inputs 10 PM one day, and then 10 AM the day after they're charged 18$ for 12 hours. If they input 10 PM the day after instead of 10 AM, they're also charged 18$  for 1 day. But then if they input 11 PM the day after, the price jumps to 36$

Long-term Garage Parking:

-Input under 1 hour ($2)
-Input 1 hour ($2)
- Error: Input 10 PM (22 hour) and then input Midnight (24 hour). You'll get charged 12 dollars, even though it's $12 daily MAXIMUM (I still don't fully understand what that's supposed to mean). 
- The above error also happens with 21 & 23. Or any other time above 1 hour - which should be 2 dollars, but the price jumps to $12. 
- there's another price jump
- Input 6 days ($72)
- Input 1 week ($72) [because 1 day is free]
- Input 1 week 6 days ($144)
- Input 2 weeks ($144) [checking if the free day works over 1 week]

Long-Term Surface Parking: 

- Input under 1 hour ($2)
- Input 1 hour ($2)
- Input 4 hours ($8)
- Input 5 hours ($10)
- Input 7 hours ($10)
- Input 23 hours 59 minutes ($10) [same day]
- Input 23 hours 59 minutes ($20) [different days] 
- Input 9 hour between two days ($18)
- Input 6 days ($60)
- Input 7 days ($60)
- Input 8 days ($70)
- Input 30 days 23 hours 59 minutes ($270)
- Input 31 days ($270) 
- Input 31 days 1 minute ($272)

Economy:
- Input under 1 hour ($2)
- Input 1 hour ($2)
- Input 1 hour 1 min ($2)
- Input 2 hours ($4)
- Input 4 hours ($8)
- Input 4 hours 59 minutes ($8) -> Error I get $10
- Input 5 hours ($9)
- Input 6 days ($54)
- Input 7 days ($54)
- Input 8 days ($63)
- Input 2 weeks ($108)

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

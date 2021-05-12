# Groana's Solution to Upward Take Home Assignment

My solution takes into account that this is a `POST` route for merchants to update their configuration. A merchant must know their merchant id in order to update their configuration. If the id does not exist, a 400 error is sent to the user stating that the merchant does not exist. I also added a prequalification field inside of the Merchant Configuration model and set it's default value to 'false'.

The design decisions I considered when implementing this endpoint was to check for input errors and edge cases inside of my post route before making requests to my database. Inside of my `POST` route, I check if the user exists, and that that minimum loan amount is always less than the maximum loan amount. Methods for searching the database, creating or updating instances are handled by the file `js/repo/index.js`. I decided to send the updated instance as a response.

I used the following request to test my route in Postman:
```
{
  "data": {
      "minimum_loan_amount_cents": 1000,
      "maximum_loan_amount_cents": 500000,
      "prequal_enabled": true,
      "merchant_id": 1
  }
}
```

Answers to the following questions would provide future improvements that can be added to make this endpoint more robust are

  - What is the minimumn difference between minimum and maximum loan amounts?
  - This route needs to be secured so that only logged in merchants can change their configuation.
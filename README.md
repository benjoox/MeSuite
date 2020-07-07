
## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Deployement

Make sure the next-serverless component are installed and then
- serverless

## Architecture

You can find the flow of the application on this [diagram](https://docs.google.com/drawings/d/11Y9G6Av0-Il7OAYBRCxBtELvPbBfgVYKybaI64utJG4/edit?usp=sharing).


## TODO

0. \[Done\] Top priority : tooltip for each label
1. Add total capital as an input field until the capital can be read from the db. Get the difference of this amount with the 'value of outstanding securties'
1. Add the transaction account to the portfolio account and show that they are consolidated at every moment
2. Start the database for both of them 
3. Add authentication
4. Deploy the stack along side with the database
5. \[Done\] Bring in the closing price for each holding stock
6. \[Done\] Calculate the protfolio value with the value of the last price for the holding stock
7. Display the value of the portfolio for at the end of every day and record
8. P/L relative to capital
9. Add net/total cost for individual stock
10. Get a monthly report
11. For each stock user can put add as many hypothetical trades and get the result for the average price and the percentage change of the portfolio for that trade
12. Add percentage change and dollar change on the outstanding shares on the portfolio page

## Pages

Home landing page
has only a login button


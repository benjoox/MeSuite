# MeSuite

A suite of small applications with the aim to assist individuals to analyse their financial position in respect to their investments in a financial market or their personal spending accounts. The motivation behind building this app is to avoid the limitations and hence the frustrations presented when using spreadsheets.

The MVP of this project is built with [Next.js](https://nextjs.org/) framework and can be deployed to an AWS account using the [Serverless Next.js component](https://www.serverless.com/blog/serverless-nextjs). Shout out to all the serverless community for creating an amazing tool.

At the time of writing this document there are three features available:

-   MeFinance:
    This feature provides an interface to the user to upload a spreadsheet of their bank account transactions, filter them and tag them. User can use this feature in two modes. The offline which can be used without logging in. The user can simply upload a CSV with the correct headers ['date', 'amount', 'description', 'balance', 'category'] and the oneline mode where the user can also save their data for future. You need to be logged in to the app to be able to use the latter features. [Auth0](https://auth0.com/) services are being used to authenticate the user.

-   MeMarket:
    This feature provides an interface to the user to upload financial markets transaction and analyse their portfolio. User can get the P/L after each trade, a summary of the position hold on each stock and a summary of their whole portfolio. Like the MeFinance interface user can upload their CSV file with headers ['orderNumber', 'date', 'type', 'code', 'units', 'price', 'fees', 'net'] in an offline mode and analyse their positions without saving any data. Or they can also login to their account and save their data for furture references. In the portfolio section of this app the P/L of the portfolio is calculated by the latest price of the shares on Australian Stock Exchange. Please note that this part only works for stock available on the ASX website and the data is delayed by atleast 20 mins.

-   MeCalculator:
    This part allow the user to input any hypothetical buy and sell price and calculate the P/L in percentage or dollor value.

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

-   serverless

## Architecture

You can find the flow of the application on this [diagram](https://docs.google.com/drawings/d/11Y9G6Av0-Il7OAYBRCxBtELvPbBfgVYKybaI64utJG4/edit?usp=sharing).

## TODO

0. \[Done\] Top priority : tooltip for each label
1. Add total capital as an input field until the capital can be read from the db. Get the difference of this amount with the 'value of outstanding securties'
1. Add the transaction account to the portfolio account and show that they are consolidated at every moment
1. Start the database for both of them
1. Add authentication
1. Deploy the stack along side with the database
1. \[Done\] Bring in the closing price for each holding stock
1. \[Done\] Calculate the protfolio value with the value of the last price for the holding stock
1. Display the value of the portfolio for at the end of every day and record
1. P/L relative to capital
1. Add net/total cost for individual stock
1. Get a monthly report
1. For each stock user can put add as many hypothetical trades and get the result for the average price and the percentage change of the portfolio for that trade
1. Add percentage change and dollar change on the outstanding shares on the portfolio page

## Pages

Home landing page
has only a login button

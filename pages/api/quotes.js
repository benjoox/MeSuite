import fetch from 'isomorphic-fetch'
import { parse } from 'node-html-parser';

export default async (req, res) => {
    console.log('req.cookies are ', req.cookies)
    const BASE_API_URL = 'https://www.asx.com.au/asx/markets/equityPrices.do?by=asxCodes&asxCodes='
    console.log('req.method are ', req.method)
    console.log('req.query are ', req.query)
    
    const response = await fetch(`${BASE_API_URL}${req.query.ticker}`)
    const data = await response.text()

    const root = parse(data)
    
    const lastElement = root.querySelector('.last')
    const lastPrice = lastElement.firstChild.rawText.split('\n')[0]
    
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ lastPrice }))
  } 
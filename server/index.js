import express from 'express'
import axios from 'axios'
import { parse } from 'node-html-parser';

const app = express()

app.get('/quotes/:ticker', async (req, res) => {
    try {
        const BASE_API_URL = 'https://www.asx.com.au/asx/markets/equityPrices.do?by=asxCodes&asxCodes='
        const { data } = await axios.get(`${BASE_API_URL}${req.params.ticker}`)
        const root = parse(data)
    
        const lastElement = root.querySelector('.last')
        const price = lastElement.firstChild.rawText.split('\n')[0]
    
        res.send({
            code: '200',
            data: price,
            message: `Successfull return for ticker ${req.params.ticker}`
        })
    } catch(err) {
        console.log('Error in /quotes/:ticker endpoint', err)
        res.send({
            code: '500',
            message: 'Server error'
        })
    }
    
})

app.get('*', (req, res) => res.json({
    code: "404",
    message: "Could not find the requested resources"
}))

const PORT = process.env.PORT || 3001

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
import { getItem } from '../services/dynamoDb'
import { get, put, batchPutItem, scan, scanAll } from '../logic/transactions'
import fetch from 'isomorphic-fetch'

export default async (req, res) => {
    const { method } = req
    let response = null
    switch(method) {
        case 'GET': 
            console.log('The GET method in transaction is called')
            const { date, ticker } = req.query
            if(date) response = await getItem(date, ticker)
            else if(ticker) response = await scan(ticker)
            else response = await scanAll()

            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(response))
            break;

        case 'PUT':
            response = await put(req.body)
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(response))
            break;
        case 'POST': 
            response = await batchPutItem(JSON.parse(req.body))
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(response))
            break;
        default:
            console.log('The HTTP method requesed is not valid')
    }
}
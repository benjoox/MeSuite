import { getItem, create } from '../services/dynamoDb'
import { get, put, batchPutItem, scan, scanAll } from '../models/transactions'
import { authorise, createUser } from './users'

export default async (req, res) => {
    const { method } = req
    let response = null
    switch(method) {
        case 'GET': 
            try {
                console.log('The GET method in transaction is called with headers')
                const { date, ticker } = req.query
                const { authorization } = req.headers
                const user = await authorise(authorization)
                const { email } = user
                await createUser(email)
                if(date) response = await getItem(date, ticker)
                else if(ticker) response = await scan(ticker)
                else response = await scanAll()
    
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify(response))
            } catch(err) {
                console.log('Error in getting transations ', err.message)
                if(err.message === 'invalid signature') {
                    res.status(401).send({
                        error: 'Unauthorized',
                        message: 'The user is not verfied. Try logging out and in'    
                    })
                }
            } 
            
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
import * as dynamodb from '../services/dynamoDb'

export default async (req, res) => {
    const { date, ticker } = req.query
    try {
        const params = {
            RequestItems: {
                prices: {
                    Keys: [
                        {
                            date: { S: date },
                            ticker: { S: ticker },
                        },
                    ],
                },
            },
        }

        const { Responses } = await dynamodb.batchGetItem(params).promise()

        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')

        res.end(JSON.stringify({ lastPrice: Responses.prices[0].close.S }))
    } catch (err) {
        res.end(JSON.stringify({ lastPrice: 0 }))
    }
}

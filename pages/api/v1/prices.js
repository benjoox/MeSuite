var AWS = require('aws-sdk')

export default async (req, res) => {
    const { date, ticker } = req.query
    try {
        var params = {
            RequestItems: {
                "prices": {
                    Keys: [{
                        "date": { S: date },
                        "ticker": { S: ticker }
                    }]
                }   
            }
        };
        
        const { Responses } = await dynamodb.batchGetItem(params).promise()
        console.log(Responses.prices[0].close.S)
    
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        
        res.end(JSON.stringify({ "lastPrice" : Responses.prices[0].close.S }))
    } catch(err) {
        res.end(JSON.stringify({ "lastPrice" : 0 }))
    }
    
  
  
  }

  const config = {
    "apiVersion": "2012-08-10",
    "accessKeyId": "uclnoa",
    "secretAccessKey": "xvpj8",
    'region': 'us-west-2',
    "endpoint": "http://localhost:8000"
  }
  const dynamodb = new AWS.DynamoDB(config);

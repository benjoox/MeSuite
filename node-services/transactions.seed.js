import fs from 'fs'
import AWS from 'aws-sdk'


var config = {
  "apiVersion": "2012-08-10",
  "accessKeyId": "uclnoa",
  "secretAccessKey": "xvpj8",
  'region': 'us-west-2',
  "endpoint": "http://localhost:8000"
}
var dynamodb = new AWS.DynamoDB(config);

let params = {
  AttributeDefinitions: [
    {
      AttributeName: "date", 
      AttributeType: "S"
    },
    {
      AttributeName: "ticker", 
      AttributeType: "S"
    }
  ], 
  KeySchema: [
    {
      AttributeName: "date", 
      KeyType: "HASH"
    },
    {
      AttributeName: "ticker", 
      KeyType: "RANGE"
    }
  ], 
  ProvisionedThroughput: {
    ReadCapacityUnits: 5, 
    WriteCapacityUnits: 5
  }, 
  TableName: "transactions"
}

function create () {
  async function make() {
    const created = await dynamodb.createTable(params).promise()
    console.log('The table is created with the name ', created)
  }
  make()
}

create()


function scan() {
    dynamodb.scan({ TableName: 'transactions' },(err, result) => { 
        console.log('error' , err)
        console.log('result ', result) 
    }) 
}

params = {
  ExclusiveStartTableName: 'STRING_VALUE',
  Limit: 10
};

dynamodb.listTables(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});


export default async function get(date, ticker) {
    var params = {
        RequestItems: {
            "transactions": {
                Keys: [{
                    "date": { S: date },
                    "ticker": { S: ticker }
                }]
            }   
        }
    };
    
    return dynamodb.batchGetItem(params).promise()
}

export async function put(item) {
    try {
        const response = await dynamodb.putItem({
            TableName: 'transactions',
            Item: item
        }).promise()
        console.log('Successfully added to db ', item)
    } catch(err) {
        console.log('Error: ------- : ', err)
    }
}

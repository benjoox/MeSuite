const fs  = require('fs')
const AWS = require('aws-sdk')

const config = {
  "apiVersion": "2012-08-10",
  "accessKeyId": "uclnoa",
  "secretAccessKey": "xvpj8",
  'region': 'us-west-2',
  "endpoint": "http://localhost:8000"
}
const dynamodb = new AWS.DynamoDB(config);

function parseCSV(tablename, filePath, ticker) {
    fs.readFile(filePath, 'utf-8', (err, result) => {
        if(err) {
          console.log('The error is ', err)
          throw err
        }

        const arr = result.split("\n")
        // Ignore the last row in the array
        const itemList = []
        for(let k = 1; k < arr.length - 1; k++) {
          const temp = arr[k].split(',')
          
          itemList.push({
            PutRequest: {
              Item: {
                "date": {
                  S: temp[0]
                },
                "ticker": { S: ticker },
                "open": { S: temp[1] },
                "high": { S: temp[2] },
                "low": { S: temp[3] },
                "close": { S: temp[4] },
                "volume": { S: temp[5].split("\r")[0] }
              }
            }
          })
        }
        putInBatch(tablename, itemList)
    })
}

//parseCSV('cba')

let item = {
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
  }
}

function create (tableName) {
  const params = { ...item, TableName: tableName }
  console.log('params ', params)
  async function make() {
    const created = await dynamodb.createTable(params).promise()
    console.log('The table is created with the name ', created)
  }
  make()
}

function remove (tableName) {
  const params = { TableName: tableName }
  console.log('params ', params)
  async function del() {
    const created = await dynamodb.deleteTable(params).promise()
    console.log('The table is created with the name ', created)
  }
  del()
}


function scan(TableName) {
    dynamodb.scan({ TableName },(err, result) => { 
        console.log('error' , err)
        console.log('result ', result) 
    }) 
}

async function put(tablename, item) {
    try {
        const response = await dynamodb.putItem({
            TableName: tablename,
            Item: item
        }).promise()
        console.log('Successfully added to db ', item)
    } catch(err) {
        console.log('Error: ------- : ', err)
    }
}

async function putInBatch(tableName, itemList) {
  console.log('the length of the item to be added is ', itemList.length)
  const division = 200
  const partitionSize =  Math.round(itemList.length / division)
  console.log('paritionSize ---------------', partitionSize)
  const partitionArray = []
  for(let k = 0; k < division; k++) {
    const startIndex = (k * partitionSize) + 1
    const endIndex = (k + 1) * partitionSize
    partitionArray.push(itemList.slice(startIndex, endIndex))
  }

  const params = {
    RequestItems: {
      [tableName]: null 
    }
  }

  const newAddedPromises = partitionArray.map(async (partition, index) => {  
    
    params.RequestItems[tableName] = partition
    console.log('the length of the partition is ', partition.length)
    return await dynamodb.batchWriteItem(params).promise() 
  
  })

  const all = await Promise.all(newAddedPromises)
  console.log(all.length)
}

async function getTables () {
  const params = {
    ExclusiveStartTableName: 'STRING_VALUE',
    Limit: 10
  };
  const tables = await dynamodb.listTables(params).promise()
  console.log(tables)

}


async function get(date) {
    var params = {
        RequestItems: {
            "prices": {
                Keys: [{
                    "date": { S: date }
                }]
            }   
        }
    };
    
    return dynamodb.batchGetItem(params).promise()
}


module.exports = {
  create,
  remove,
  getTables,
  parseCSV,
  putInBatch,
  scan
}
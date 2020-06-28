import * as dynamodb from '../../services/dynamoDb'
import { getParams } from './get'
import { scanParams } from './scan'

const TABLENAME = 'prices'

const schema = {
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


export function get(date, ticker) 
    return dynamodb.getItem(getParams(TABLENAME, date, ticker))
}

export function put({ date, ticker }) {
    return dynamodb.batchGetItem(parameters(date, ticker))
}

export function scan(ticker) {
    const response = await dynamodb.scan(scanParams(TABLENAME, ticker))
    return convertToJSON(response.Items)   
}

function convertToJSON(items) {
  const result = []
  items.forEach((v, k) => {
    let obj = {}
    for(const k1 in v) {
      for(const k2 in v[k1]) {
        obj = {...obj, [k1]: v[k1][k2] }
      }
    }
    result.push(obj)
  })
  return result
}

async function putInBatch(tableName, itemList) {
  console.log('The length of the item to be added is ', itemList.length)
  const partitionArray = partitionItemList(itemList)

  const params = {
    RequestItems: {
      [tableName]: null 
    }
  }

  const newAddedPromises = partitionArray.map(async partition => {  
    params.RequestItems[tableName] = partition
    return await dynamodb.batchWriteItem(params).promise() 
  })

  await Promise.all(newAddedPromises)
}

function partitionItemList(itemList) {
  const division = 200
  const partitionSize =  Math.round(itemList.length / division)
  const partitionArray = []
  for(let k = 0; k < division; k++) {
    const startIndex = (k * partitionSize) + 1
    const endIndex = (k + 1) * partitionSize
    partitionArray.push(itemList.slice(startIndex, endIndex))
  }
  return partitionArray
}
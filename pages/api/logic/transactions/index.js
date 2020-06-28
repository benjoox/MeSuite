import * as dynamodb from '../../services/dynamoDb'
import { getParams } from './get'
import { batchPutParams } from './put'
import { scanParams, scanAllParams } from './scan'
import { 
  seperateTradesByTickers, 
  sortTransactionsByDate, 
  averagePriceForEachTransaction 
} from './_utils'

const TABLENAME = 'transactions'

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
  }, 
  TableName: TABLENAME
}


export function get(date, ticker) {
    return dynamodb.getItem(getParams(TABLENAME, date, ticker))
}

export async function scan(ticker) {
  const response = await dynamodb.scan(scanParams(TABLENAME, ticker))
  const result = []
  response.Items.forEach((v, k) => {
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

export async function scanAll() {
  const response = await dynamodb.scan(scanAllParams(TABLENAME))
  const result = []
  response.Items.forEach((v, k) => {
    let obj = {}
    for(const k1 in v) {
      for(const k2 in v[k1]) {
        
        if      (k2 === 'N') obj = { ...obj, [k1]: parseFloat(v[k1][k2]) }
        else if (k2 === 'S') obj = { ...obj, [k1]: v[k1][k2] }
        else throw Error(`Cannot handle dynamoDb data type ${typeof k1}. Tell your developers to do so`)
        
      }
    }
    result.push(obj)
  })
  const tradesMap = seperateTradesByTickers(result)
  const newMap = {}
  tradesMap.forEach((value, key) => {
      const sortedList = sortTransactionsByDate(value)
      const listWithAvg = averagePriceForEachTransaction(sortedList)
      newMap[key] = listWithAvg
  })
  return newMap
}

export function put(item) {
    //return dynamodb.batchGetItem(parameters(date, ticker))
}

export async function batchPutItem(itemList) {
  console.log('the length of the item to be added is ', itemList.length)
  const division = 2
  const partitionSize =  Math.round(itemList.length / division)
  const partitionArray = []
  for(let k = 0; k < division; k++) {
    const startIndex = (k * partitionSize) + 1
    const endIndex = (k + 1) * partitionSize
    partitionArray.push(itemList.slice(startIndex, endIndex))
  }

  const newAddedPromises = partitionArray.map(async partition => {  
    console.log('partition ', partition)
    return dynamodb.batchWriteItem(batchPutParams(TABLENAME, partition))
  })

  await Promise.all(newAddedPromises)
  
}

async function getTables () {
  const params = {
    ExclusiveStartTableName: 'STRING_VALUE',
    Limit: 10
  };
  await dynamodb.listTables(params).promise()
}

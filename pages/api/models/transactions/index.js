import * as dynamodb from '../../services/dynamoDb'
import { getParams } from './get'
import { batchPutParams } from './put'
import { scanParams, scanAllParams } from './scan'
import {
    seperateTradesByTickers,
    sortTransactionsByDate,
    averagePriceForEachTransaction,
} from './_utils'

const TABLENAME = 'Transactions'

const schema = {
    AttributeDefinitions: [
        {
            AttributeName: 'date',
            AttributeType: 'S',
        },
        {
            AttributeName: 'ticker',
            AttributeType: 'S',
        },
    ],
    KeySchema: [
        {
            AttributeName: 'date',
            KeyType: 'HASH',
        },
        {
            AttributeName: 'ticker',
            KeyType: 'RANGE',
        },
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5,
    },
    TableName: TABLENAME,
}

export function get(params) {
    const { date, ticker } = params
    return dynamodb.getItem(getParams(TABLENAME, date, ticker))
}

export async function scan(ticker) {
    const response = await dynamodb.scan(scanParams(TABLENAME, ticker))
    const result = []
    response.Items.forEach((v, k) => {
        let obj = {}
        for (const k1 in v) {
            for (const k2 in v[k1]) {
                obj = { ...obj, [k1]: v[k1][k2] }
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
        for (const k1 in v) {
            for (const k2 in v[k1]) {
                if (k2 === 'N') obj = { ...obj, [k1]: parseFloat(v[k1][k2]) }
                else if (k2 === 'S') obj = { ...obj, [k1]: v[k1][k2] }
                else
                    throw Error(
                        `Cannot handle dynamoDb data type ${typeof k1}. Tell your developers to do so`
                    )
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
    // return dynamodb.batchGetItem(parameters(date, ticker))
}

export async function batchPutItem(itemList, user) {
    const partitionArray = splitArray(itemList, 20)
    const newAddedPromises = partitionArray.map(async (partition) => {
        return dynamodb.batchWriteItem(
            batchPutParams(TABLENAME, partition, user)
        )
    })

    await Promise.all(newAddedPromises)
}

async function getTables() {
    const params = {
        ExclusiveStartTableName: 'STRING_VALUE',
        Limit: 10,
    }
    await dynamodb.listTables(params).promise()
}

function splitArray(list, capacity = 50) {
    const { length } = list
    console.group('Splitting the array')
    console.log('The length of the item list is ', length)
    console.log('capacity ', capacity)
    const sizeOfLastSubArray = length % capacity
    console.log('The number of sub arrays are ', Math.round(length / capacity))
    console.log(`The length of the last subArray is ${sizeOfLastSubArray}`)
    const partitionArray = []

    for (let k = 0; k < Math.round(length / capacity); k++) {
        const startIndex = k === 0 ? 0 : k * capacity + 1
        const endIndex = (k + 1) * capacity
        partitionArray.push(list.slice(startIndex, endIndex + 1))
    }

    // Add the remainder of the items
    if (sizeOfLastSubArray > 0) {
        const lastArray = list.slice(length - sizeOfLastSubArray)
        console.log('The length of the last array ', lastArray.length)
        partitionArray.push(lastArray)
    }

    console.log(
        'Accumulated number of elements in the arrays are ',
        sizeOfLastSubArray + Math.round(length / capacity) * capacity
    )
    console.groupEnd()
    return partitionArray
}

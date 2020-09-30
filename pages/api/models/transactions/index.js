/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import * as dynamodb from '../../services/dynamoDb'
import { getParams } from './get'
import { batchPutParams } from './put'
import { scanParams, scanAllParams } from './scan'
import {
    seperateTradesByCode,
    sortTransactionsByDate,
    averagePriceForEachTransaction,
} from './_utils'

import { splitArray } from '../__utils'

const TABLENAME = 'Transactions'

const Transactions = {
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
    try {
        const response = await dynamodb.scan(scanParams(TABLENAME, ticker))
        const result = []
        response.Items.forEach((v) => {
            let obj = {}
            for (const k1 in v) {
                for (const k2 in v[k1]) {
                    obj = { ...obj, [k1]: v[k1][k2] }
                }
            }
            result.push(obj)
        })
        return result
    } catch (err) {
        await dynamodb.create(Transactions)
        return scan(ticker)
    }
}

export async function scanAll() {
    const response = await dynamodb.scan(scanAllParams(TABLENAME))
    const result = []
    response.Items.forEach((v) => {
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
    const tradesMap = seperateTradesByCode(result)
    const newMap = {}
    tradesMap.forEach((value, key) => {
        const sortedList = sortTransactionsByDate(value)
        const listWithAvg = averagePriceForEachTransaction(sortedList)
        newMap[key] = listWithAvg
    })
    return newMap
}

export function put() {
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

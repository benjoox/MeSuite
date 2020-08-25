/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import * as dynamodb from '../../services/dynamoDb'
import { getParams } from './get'
import { scanParams } from './scan'

function convertToJSON(items) {
    const result = []
    items.forEach((v) => {
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

const TABLENAME = 'prices'

// eslint-disable-next-line no-unused-vars
const Prices = {
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
}

export function get(date, ticker) {
    return dynamodb.getItem(getParams(TABLENAME, date, ticker))
}

export function put({ date, ticker }) {
    return dynamodb.putInBatch({ date, ticker }, TABLENAME)
}

export async function scan(ticker) {
    const response = await dynamodb.scan(scanParams(TABLENAME, ticker))
    return convertToJSON(response.Items)
}

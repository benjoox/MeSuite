// @flow

import * as dynamodb from '../../services/dynamoDb'
import { accountPostParams, batchPutParams } from './post'
import { accountDeleteParams, batchDeleteParams } from './delete'
import { accountPutParams } from './put'
import { accountList } from './__utils'
import { splitArray } from '../__utils'
import { IAccount, IUser } from './types'

const TABLENAME = 'Accounts'

const Accounts = {
    AttributeDefinitions: [
        {
            AttributeName: 'user_account_date_amount',
            AttributeType: 'S',
        },
        {
            AttributeName: 'account',
            AttributeType: 'S',
        },
    ],
    KeySchema: [
        {
            AttributeName: 'user_account_date_amount',
            KeyType: 'HASH',
        },
        {
            AttributeName: 'account',
            KeyType: 'RANGE',
        },
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5,
    },
    TableName: TABLENAME,
}

export async function getAccounts() {
    try {
        const response = await dynamodb.scan({
            TableName: TABLENAME,
        })
        return accountList(response.Items)
    } catch (err) {
        if (err.code === 'ResourceNotFoundException') {
            // create a new db
            await dynamodb.create(Accounts)

            const response = await dynamodb.scan({
                TableName: TABLENAME,
            })
            return accountList(response.Items)
        }
        throw err
    }
}

export function createAccountTransaction(params: IAccount[], user: IUser) {
    if (params.length === 1) {
        return dynamodb.putItem(accountPostParams(params[0], user))
    }
    if (params.length > 1) {
        const partitionArray = splitArray(params, 20)
        const newAddedPromises = partitionArray.map(async (partition) => {
            return dynamodb.batchWriteItem(batchPutParams(partition, user))
        })

        return Promise.all(newAddedPromises)
    }
    throw Error('Params passed to create a user cannot be empty')
}

export function deleteAccountTransaction(params: IAccount[]) {
    return dynamodb.deleteItem(accountDeleteParams(params))
}

export async function updateAccountTransaction(params: IAccount[]) {
    return dynamodb.putItem(accountPutParams(params))
}

export async function deleteAccount(name: string) {
    const transactionList = await getAccounts()

    return Promise.all(
        splitArray(transactionList[name], 20).map(async (partition) => {
            return dynamodb.batchWriteItem(batchDeleteParams(partition))
        })
    )
}

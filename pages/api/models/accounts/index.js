import * as dynamodb from '../../services/dynamoDb'
import { accountPostParams, batchPutParams } from './post'
import { accountDeleteParams } from './delete'
import { accountPutParams } from './put'
import { accountsMap } from './__utils'

const TABLENAME = 'Accounts'

const Accounts = {
  AttributeDefinitions: [
    {
      AttributeName: "user_account_date_amount", 
      AttributeType: "S"
    },
    {
      AttributeName: "account", 
      AttributeType: "S"
    }
  ], 
  KeySchema: [
    {
      AttributeName: "user_account_date_amount", 
      KeyType: "HASH"
    },
    {
      AttributeName: "account", 
      KeyType: "RANGE"
    }
  ], 
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5
  }, 
  TableName: TABLENAME
}

export async function getAccounts() {
    const response = await dynamodb.scan({
        TableName: TABLENAME
    })  
    return accountsMap(response.Items)
}

export function createAccountTransaction(params, user) {
  if(params.length === 1 ) {
    return dynamodb.putItem(accountPostParams(params[0], user))
  } else if (params.length > 1) {
    return dynamodb.batchWriteItem(batchPutParams(params, user))
  }
}

export function deleteAccountTransaction(params) {
    return dynamodb.deleteItem(accountDeleteParams(params))
}

export async function updateAccountTransaction(params) {
  return dynamodb.putItem(accountPutParams(params))
}
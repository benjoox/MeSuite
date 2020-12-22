import AWS from 'aws-sdk'

const config = {
    apiVersion: '2012-08-10',
    accessKeyId: 'uclnoa',
    secretAccessKey: 'xvpj8',
    region: 'us-west-2',
    endpoint: 'http://localhost:8000',
}
const dynamodb = new AWS.DynamoDB(
    process.env.NODE_ENV === 'development' ? config : {}
)

export function batchGetItem(params) {
    return dynamodb.batchGetItem(params).promise()
}

export function getItem(params) {
    return dynamodb.getItem(params).promise()
}

export function batchWriteItem(params) {
    return dynamodb.batchWriteItem(params).promise()
}

export function create(params) {
    return dynamodb.createTable(params).promise()
}

export function scan(params) {
    return dynamodb.scan(params).promise()
}

export function listTables() {
    const params = {
        ExclusiveStartTableName: 'STRING_VALUE',
        Limit: 10,
    }
    return dynamodb.listTables(params).promise()
}

export function putItem(params) {
    return dynamodb.putItem(params).promise()
}

export function deleteItem(params) {
    return dynamodb.deleteItem(params).promise()
}

export function putInBatch() {
    // TODO: To be implmeneted
}

export function describeTable(params) {
    return dynamodb.describeTable(params).promise()
}

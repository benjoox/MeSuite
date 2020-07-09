

export const scanParams = (tableName, ticker) => ({
    ExpressionAttributeValues: {
        ":a": {
            S: ticker
        }
    }, 
    Select: 'ALL_ATTRIBUTES',
    FilterExpression: "ticker = :a", 
    ReturnConsumedCapacity: 'TOTAL',
    TableName: tableName
})
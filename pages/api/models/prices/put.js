const putItem = params => {
    const { 
        date, 
        ticker,
        volume=0,
        high=0,
        low=0,
        close=0
    } = params
    
    return {
        "date": { S: date },
        "ticker": { S: ticker },
        "volume": { N: volume },
        "high": { N: high },
        "low": { S: low },
        "close": { S: close }
    }
}

const putItemList = paramsList => paramsList.map(params => ({ 
    PutRequest: { Item: putItem(params) }
}))

export const putParams = params => ({
    Item: putItem(params),
    ReturnConsumedCapacity: "TOTAL",
    TableName: TABLENAME
})

export const batchPutParams = params => ({
    RequestItems: {
        [TABLENAME]: putItemList(params)
    }
})
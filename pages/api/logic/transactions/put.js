const putItem = params => {
    const { 
        date, 
        code,
        price=0,
        units=0,
        type='',
        fees=0,
        eodPrice=0,
        avgAustrandingPrice=0,
        oustandingNumber=0
    } = params
    
    return {
        "id": { S: `${date}${code}${price}`},
        "date": { S: date },
        "ticker": { S: code },
        "fees": { N: fees.toString() },
        "price": { N: price.toString() },
        "units": { N: units.toString() },
        "type": { S: type },
        "eodPrice": { N: eodPrice.toString() },
        "avgAustrandingPrice": { N: avgAustrandingPrice.toString() },
        "oustandingNumber": { N: oustandingNumber.toString() }
    }
}

const putItemList = paramsList => paramsList.map(params => ({ 
    PutRequest: { Item: putItem(params) }
}))

export const putParams = (TableName, params) => ({
    Item: putItem(params),
    ReturnConsumedCapacity: "TOTAL",
    TableName
})

export const batchPutParams = (TableName, params) => ({
    RequestItems: {
        [TableName]: putItemList(params)
    }
})
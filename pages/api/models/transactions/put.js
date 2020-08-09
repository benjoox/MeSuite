import { timestamp } from '../__utils'

const putItem = (params, user) => {
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
        "user_datetime_price": { S: `${user}_${timestamp(date)}_${price}`},
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

const putItemList = (paramsList, user) => paramsList.map(params => ({ 
    PutRequest: { Item: putItem(params, user) }
}))

export const putParams = (TableName, params, user) => ({
    Item: putItem(params, user),
    ReturnConsumedCapacity: "TOTAL",
    TableName
})

export const batchPutParams = (TableName, params, user) => ({
    RequestItems: {
        [TableName]: putItemList(params, user)
    }
})
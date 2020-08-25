const putItem = (params) => {
    const { date, ticker, volume = 0, high = 0, low = 0, close = 0 } = params

    return {
        date: { S: date },
        ticker: { S: ticker },
        volume: { N: volume },
        high: { N: high },
        low: { S: low },
        close: { S: close },
    }
}

const putItemList = (paramsList) =>
    paramsList.map((params) => ({
        PutRequest: { Item: putItem(params) },
    }))

export const putParams = (params, tableName) => ({
    Item: putItem(params),
    ReturnConsumedCapacity: 'TOTAL',
    TableName: tableName,
})

export const batchPutParams = (params, tableName) => ({
    RequestItems: {
        [tableName]: putItemList(params),
    },
})

/*

function partitionItemList(itemList) {
    const division = 200
    const partitionSize = Math.round(itemList.length / division)
    const partitionArray = []
    for (let k = 0; k < division; k += 1) {
        const startIndex = k * partitionSize + 1
        const endIndex = (k + 1) * partitionSize
        partitionArray.push(itemList.slice(startIndex, endIndex))
    }
    return partitionArray
}


async function putInBatch(tableName, itemList) {
    const partitionArray = partitionItemList(itemList)

    const params = {
        RequestItems: {
            [tableName]: null,
        },
    }

    const newAddedPromises = partitionArray.map(async (partition) => {
        params.RequestItems[tableName] = partition
        return await putInBatch(params, TABLENAME).promise()
    })

    await Promise.all(newAddedPromises)
}

*/

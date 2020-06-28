
const getItem = (date, ticker) => ({
    "date": { S: date },
    "ticker": { S: ticker }
})

const getItemList = paramsList => ({
    Keys: paramsList.map(({ date, ticker }) => ({
        Item: getItem(date, ticker) 
    }))
})

export const getParams = (tablename, date, ticker) => ({
    Key: getItem(date, ticker),
    TableName: tablename
})

export const getBatchParams = (tableName, paramsList) => ({
    RequestItems: {
        [tableName]: getItemList(paramsList)
    }
})
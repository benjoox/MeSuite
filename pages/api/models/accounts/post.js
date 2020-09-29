const TABLENAME = 'Accounts'
const accountItem = (params, user) => {
    const {
        timestamp,
        amount,
        account,
        description = '',
        category = '',
        datetimeDisplay,
        date,
    } = params

    return {
        user_account_date_amount: {
            S: `${user}_${account}_${timestamp}_${amount}`,
        },
        account: { S: account },
        description: { S: description },
        category: { S: category },
        datetimeDisplay: { S: datetimeDisplay },
        date: { S: date },
        timestamp: { N: timestamp.toString() },
    }
}

const putItemList = (paramsList, user) => {
    const map = new Map()
    const list = paramsList.map((params) => {
        const { account, timestamp, amount } = params
        if (!map.has(`${user}_${account}_${timestamp}_${amount}`)) {
            map.set(
                `${user}_${account}_${timestamp}_${amount}`,
                `${user}_${account}_${timestamp}_${amount}`
            )
            return { PutRequest: { Item: accountItem(params, user) } }
        }
        return ''
    })

    return list.filter((el) => el !== '')
}

export const accountPostParams = (params, user) => ({
    Item: accountItem(params, user),
    ReturnConsumedCapacity: 'TOTAL',
    TableName: TABLENAME,
})

export const batchPutParams = (params, user) => ({
    RequestItems: {
        [TABLENAME]: putItemList(params, user),
    },
})

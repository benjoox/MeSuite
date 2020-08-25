const TABLENAME = 'Accounts'
const accountItem = (params, user) => {
    const { date, amount, account, description = '', category = '' } = params

    return {
        user_account_date_amount: { S: `${user}_${account}_${date}_${amount}` },
        account: { S: account },
        description: { S: description },
        category: { S: category },
    }
}

const putItemList = (paramsList, user) => {
    const map = new Map()
    return paramsList.map((params) => {
        const { account, date, amount } = params
        if (!map.has(`${user}_${account}_${date}_${amount}`)) {
            map.set(
                `${user}_${account}_${date}_${amount}`,
                `${user}_${account}_${date}_${amount}`
            )
            return { PutRequest: { Item: accountItem(params, user) } }
        }
        return ''
    })
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

import accountItem from './accountItem'

const TABLENAME = 'Accounts'

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

const TABLENAME = 'Accounts'

const accountDeleteItem = (key) => ({
    Key: {
        user_account_date_amount: {
            S: key,
        },
        account: {
            S: key.split('_')[1], // The arrange key is included in the id
        },
    },
})

const accountDeleteParams = (key) => ({
    Key: accountDeleteItem(key),
    TableName: TABLENAME,
})

const deleteItemList = (list) =>
    list.map(({ id }) => ({
        DeleteRequest: accountDeleteItem(id),
    }))

const batchDeleteParams = (list) => ({
    RequestItems: {
        [TABLENAME]: deleteItemList(list),
    },
})

// eslint-disable-next-line import/prefer-default-export
export { accountDeleteParams, batchDeleteParams }

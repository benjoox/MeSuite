const TABLENAME = 'Accounts'

const accountItem = (params) => {
    const { id, account, description = '', category = '' } = params

    return {
        user_account_date_amount: { S: id },
        account: { S: account },
        description: { S: description },
        category: { S: category },
    }
}

const accountPutParams = (params) => ({
    Item: accountItem(params),
    ReturnConsumedCapacity: 'TOTAL',
    TableName: TABLENAME,
})

// eslint-disable-next-line import/prefer-default-export
export { accountPutParams }

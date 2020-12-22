import accountItem from './accountItem'

const TABLENAME = 'Accounts'

const accountPutParams = (params, username) => ({
    Item: accountItem(params, username),
    ReturnConsumedCapacity: 'TOTAL',
    TableName: TABLENAME,
})

// eslint-disable-next-line import/prefer-default-export
export { accountPutParams }

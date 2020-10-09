import accountItem from './accountItem'

const TABLENAME = 'Accounts'

const accountPutParams = (params) => ({
    Item: accountItem(params),
    ReturnConsumedCapacity: 'TOTAL',
    TableName: TABLENAME,
})

// eslint-disable-next-line import/prefer-default-export
export { accountPutParams }

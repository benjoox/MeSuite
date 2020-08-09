import { timestamp } from '../__utils'

const TABLENAME = 'Accounts'
const accountItem = (params, user) => {
    const { 
        date,
        amount, 
        account,
        description='',
        category=''
    } = params

    return {
        "user_account_date_amount": { S: `${user}_${account}_${timestamp(date)}_${amount}`},
        "account": { S: account },
        "description": { S: description },
        "category": { S: category }
    }
}

 

const putItemList = (paramsList, user) => paramsList.map(params => ({ 
    PutRequest: { Item: putItem(params, user) }
}))

export const accountPostParams = (params, user) => ({
    Item: accountItem(params, user),
    ReturnConsumedCapacity: "TOTAL",
    TableName: TABLENAME
})

export const batchPutParams = (TableName, params, user) => ({
    RequestItems: {
        [TableName]: putItemList(params, user)
    }
})
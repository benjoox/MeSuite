const TABLENAME = 'Accounts'

export const accountDeleteParams = id => ({ 
    Key: {
        user_account_date_amount: { 
            S: id
        },
        account: {
            S: id.split('_')[1] // The arrange key is included in the id
        }
    },
    TableName: TABLENAME
})
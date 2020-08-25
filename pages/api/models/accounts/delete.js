const TABLENAME = 'Accounts'

const accountDeleteParams = (id) => ({
    Key: {
        user_account_date_amount: {
            S: id,
        },
        account: {
            S: id.split('_')[1], // The arrange key is included in the id
        },
    },
    TableName: TABLENAME,
})

// eslint-disable-next-line import/prefer-default-export
export { accountDeleteParams }

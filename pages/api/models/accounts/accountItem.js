export default (params, user) => {
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

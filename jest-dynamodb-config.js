module.exports = {
    port: '8090',
    tables: [
        {
            TableName: `files`,
            KeySchema: [{ AttributeName: 'id', KeyType: 'HASH' }],
            AttributeDefinitions: [{ AttributeName: 'id', AttributeType: 'S' }],
            ProvisionedThroughput: {
                ReadCapacityUnits: 1,
                WriteCapacityUnits: 1,
            },
        },
        {
            TableName: `Accounts`,
            AttributeDefinitions: [
                {
                    AttributeName: 'user_account_date_amount',
                    AttributeType: 'S',
                },
                {
                    AttributeName: 'account',
                    AttributeType: 'S',
                },
            ],
            KeySchema: [
                {
                    AttributeName: 'user_account_date_amount',
                    KeyType: 'HASH',
                },
                {
                    AttributeName: 'account',
                    KeyType: 'RANGE',
                },
            ],
            ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5,
            },
        },
        // etc
    ],
}

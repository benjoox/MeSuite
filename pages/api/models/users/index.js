import * as db from '../../services/dynamoDb'

const TABLENAME = 'Users'
const Users = {
    TableName: TABLENAME,
    KeySchema: [
        { AttributeName: 'email', KeyType: 'HASH' }, // Partition key
        { AttributeName: 'createdAt', KeyType: 'RANGE' }, // Sort key
    ],
    AttributeDefinitions: [
        { AttributeName: 'email', AttributeType: 'S' },
        { AttributeName: 'createAt', AttributeType: 'N' },
    ],

    ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5,
    },
}

const userItem = (email) => ({
    Item: {
        email: {
            S: email,
        },
        createdAt: {
            N: `${Date.now()}`,
        },
    },
    TableName: TABLENAME,
    ReturnValues: 'ALL_OLD',
})

const create = async (email) => {
    try {
        const user = userItem(email)
        const table = await db.putItem(user)
        return table
    } catch (err) {
        if (err.code === 'ResourceNotFoundException') {
            // create a new db
            await db.create(Users)
            create(email)
        }
        throw err
    }
}

const put = () => {
    // TODO: to be implemented
}

export { create, put }

import * as db from '../../services/dynamoDb'

const TABLENAME = 'Users'
const Users = {
    TableName: TABLENAME,
    KeySchema: [
        { AttributeName: 'email', KeyType: 'HASH' }, // Partition key
    ],
    AttributeDefinitions: [{ AttributeName: 'email', AttributeType: 'S' }],

    ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5,
    },
}

const userItem = (arg) => ({
    Key: {
        email: {
            S: arg,
        },
    },
    TableName: 'Users',
})

const create = async (email) => {
    try {
        return await db.getItem(userItem(email))
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

import { putItem } from '../../services/dynamoDb'

const schema = {
    TableName : "User",
    KeySchema: [       
        { AttributeName: "email", KeyType: "HASH"},  //Partition key
        { AttributeName: "createdAt", KeyType: "RANGE" }  //Sort key
    ],
    AttributeDefinitions: [       
        { AttributeName: "email", AttributeType: "S" },
        { AttributeName: "createAt", AttributeType: "N" }
    ],
    ProvisionedThroughput: {       
        ReadCapacityUnits: 5, 
        WriteCapacityUnits: 5
    }
}

export const create = async email => {
    try {
        const user = userItem(email)
        const table = await putItem(user)
        console.log('putItem response is ', table)
        return table
    } catch(err) {
        console.log(err)
    } 
} 

const userItem = email => ({
    Item: {
        "email": {
            S: email
        }, 
        "createdAt": {
            N: `${Date.now()}`
        }
    },
    TableName: "User",
    ReturnValues: "ALL_OLD"
})
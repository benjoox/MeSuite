import AWS from 'aws-sdk'

const config = {
    convertEmptyValues: true,
    ...{
        endpoint: 'localhost:8090',
        sslEnabled: false,
        region: 'local-env',
    },
}

const ddb = new AWS.DynamoDB(config)
jest.setTimeout(30000)

describe('test dynamoDB ', () => {
    it('should insert item into table', async () => {
        await ddb
            .putItem({
                TableName: 'files',
                Item: {
                    id: { S: '23434' },
                },
            })
            .promise()
        const { Items } = await ddb.scan({ TableName: 'files' }).promise()

        expect(Items[0].id).toEqual({
            S: '23434',
        })
    })
})

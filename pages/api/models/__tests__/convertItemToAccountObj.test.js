import { convertItemToAccountObj } from '../accounts/__utils'

describe('convertItemToAccountObj', () => {
    test('returns an object with correct keys', () => {
        const testCase = {
            user_account_date_amount: {
                S: 'benyamin.abedian@gmail.com_nabPersonal_1576760400_850.74',
            },
            description: { S: '15 Wilson Street   BARRY PLANT NOBL' },
            category: { S: 'dandenong/rent' },
            account: { S: 'nabPersonal' },
        }
        const result = convertItemToAccountObj(testCase)
        expect(typeof result).toBe('object')
        expect(result).toHaveProperty('username')
        expect(result).toHaveProperty('date')
        expect(result).toHaveProperty('amount')
        expect(result).toHaveProperty('description')
        expect(result).toHaveProperty('category')
        expect(result).toHaveProperty('account')
    })

    test('returns the correct values for each key', () => {
        const testCase = {
            user_account_date_amount: {
                S: 'benyamin.abedian@gmail.com_nabPersonal_1576760400_850.74',
            },
            description: { S: '15 Wilson Street   BARRY PLANT NOBL' },
            category: { S: 'dandenong/rent' },
            account: { S: 'nabPersonal' },
        }
        const result = convertItemToAccountObj(testCase)

        expect(result.username).toEqual('benyamin.abedian@gmail.com')
        expect(result.date).toEqual('1576760400')
        expect(result.amount).toEqual('850.74')
        expect(result.description).toEqual(
            '15 Wilson Street   BARRY PLANT NOBL'
        )
        expect(result.account).toEqual('nabPersonal')
        expect(result.category).toEqual('dandenong/rent')
    })
})

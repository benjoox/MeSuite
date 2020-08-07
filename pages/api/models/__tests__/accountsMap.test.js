import { accountsMap } from '../accounts'

describe('accountsMap', () => {
    const testCase = [
        {
            user_account_date_amount: {
              S: 'benyamin.abedian@gmail.com_cbaPersonalSmart_1586210400_-0.56'
            },
            description: { S: 'International Transaction Fee Value Date: 03/04/2020' },
            category: { S: 'Fees & charges' },
            account: { S: 'cbaPersonalSmart' }
          },
          {
            user_account_date_amount: {
              S: 'benyamin.abedian@gmail.com_cbaPersonalSmart_1571835600_-7.7'
            },
            description: {
              S: 'KENNYS BAKERY CAFE MELBOURNE VI AUS Card xx3285 Value Date: 22/10/2019'
            },
            category: { S: 'work lunch' },
            account: { S: 'cbaPersonalSmart' }
          },
          {
            user_account_date_amount: {
              S: 'benyamin.abedian@gmail.com_cbaPersonalSmart_1585004400_-1000'
            },
            description: { S: 'Transfer to xx9706 NetBank ASX CBA' },
            category: { S: 'transfer' },
            account: { S: 'cbaPersonalSmart' }
          },
          {
            user_account_date_amount: { S: 'benyamin.abedian@gmail.com_nabPersonal_1565186400_-2492.51' },
            description: { S: 'LOAN REPAYMENT TO A/C 928544881 ABEDIAN' },
            category: { S: 'hoppers/mortgage' },
            account: { S: 'nabPersonal' }
          }
    ]
    
    test ('returns the correct number of individual accounts ', () => {
        
        const result = accountsMap(testCase)

        expect(typeof result).toBe('object')
        expect(result).toHaveProperty('nabPersonal')
        expect(result).toHaveProperty('cbaPersonalSmart')
    })

    test ('returns the correct number transactions for each account', () => {
        
        const result = accountsMap(testCase)

        expect(typeof result).toBe('object')
        expect(result['nabPersonal'].length).toBe(1)
        expect(result['cbaPersonalSmart'].length).toBe(3)
    })

})

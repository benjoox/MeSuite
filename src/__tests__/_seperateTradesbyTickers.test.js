import { seperateTradesByTickers, 
        validateTransactionData,
        cleanseTransactionData
    } from '../components/TradeContainer/_utils'

const trades = require('./sampleTrade.json')

describe('seperateTradesByTickers', () => {
    test ('seperate into correct number of unique assets', () => {
        const result = seperateTradesByTickers(trades)

        expect(typeof result).toBe('object')
        expect(result.size).toEqual(5)
        expect(result.has('SCG')).toEqual(true)
        expect(result.has('CBA')).toEqual(true)
        expect(result.has('ANZ')).toEqual(true)
        expect(result.has('NAB')).toEqual(true)

        expect(result.get('CBA').length).toEqual(13)
        expect(result.get('SCG').length).toEqual(13)
        expect(result.get('ANZ').length).toEqual(2)
        expect(result.get('NAB').length).toEqual(2)
    })

})


describe('validateTransactionData', () => {
    test ('returns true if all the required keys exist', () => {
        const sampleTrade = {
            "orderNumber": "N118841092",
            "date": "30/04/2020",
            "type": "S",
            "units": 100,
            "code": "CBA",
            "price": 62.5,
            "fees": 19.95,
            "net": "6,230.05"
          }
        const result = validateTransactionData(sampleTrade)
        expect(result).toBeTruthy()
    })

    test ('throws an error if the required keys are not available in the transaction', () => {
        const sampleTrade = {
            "orderNumber": "N118841092",
            "date": "30/04/2020",
            "type": "S",
            "price": 62.5,
            "fees": 19.95,
            "net": "6,230.05"
          }
        expect(() => validateTransactionData(sampleTrade))
            .toThrow('Validation failed. The key: "code" does not exists or has no value')
    })

    test ('throws an error if the any of the required keys has no value', () => {
        const sampleTrade = {
            "orderNumber": "N118841092",
            "date": "30/04/2020",
            "type": "S",
            "units": null,
            "code": 'CBA',
            "price": 62.5,
            "fees": 19.95,
            "net": "6,230.05"
        }

        expect(() => validateTransactionData(sampleTrade))
            .toThrow('Validation failed. The key: "units" does not exists or has no value')
    })

    test ('return true if the value for a required key is 0', () => {
        const sampleTrade = {
            "orderNumber": "N118841092",
            "date": "30/04/2020",
            "type": "S",
            "code": 'CBA',
            "units": 0,
            "price": 0,
            "fees": 19.95,
            "net": "6,230.05"
          }
        const result = validateTransactionData(sampleTrade)

        expect(result).toBeTruthy()
    })

})


describe('cleanseTransactionData', () => {
    test ('return the correct type fo each key in a tansaction', () => {
        const sampleTrade = {
            "orderNumber": "N118841092",
            "date": "30/04/2020",
            "type": "S",
            "units": 100,
            "code": "CBA",
            "price": "$62.5",
            "fees": 19.95,
            "net": "6,230.05"
          }
        const result = cleanseTransactionData(sampleTrade)
        expect(result.units).toBe(100)
        expect(result.price).toBe(62.5)
        expect(result.fees).toBe(19.95)
    })
    test ('to throw if units does not exist', () => {
        const sampleTrade = {
            "orderNumber": "N118841092",
            "date": "30/04/2020",
            "type": "S",
            "code": "CBA",
            "price": "$62.5",
            "fees": 19.95,
            "net": "6,230.05"
          }
          expect(() => cleanseTransactionData(sampleTrade))
          .toThrow()
    })
})
import {
    seperateTradesByTickers,
    calculateBuyAverages,
    calculateSellAverages,
    averagePriceForEachTransaction,
} from '../../pages/api/models/transactions/_utils'

import {
    validateTransactionData,
    cleanseTransactionData,
    buySummary,
    sellSummary,
} from '../MarketPage/forms/_utils'

const trades = require('./sampleTrade.json')

describe('seperateTradesByTickers', () => {
    test('seperate into correct number of unique assets', () => {
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
    test('returns true if all the required keys exist', () => {
        const sampleTrade = {
            orderNumber: 'N118841092',
            date: '30/04/2020',
            type: 'S',
            units: 100,
            code: 'CBA',
            price: 62.5,
            fees: 19.95,
            net: '6,230.05',
        }
        const result = validateTransactionData(sampleTrade)
        expect(result).toBeTruthy()
    })

    test('throws an error if the required keys are not available in the transaction', () => {
        const sampleTrade = {
            orderNumber: 'N118841092',
            date: '30/04/2020',
            type: 'S',
            price: 62.5,
            fees: 19.95,
            net: '6,230.05',
        }
        expect(() => validateTransactionData(sampleTrade)).toThrow(
            'Validation failed. The key: "code" does not exists or has no value'
        )
    })

    test('throws an error if the any of the required keys has no value', () => {
        const sampleTrade = {
            orderNumber: 'N118841092',
            date: '30/04/2020',
            type: 'S',
            units: null,
            code: 'CBA',
            price: 62.5,
            fees: 19.95,
            net: '6,230.05',
        }

        expect(() => validateTransactionData(sampleTrade)).toThrow(
            'Validation failed. The key: "units" does not exists or has no value'
        )
    })

    test('return true if the value for a required key is 0', () => {
        const sampleTrade = {
            orderNumber: 'N118841092',
            date: '30/04/2020',
            type: 'S',
            code: 'CBA',
            units: 0,
            price: 0,
            fees: 19.95,
            net: '6,230.05',
        }
        const result = validateTransactionData(sampleTrade)

        expect(result).toBeTruthy()
    })
})

describe('cleanseTransactionData', () => {
    test('return the correct type fo each key in a tansaction', () => {
        const sampleTrade = {
            orderNumber: 'N118841092',
            date: '30/04/2020',
            type: 'S',
            units: 100,
            code: 'CBA',
            price: '$62.5',
            fees: 19.95,
            net: '6,230.05',
        }
        const result = cleanseTransactionData(sampleTrade)
        expect(result.units).toBe(100)
        expect(result.price).toBe(62.5)
        expect(result.fees).toBe(19.95)
    })
    test('to throw if units does not exist', () => {
        const sampleTrade = {
            orderNumber: 'N118841092',
            date: '30/04/2020',
            type: 'S',
            code: 'CBA',
            price: '$62.5',
            fees: 19.95,
            net: '6,230.05',
        }
        expect(() => cleanseTransactionData(sampleTrade)).toThrow()
    })
})

describe('sumOfBuyCost', () => {
    const testTrades = [
        {
            orderNumber: 'N116986862',
            date: '22/04/2020',
            type: 'b',
            code: 'CBA',
            units: 100,
            price: 57,
            fees: 19.95,
            net: 5819.95,
        },
        {
            orderNumber: 'N116986862',
            date: '22/04/2020',
            type: 'b',
            code: 'CBA',
            units: 100,
            price: 58,
            fees: 19.95,
            net: 5819.95,
        },
        {
            orderNumber: 'N118841028',
            date: '22/04/2020',
            type: 'b',
            code: 'SCG',
            units: 1000,
            price: 2.04,
            fees: 19.95,
            net: 2059.95,
        },
        {
            orderNumber: 'N118841042',
            date: '21/04/2020',
            type: 'b',
            code: 'SCG',
            units: 1000,
            price: 2.08,
            fees: 19.95,
            net: 2099.95,
        },
        {
            orderNumber: 'N118841063',
            date: '21/04/2020',
            type: 'b',
            code: 'CBA',
            units: 50,
            price: 59.8,
            fees: 19.95,
            net: 3009.95,
        },
        {
            orderNumber: 'N118268941',
            date: '20/04/2020',
            type: 's',
            code: 'CBA',
            units: 50,
            price: 61.5,
            fees: 19.95,
            net: 3055.05,
        },
        {
            orderNumber: 'N118268964',
            date: '20/04/2020',
            type: 'b',
            code: 'CBA',
            units: 50,
            price: 60.5,
            fees: 19.95,
            net: 3044.95,
        },
        {
            orderNumber: 'N118623666',
            date: '17/04/2020',
            type: 's',
            code: 'SCG',
            units: 1000,
            price: 2.18,
            fees: 19.95,
            net: 2160.05,
        },
        {
            orderNumber: 'N118623695',
            date: '17/04/2020',
            type: 's',
            code: 'SCG',
            units: 1000,
            price: 2.27,
            fees: 19.95,
            net: 2250.05,
        },
        {
            orderNumber: 'N118382275',
            date: '16/04/2020',
            type: 'b',
            code: 'SCG',
            units: 1000,
            price: 1.97,
            fees: 19.95,
            net: 1989.95,
        },
        {
            orderNumber: 'N117731156',
            date: '16/04/2020',
            type: 'b',
            code: 'SCG',
            units: 1000,
            price: 2.03,
            fees: 19.95,
            net: 2049.95,
        },
        {
            orderNumber: 'N118382152',
            date: '16/04/2020',
            type: 'b',
            code: 'SCG',
            units: 1000,
            price: 2.04,
            fees: 19.95,
            net: 2059.95,
        },
    ]
    test('sum all the cost for the BUY trades', () => {
        expect(buySummary(testTrades).cost).toEqual(27675)
        expect(buySummary(testTrades).units).toEqual(5300)
        expect(buySummary(testTrades).fees).toEqual(179.55)
    })
    test('sum all the cost for the SELL trades', () => {
        expect(sellSummary(testTrades).cost).toEqual(7525)
        expect(sellSummary(testTrades).units).toEqual(2050)
        expect(sellSummary(testTrades).fees).toEqual(59.85)
    })
})

describe('calculateBuyAverages', () => {
    const testTrades = [
        {
            orderNumber: 'N116986862',
            date: '22/04/2020',
            type: 'b',
            code: 'CBA',
            units: 100,
            price: 57,
            fees: 19.95,
            net: 5819.95,
        },
        {
            orderNumber: 'N116986862',
            date: '22/04/2020',
            type: 'b',
            code: 'CBA',
            units: 100,
            price: 58,
            fees: 19.95,
            net: 5819.95,
        },
        {
            orderNumber: 'N118841063',
            date: '21/04/2020',
            type: 'b',
            code: 'CBA',
            units: 50,
            price: 59.8,
            fees: 19.95,
            net: 3009.95,
        },
        {
            orderNumber: 'N118268941',
            date: '20/04/2020',
            type: 's',
            code: 'CBA',
            units: 50,
            price: 61.5,
            fees: 19.95,
            net: 3055.05,
        },
        {
            orderNumber: 'N118268941',
            date: '20/04/2020',
            type: 'S',
            code: 'CBA',
            units: 50,
            price: 61.5,
            fees: 19.95,
            net: 3055.05,
        },
    ]
    test('with only one transaction', () => {
        const { average, outstandingUnits } = calculateBuyAverages(
            testTrades.slice(0, 1)
        )
        expect(average).toEqual(57)
        expect(outstandingUnits).toEqual(100)
    })
    test('return average and outstanding numbers', () => {
        const { average, outstandingUnits } = calculateBuyAverages(
            testTrades.slice(0, 2)
        )
        expect(average).toEqual(57.5)
        expect(outstandingUnits).toEqual(200)
    })
    test('calculateSellAverages', () => {
        const { average, outstandingUnits } = calculateSellAverages(
            testTrades.slice(0, 2),
            testTrades[2]
        )
        expect(average).toEqual(57.5)
        expect(outstandingUnits).toEqual(150)
    })
})

describe('averagePriceForEachTransaction', () => {
    const testTrades = [
        {
            orderNumber: 'N116986862',
            date: '22/04/2020',
            type: 'b',
            code: 'CBA',
            units: 100,
            price: 57,
            fees: 19.95,
            net: 5819.95,
        },
        {
            orderNumber: 'N116986862',
            date: '22/04/2020',
            type: 'b',
            code: 'CBA',
            units: 100,
            price: 58,
            fees: 19.95,
            net: 5819.95,
        },
        {
            orderNumber: 'N118841063',
            date: '21/04/2020',
            type: 'b',
            code: 'CBA',
            units: 50,
            price: 59.8,
            fees: 19.95,
            net: 3009.95,
        },
        {
            orderNumber: 'N118268941',
            date: '20/04/2020',
            type: 's',
            code: 'CBA',
            units: 50,
            price: 61.5,
            fees: 19.95,
            net: 3055.05,
        },
    ]
    test('buy/buy/buy/sell', () => {
        const result = averagePriceForEachTransaction(testTrades)
        expect(result.length).toEqual(4)

        expect(result[0].average).toEqual(57)
        expect(result[0].outstandingUnits).toEqual(100)
        expect(result[0].profitAndLossBeforeFees).toEqual(0)

        expect(result[1].average).toEqual(57.5)
        expect(result[1].outstandingUnits).toEqual(200)
        expect(result[1].profitAndLossBeforeFees).toEqual(0)

        expect(result[2].average).toEqual(57.96)
        expect(result[2].outstandingUnits).toEqual(250)
        expect(result[2].profitAndLossBeforeFees).toEqual(0)

        expect(result[3].average).toEqual(57.96)
        expect(result[3].outstandingUnits).toEqual(200)
        expect(result[3].profitAndLossBeforeFees).toEqual(177)
    })

    test('buy/buy/sell/buy', () => {
        const buyTestTrades = [
            {
                orderNumber: 'N116986862',
                date: '22/04/2020',
                type: 'b',
                code: 'CBA',
                units: 100,
                price: 57,
                fees: 19.95,
                net: 5819.95,
            },
            {
                orderNumber: 'N116986862',
                date: '22/04/2020',
                type: 'b',
                code: 'CBA',
                units: 100,
                price: 58,
                fees: 19.95,
                net: 5819.95,
            },
            {
                orderNumber: 'N118268941',
                date: '20/04/2020',
                type: 's',
                code: 'CBA',
                units: 50,
                price: 61.5,
                fees: 19.95,
                net: 3055.05,
            },
            {
                orderNumber: 'N118841063',
                date: '21/04/2020',
                type: 'b',
                code: 'CBA',
                units: 50,
                price: 59.8,
                fees: 19.95,
                net: 3009.95,
            },
        ]

        const result = averagePriceForEachTransaction(buyTestTrades)
        expect(result.length).toEqual(4)

        expect(result[0].average).toEqual(57)
        expect(result[0].outstandingUnits).toEqual(100)
        expect(result[0].profitAndLossBeforeFees).toEqual(0)

        expect(result[1].average).toEqual(57.5)
        expect(result[1].outstandingUnits).toEqual(200)
        expect(result[1].profitAndLossBeforeFees).toEqual(0)

        expect(result[2].average).toEqual(57.5)
        expect(result[2].outstandingUnits).toEqual(150)
        expect(result[2].profitAndLossBeforeFees).toEqual(200)

        expect(result[3].average).toEqual(58.08)
        expect(result[3].outstandingUnits).toEqual(200)
        expect(result[3].profitAndLossBeforeFees).toEqual(0)
    })
})

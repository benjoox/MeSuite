/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import {
    getSummaryForOneAsset,
    getAverageAndOutstandingNumber,
    addAveragePriceAfterEachSell,
} from '../../components/MarketPage/forms/_utils'
import { extractTags } from '../__utils'

describe('getSummaryForOneAsset', () => {
    const testData = [
        {
            orderNumber: 'N117731156',
            date: '16/04/2020',
            type: 'B',
            code: 'SCG',
            units: 1000,
            price: 2.03,
            fees: 19.95,
            net: 2049.95,
        },
        {
            orderNumber: 'N118382152',
            date: '16/04/2020',
            type: 'B',
            code: 'SCG',
            units: 1000,
            price: 2.04,
            fees: 19.95,
            net: 2059.95,
        },
        {
            orderNumber: 'N117542042',
            date: '14/04/2020',
            type: 'S',
            code: 'SCG',
            units: 50,
            price: 62.75,
            fees: 19.95,
            net: 3117.55,
        },
    ]
    test('summarise a list of trades', () => {
        const result = getSummaryForOneAsset(testData)

        expect(typeof result).toBe('object')
        expect(result.totalBuyCost).toEqual(4070)
        expect(result.totalNumberBuy).toEqual(2000)
        expect(result.totalBuyFees).toEqual(39.9)
        expect(result.totalSellCost).toEqual(3137.5)
        expect(result.totalSellFees).toEqual(19.95)
    })
})

describe('getSummaryForOneAsset', () => {
    const testData = [
        {
            orderNumber: 'N117731156',
            date: '16/04/2020',
            type: 'B',
            code: 'SCG',
            units: 1000,
            price: 2.03,
            fees: 19.95,
            net: 2049.95,
        },
        {
            orderNumber: 'N118382152',
            date: '16/04/2020',
            type: 'B',
            code: 'SCG',
            units: 1000,
            price: 2.04,
            fees: 19.95,
            net: 2059.95,
        },
    ]
    test('summarise a list of trades with only buy items', () => {
        const result = getSummaryForOneAsset(testData)

        expect(typeof result).toBe('object')
        expect(result.totalBuyCost).toEqual(4070)
        expect(result.totalNumberBuy).toEqual(2000)
        expect(result.totalBuyFees).toEqual(39.9)
        expect(result.totalSellCost).toEqual(0)
        expect(result.totalSellFees).toEqual(0)
    })
})

describe('getAverageAndOutstandingNumber', () => {
    const testData = [
        {
            orderNumber: 'N117731156',
            date: '16/04/2020',
            type: 'B',
            code: 'SCG',
            units: 1000,
            price: 2.03,
            fees: 19.95,
            net: 2049.95,
        },
        {
            orderNumber: 'N118382152',
            date: '16/04/2020',
            type: 'B',
            code: 'SCG',
            units: 1000,
            price: 2.04,
            fees: 19.95,
            net: 2059.95,
        },
        {
            orderNumber: 'N117542042',
            date: '14/04/2020',
            type: 'S',
            code: 'SCG',
            units: 50,
            price: 62.75,
            fees: 19.95,
            net: 3117.55,
        },
    ]
    test('summarise a list of trades', () => {
        getAverageAndOutstandingNumber(testData)
    })
})

describe('addAveragePriceAfterEachSell', () => {
    const testData = [
        {
            orderNumber: 'N118382152',
            date: '16/04/2020',
            type: 'S',
            code: 'SCG',
            units: 1000,
            price: 2.04,
            fees: 19.95,
            net: 2059.95,
        },
        {
            orderNumber: 'N117731156',
            date: '15/04/2020',
            type: 'B',
            code: 'SCG',
            units: 1000,
            price: 2.03,
            fees: 19.95,
            net: 2049.95,
        },
        {
            orderNumber: 'N117542042',
            date: '14/04/2020',
            type: 'B',
            code: 'SCG',
            units: 50,
            price: 2.75,
            fees: 19.95,
            net: 3117.55,
        },
    ]

    test('Add average price and number of outstanding securities for each sell item ', () => {
        const result = addAveragePriceAfterEachSell(testData)
        expect(result.length).toBe(3)
        expect(result[2]).toHaveProperty('averagePrice')
        expect(result[2]).toHaveProperty('outstandingNumberOfSecurity')
        expect(result[0]).toHaveProperty('averagePrice')
        expect(result[0]).toHaveProperty('outstandingNumberOfSecurity')
        expect(result[1]).toHaveProperty('averagePrice')
        expect(result[1]).toHaveProperty('outstandingNumberOfSecurity')
        expect(result[2]).toHaveProperty('profitAndLossBeforeFees')
    })
})

describe('getSummaryForOneAsset when prices and fees include $ sign', () => {
    const testData = [
        {
            orderNumber: 'N119682624',
            date: '04/05/2020',
            type: 'B',
            code: 'CBA',
            units: '50',
            price: '$58.63',
            fees: '$19.95',
            net: '$2,951.45',
        },
        {
            orderNumber: 'N119606304',
            date: '01/05/2020',
            type: 'B',
            code: 'CBA',
            units: '50',
            price: '$58.84',
            fees: '$19.95',
            net: '$2,961.95',
        },
        {
            orderNumber: 'N118472102',
            date: '30/04/2020',
            type: 'S',
            code: 'CBA',
            units: '100',
            price: '$62.50',
            fees: '$19.95',
            net: '$6,230.05',
        },
        {
            orderNumber: 'N119319154',
            date: '29/04/2020',
            type: 'S',
            code: 'CBA',
            units: '100',
            price: '$61.07',
            fees: '$19.95',
            net: '$6,087.05',
        },
        {
            orderNumber: 'N117922943',
            date: '07/04/2020',
            type: 'B',
            code: 'CBA',
            units: '200',
            price: '$61.60',
            fees: '$29.95',
            net: '$12,349.95',
        },
    ]
    test('summarise a list of trades with only buy items', () => {
        const result = getSummaryForOneAsset(testData)

        expect(typeof result).toBe('object')

        expect(result.totalBuyCost).toBe(18193.5)
        expect(result.totalNumberBuy).toBe(300)
        expect(result.totalBuyFees).toBe(69.85)
        expect(result.totalSellCost).toBe(12357)
        expect(result.totalSellFees).toBe(39.9)
    })
})

describe('addAveragePriceAfterEachSell when prices and fees include $ sign', () => {
    const testData = [
        {
            orderNumber: 'N119682624',
            date: '04/05/2020',
            type: 'B',
            code: 'CBA',
            units: '50',
            price: '$58.63',
            fees: '$19.95',
            net: '$2,951.45',
        },
        {
            orderNumber: 'N119606304',
            date: '01/05/2020',
            type: 'B',
            code: 'CBA',
            units: '50',
            price: '$58.84',
            fees: '$19.95',
            net: '$2,961.95',
        },
        {
            orderNumber: 'N118472102',
            date: '30/04/2020',
            type: 'S',
            code: 'CBA',
            units: '100',
            price: '$62.50',
            fees: '$19.95',
            net: '$6,230.05',
        },
        {
            orderNumber: 'N119319154',
            date: '29/04/2020',
            type: 'S',
            code: 'CBA',
            units: '100',
            price: '$61.07',
            fees: '$19.95',
            net: '$6,087.05',
        },
        {
            orderNumber: 'N117922943',
            date: '07/04/2020',
            type: 'B',
            code: 'CBA',
            units: '200',
            price: '$61.60',
            fees: '$29.95',
            net: '$12,349.95',
        },
    ]
    test('summarise a list of trades with only buy items', () => {
        const result = addAveragePriceAfterEachSell(testData)

        expect(typeof result).toBe('object')

        expect(result[0]).toHaveProperty('averagePrice')
        expect(result[0].averagePrice).toBe(61.6)

        expect(result[0]).toHaveProperty('outstandingNumberOfSecurity')
        expect(result[0].outstandingNumberOfSecurity).toBe(200)

        expect(result[1]).toHaveProperty('averagePrice')
        expect(result[1].averagePrice).toBe(61.6)

        expect(result[2]).toHaveProperty('averagePrice')
        expect(result[2].averagePrice).toBe(62.5)

        expect(result[2]).toHaveProperty('outstandingNumberOfSecurity')
        expect(result[2].outstandingNumberOfSecurity).toBe(0)

        expect(result[2]).toHaveProperty('profitAndLossBeforeFees')
    })
})

describe('extractTags', () => {
    it('should return a list of tags and a map of tagsMeta', () => {
        expect.assertions(4)
        const transcations = [
            {
                date: '1589875500',
                username: 'test@gmail.com',
                amount: '803.24',
                id: 'test@gmail.com_accountName_1589875500_803.24',
                description: '',
                category: 'tag 1',
            },
            {
                date: '1594973220',
                username: 'test@gmail.com',
                amount: '1015.74',
                id: 'test@gmail.com_accountName_1594973220_1015.74',
                description: '',
                category: 'tag 1',
            },
            {
                date: '1580893320',
                username: 'test@gmail.com',
                amount: '2000',
                id: 'test@gmail.com_accountName_1580893320_2000',
                description: '',
                category: 'tag 1',
            },
            {
                date: '1567411740',
                username: 'test@gmail.com',
                amount: '-605',
                id: 'test@gmail.com_accountName_1567411740_-605',
                description: '',
                category: 'tag 2',
            },
            {
                date: '1585728240',
                username: 'test@gmail.com',
                amount: '1606.48',
                id: 'test@gmail.com_accountName_1585728240_1606.48',
                description: '',
                category: 'tag 2',
            },
            {
                date: '1576055520',
                username: 'test@gmail.com',
                amount: '-2724.54',
                id: 'test@gmail.com_accountName_1576055520_-2724.54',
                description: '',
                category: 'tag 2',
            },
            {
                date: '1572858660',
                username: 'test@gmail.com',
                amount: '-183.5',
                id: 'test@gmail.com_accountName_1572858660_-183.5',
                description: '',
                category: 'tag 3',
            },
            {
                date: '1575018660',
                username: 'test@gmail.com',
                amount: '1587.6',
                id: 'test@gmail.com_accountName_1575018660_1587.6',
                description: '',
                category: 'tag 3',
            },
            {
                date: '1574673060',
                username: 'test@gmail.com',
                amount: '-146.96',
                id: 'test@gmail.com_accountName_1574673060_-146.96',
                description: '',
                category: 'tag 4',
            },
        ]
        const { taglist, tagsMeta } = extractTags(transcations)

        const expectedTaglist = ['tag 1', 'tag 2', 'tag 3', 'tag 4']
        expect(taglist).toEqual(expect.arrayContaining(expectedTaglist))
        expect(tagsMeta instanceof Map).toBe(true)
        expect(tagsMeta.has('tag 1')).toBe(true)
        expect(tagsMeta.get('tag 1').count).toBe(3)
    })
})

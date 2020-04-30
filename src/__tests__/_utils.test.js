import { seperateTradesBySecurity, 
    getSummaryForOneAsset,
    getAverageAndOutstandingNumber,
    addAveragePriceAfterEachSell 
} from '../components/TradeContainer/_utils'

const trades = require('./sampleTrade.json')


describe('seperateTradesBySecurity', () => {
    test ('seperate into correct number of unique assets', () => {
        const result = seperateTradesBySecurity(trades)

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


describe('getSummaryForOneAsset', () => {
    const testData = [  {
        "orderNumber": "N117731156",
        "date": "16/04/2020",
        "type": "B",
        "code": "SCG",
        "units": 1000,
        "price": 2.03,
        "fees": 19.95,
        "net": 2049.95
      },
      {
        "orderNumber": "N118382152",
        "date": "16/04/2020",
        "type": "B",
        "code": "SCG",
        "units": 1000,
        "price": 2.04,
        "fees": 19.95,
        "net": 2059.95
      },
      {
        "orderNumber": "N117542042",
        "date": "14/04/2020",
        "type": "S",
        "code": "SCG",
        "units": 50,
        "price": 62.75,
        "fees": 19.95,
        "net": 3117.55
      }
    ]
    test ('summarise a list of trades', () => {
        const result = getSummaryForOneAsset(testData)

        expect(typeof result).toBe('object')
        expect(result['totalBuyCost']).toEqual(4070)
        expect(result['totalNumberBuy']).toEqual(2000)
        expect(result['totalBuyFees']).toEqual(39.9)
        expect(result['totalSellCost']).toEqual(3137.5)
        expect(result['totalSellFees']).toEqual(19.95)
    })

})


describe('getAverageAndOutstandingNumber', () => {
    const testData = [  {
        "orderNumber": "N117731156",
        "date": "16/04/2020",
        "type": "B",
        "code": "SCG",
        "units": 1000,
        "price": 2.03,
        "fees": 19.95,
        "net": 2049.95
      },
      {
        "orderNumber": "N118382152",
        "date": "16/04/2020",
        "type": "B",
        "code": "SCG",
        "units": 1000,
        "price": 2.04,
        "fees": 19.95,
        "net": 2059.95
      },
      {
        "orderNumber": "N117542042",
        "date": "14/04/2020",
        "type": "S",
        "code": "SCG",
        "units": 50,
        "price": 62.75,
        "fees": 19.95,
        "net": 3117.55
      }
    ]
    test ('summarise a list of trades', () => {
        const result = getAverageAndOutstandingNumber(testData)

       
    })

})


describe('addAveragePriceAfterEachSell', () => {
  const testData = [{
      "orderNumber": "N118382152",
      "date": "16/04/2020",
      "type": "S",
      "code": "SCG",
      "units": 1000,
      "price": 2.04,
      "fees": 19.95,
      "net": 2059.95
    },{
      "orderNumber": "N117731156",
      "date": "15/04/2020",
      "type": "B",
      "code": "SCG",
      "units": 1000,
      "price": 2.03,
      "fees": 19.95,
      "net": 2049.95
    },
    {
      "orderNumber": "N117542042",
      "date": "14/04/2020",
      "type": "B",
      "code": "SCG",
      "units": 50,
      "price": 2.75,
      "fees": 19.95,
      "net": 3117.55
    }
  ]

  test ('Add average price and number of outstanding securities for each sell item ', () => {
      const result = addAveragePriceAfterEachSell(testData)
      expect(result.length).toBe(3)
      expect(result[2]).toHaveProperty('averagePrice')
      expect(result[2]).toHaveProperty('outstandingNumberOfSecurity')
      expect(result[0]).toHaveProperty('averagePrice')
      expect(result[0]).toHaveProperty('outstandingNumberOfSecurity')
      expect(result[1]).toHaveProperty('averagePrice')
      expect(result[1]).toHaveProperty('outstandingNumberOfSecurity')
      expect(result[2]).toHaveProperty('profitAndLoss')

  })

})
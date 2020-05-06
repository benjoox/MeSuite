import { seperateTradesBySecurity, 
    getSummaryForOneAsset,
    getAverageAndOutstandingNumber,
    addAveragePriceAfterEachSell 
} from '../components/TradeContainer/_utils'

const trades = require('./sampleTrade.json')



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
    }
  ]
  test ('summarise a list of trades with only buy items', () => {
      const result = getSummaryForOneAsset(testData)

      expect(typeof result).toBe('object')
      expect(result['totalBuyCost']).toEqual(4070)
      expect(result['totalNumberBuy']).toEqual(2000)
      expect(result['totalBuyFees']).toEqual(39.9)
      expect(result['totalSellCost']).toEqual(0)
      expect(result['totalSellFees']).toEqual(0)
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


describe('getSummaryForOneAsset when prices and fees include $ sign', () => {
  const testData = [
    {
      "orderNumber": "N119682624",
      "date": "04/05/2020",
      "type": "B",
      "code": "CBA",
      "units": "50",
      "price": "$58.63",
      "fees": "$19.95",
      "net": "$2,951.45"
    },
    {
      "orderNumber": "N119606304",
      "date": "01/05/2020",
      "type": "B",
      "code": "CBA",
      "units": "50",
      "price": "$58.84",
      "fees": "$19.95",
      "net": "$2,961.95"
    },
    {
      "orderNumber": "N118472102",
      "date": "30/04/2020",
      "type": "S",
      "code": "CBA",
      "units": "100",
      "price": "$62.50",
      "fees": "$19.95",
      "net": "$6,230.05"
    },
    {
      "orderNumber": "N119319154",
      "date": "29/04/2020",
      "type": "S",
      "code": "CBA",
      "units": "100",
      "price": "$61.07",
      "fees": "$19.95",
      "net": "$6,087.05"
    },
    {
      "orderNumber": "N117922943",
      "date": "07/04/2020",
      "type": "B",
      "code": "CBA",
      "units": "200",
      "price": "$61.60",
      "fees": "$29.95",
      "net": "$12,349.95"
    }
  ]
  test ('summarise a list of trades with only buy items', () => {
      const result = getSummaryForOneAsset(testData)

      expect(typeof result).toBe('object')
      //console.log(result)
      expect(result['totalBuyCost']).anything()
      expect(result['totalNumberBuy']).anything()
      expect(result['totalBuyFees']).anything()
      expect(result['totalSellCost']).anything()
      expect(result['totalSellFees']).anything()
  })

})

describe('addAveragePriceAfterEachSell when prices and fees include $ sign', () => {
  const testData = [
    {
      "orderNumber": "N119682624",
      "date": "04/05/2020",
      "type": "B",
      "code": "CBA",
      "units": "50",
      "price": "$58.63",
      "fees": "$19.95",
      "net": "$2,951.45"
    },
    {
      "orderNumber": "N119606304",
      "date": "01/05/2020",
      "type": "B",
      "code": "CBA",
      "units": "50",
      "price": "$58.84",
      "fees": "$19.95",
      "net": "$2,961.95"
    },
    {
      "orderNumber": "N118472102",
      "date": "30/04/2020",
      "type": "S",
      "code": "CBA",
      "units": "100",
      "price": "$62.50",
      "fees": "$19.95",
      "net": "$6,230.05"
    },
    {
      "orderNumber": "N119319154",
      "date": "29/04/2020",
      "type": "S",
      "code": "CBA",
      "units": "100",
      "price": "$61.07",
      "fees": "$19.95",
      "net": "$6,087.05"
    },
    {
      "orderNumber": "N117922943",
      "date": "07/04/2020",
      "type": "B",
      "code": "CBA",
      "units": "200",
      "price": "$61.60",
      "fees": "$29.95",
      "net": "$12,349.95"
    }
  ]
  test ('summarise a list of trades with only buy items', () => {
      const result = addAveragePriceAfterEachSell(testData)

      expect(typeof result).toBe('object')
      //console.log(result)
      expect(result[2]).toHaveProperty('averagePrice')
      expect(result[2]['averagePrice']).anything()

      expect(result[2]).toHaveProperty('outstandingNumberOfSecurity')
      expect(result[2]['outstandingNumberOfSecurity']).anything()

      expect(result[0]).toHaveProperty('averagePrice')
      expect(result[0]['averagePrice']).anything()


      expect(result[0]).toHaveProperty('outstandingNumberOfSecurity')
      expect(result[0]['outstandingNumberOfSecurity']).anything()

    
      expect(result[1]).toHaveProperty('averagePrice')
      expect(result[1]['averagePrice']).anything()

      expect(result[2]).toHaveProperty('profitAndLoss')
      expect(result[2]).toHaveProperty('profitAndLoss')
      
  })

})

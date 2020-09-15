import React from 'react'

const SecurityContext = React.createContext({
    listWithAvg: [],
    totalFees: 0,
    totalPandLBeforeFees: 0,
    trades: {},
    buy: {},
    sell: {},
    code: '',
})

export default SecurityContext

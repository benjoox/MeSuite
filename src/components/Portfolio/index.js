import React, { createContext, useState, useEffect } from 'react'
import { buySummary, sellSummary } from '../Transaction/_utils'
import { Table } from '../UIElements'
import { Row, Col, Container } from 'react-bootstrap'

const ProtfolioContext = createContext('portfolio') 
const FEES = 19.95

export default function Portfolio(props) {
    if(!props.tradesMap) return ''
    const [outstandingSecurities, setOutstandingSecurties] = useState([])

    
    const updatePrice = ev => {
        ev.preventDefault()
        const tempList = outstandingSecurities.map(ticker => {
            if(ticker.code === ev.target.id) {
                return {...ticker, price: ev.target.value}
            }
            return ticker
        })

        setOutstandingSecurties(tempList)
    }
    const summaryList = () => {
        let result = []
        props.tradesMap.forEach((value, key) => {
            const buy = buySummary(value)
            const sell = sellSummary(value)
            result.push({ 
                code: key.toUpperCase(), 
                buy: buy.cost + buy.fees,
                sell: sell.cost - sell.fees,
                outstandingUnits: (buy.units - sell.units),
                cost: (sell.cost - buy.cost - buy.fees - sell.fees).toFixed(3)
            })
        })  
        return result
    }

    const summary = summaryList()
    useEffect(() => {
        setOutstandingSecurties(summary.filter(ticker => ticker.outstandingUnits > 0))
    }, [props])


    const consolidate = () => summary.reduce((acc, ticker) =>({
            totalBuy: acc.totalBuy ? acc.totalBuy + ticker.buy : ticker.buy,
            totalSell: acc.totalSell ? acc.totalSell + ticker.sell : ticker.sell
        }
    ), { totalBuy: 0, totalSell: 0 })

    const consolidated = consolidate()
    
    const consolidateOutstandings = () => outstandingSecurities.reduce((acc, ticker) => {
        const price = ticker.price ? parseFloat(ticker.price) : 0
        return acc 
            ? acc + price * ticker.outstandingUnits - FEES
            : price * ticker.outstandingUnits - FEES
    }, 0 )
    
    //const outstandingList = summary.filter(ticker => ticker.outstandingUnits > 0)

    //setOutstandingSecurties(outstandingList)
    const value  = consolidateOutstandings()
    return  <div>
                <h2>Portfolio</h2>
                <Container style={ContainerStyle}>
                    <Row>
                        <Col> <b>Total buy:</b> {consolidated.totalBuy}</Col>
                        <Col> <b>Total sell:</b> {(consolidated.totalSell + value).toFixed(2)}</Col>
                    </Row>
                    <Row>
                        <Col> <b>Value of outstanding securities:</b> {value.toFixed(2)} </Col>
                        <Col> <b>Net:</b> {(consolidated.totalSell + value - consolidated.totalBuy).toFixed(2)}</Col>
                    </Row>
                </Container>
                <Container style={ContainerStyle}>
                    {
                        outstandingSecurities.map(ticker => <Row>
                            <Col><b>Ticker: </b>{ticker.code}</Col>
                            <Col><b>Number of securities: </b>{ticker.outstandingUnits}</Col>
                            <Col>
                                <b>Price: </b>
                                <input 
                                    onChange={updatePrice} 
                                    id={ticker.code}
                                    type='number' 
                                    value={ticker.price}  
                                />
                            </Col>
                        </Row>)
                    }
                </Container>
                <Table list={summaryList()} column={column} />
            </div>
}

const column = [
    {
        Header: 'Code',
        accessor: 'code',
    },
    {
        Header: 'Buy',
        accessor: 'buy'
    },
    {
        Header: 'Sell',
        accessor: 'sell'
    },
    {
        Header: 'Available # of assets',
        accessor: 'outstandingUnits'
    },
    {
        Header: 'Total cost (inc. fees)',
        accessor: 'cost'
    }
]   

const ContainerStyle = {
    margin: '20px 0',
    padding: '20px',
    borderTop: 'solid 1px lightgrey' 
}
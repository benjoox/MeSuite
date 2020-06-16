import React, { createContext, useState, useEffect, useRef } from 'react'
import { buySummary, sellSummary } from '../Transaction/_utils'
import { Table } from '../UIElements'
import { Row, Col, Container, Tooltip, Overlay } from 'react-bootstrap'

const ProtfolioContext = createContext('portfolio') 
const FEES = 19.95

export default function Portfolio(props) {
    if(!props.tradesMap) return ''
    const [show, setShow] = useState([0,0,0]);

    const toggleTooltip = id => setShow(
        show.map((el, index) => index !== id ? false : !el)
    )
    const target_1 = useRef(null)
    const target_2 = useRef(null)
    const target_3 = useRef(null)

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
                        <Col> 
                            <b>Total buy:</b> 
                            {consolidated.totalBuy}
                        </Col>
                        <Col> 
                            <b  ref={target_1} 
                                onClick={() => toggleTooltip(0)}
                                style={pointer}
                            >Total sell:</b> 

                            <Overlay target={target_1.current} show={show[0]} placement='top'>
                                {(props) => (
                                    <Tooltip id='overlay' {...props}>
                                        totalSell + value of outstanding shares
                                    </Tooltip>
                                )}
                            </Overlay>
                        
                            {(consolidated.totalSell + value).toFixed(2)}</Col>
                    </Row>
                    <Row>
                        <Col> 
                            <b  ref={target_2} 
                                onClick={() => toggleTooltip(1)}
                                style={pointer}
                            >Value of outstanding securities:</b> 
                            <Overlay target={target_2.current} show={show[1]} placement='top'>
                                {(props) => (
                                    <Tooltip id='overlay' {...props}>
                                        price * outstandingUnits - fees
                                    </Tooltip>
                                )}
                            </Overlay>
                            
                            {value.toFixed(2)} 
                        </Col>
                        <Col> 
                            <b 
                                style={pointer}
                                ref={target_3} 
                                onClick={() => toggleTooltip(2)}
                            >Net:</b> 
                            <Overlay target={target_3.current} show={show[2]} placement='top'>
                                {(props) => (
                                    <Tooltip id='overlay' {...props}>
                                        totalSell + of outstanding securities - totalBuy
                                    </Tooltip>
                                )}
                            </Overlay>
                            {(consolidated.totalSell + value - consolidated.totalBuy).toFixed(2)}
                            
                            </Col>
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

const pointer = {
    cursor: 'pointer'
}
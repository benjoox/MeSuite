import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { getSummaryForOneAsset, addAveragePriceAfterEachSell } from './_utils'
import TradeTable from './TradeTable'

export default function SecurityTab(props) {
    const [sharePrice, setPrice] = useState(0)
    const [cells, setCells] = useState([])
    const [realisedGains, setRealisedGains] = useState()


    useEffect(() => {
        const cells = addAveragePriceAfterEachSell(props.tradeList)
        setCells(cells)
        const totalPandL = cells.reduce((acc, trade) => {
            if(!trade.profitAndLoss) return acc
            return acc + (trade.profitAndLoss ? trade.profitAndLoss : 0)
        }, 0)
        setRealisedGains(totalPandL ? totalPandL.toFixed(2) : totalPandL)
    }
    , [props])
    const { 
        totalBuyCost, 
        totalNumberBuy, 
        totalSellCost, 
        totalNumberSell, 
        totalBuyFees, 
        totalSellFees
    } = getSummaryForOneAsset(props.tradeList)

    function profilAndLoss() {
        const calc = (totalSellCost - totalBuyCost - totalBuyFees - totalSellFees) + (totalNumberBuy - totalNumberSell) * sharePrice
        return calc.toFixed(2)
    }
    
    
    
    return (
        <>
            <Row className="justify-content-around">
                <Col md={3}>
                    <div>
                        <label style={{ fontWeight: 'bold' }} dangerouslySetInnerHTML={{__html : 'Total buy cost: &nbsp'}} />
                        <span>{totalBuyCost.toFixed(2)}</span>
                    </div>
                    <div>
                        <label style={{ fontWeight: 'bold' }} dangerouslySetInnerHTML={{__html : 'Total number bought: &nbsp'}} />
                        <span>{totalNumberBuy}</span>
                    </div>
                    <div>
                        <label style={{ fontWeight: 'bold' }} dangerouslySetInnerHTML={{__html : 'Total buy fees: &nbsp'}} />
                        <span>{totalBuyFees.toFixed(2)}</span>
                    </div>
                    <div>
                        <label style={{ fontWeight: 'bold' }} dangerouslySetInnerHTML={{__html : 'Average buy price: &nbsp'}} />
                        <span>{(totalBuyCost / totalNumberBuy).toFixed(2)}</span>
                    </div>
                </Col>
                <Col md={3}>
                    <div>
                        <label style={{ fontWeight: 'bold' }} dangerouslySetInnerHTML={{__html : 'Total sell cost: &nbsp'}} />
                        <span>{totalSellCost.toFixed(2)}</span>
                    </div>
                    <div>
                        <label style={{ fontWeight: 'bold' }} dangerouslySetInnerHTML={{__html : 'Total number sold: &nbsp'}} />
                        <span>{totalNumberSell}</span>
                    </div>
                    <div>   
                        <label style={{ fontWeight: 'bold' }} dangerouslySetInnerHTML={{__html : 'Total sell fees: &nbsp'}} />
                        <span>{totalSellFees.toFixed(2)}</span>
                    </div>
                    <div>
                        <label style={{ fontWeight: 'bold' }} dangerouslySetInnerHTML={{__html : 'Average sell price: &nbsp'}} />
                        <span>{(totalSellCost / totalNumberSell).toFixed(2)}</span>
                    </div>
                </Col>
                <Col md={5}>
                    <div>
                        <label style={{ fontWeight: 'bold' }} dangerouslySetInnerHTML={{__html : 'Number of outstanding shares: &nbsp'}} />
                        <span>{totalNumberBuy - totalNumberSell}</span>
                    </div>
                    <div style={{ display: 'flex'}}>
                        <label style={{ fontWeight: 'bold' }} dangerouslySetInnerHTML={{__html : `Enter a price for ${props.code} : &nbsp`}} />
                        <input type='number' onChange={ev => setPrice(ev.target.value)} value={sharePrice}/>
                    </div>
                    <div style={{ display: 'flex'}}>
                        <label style={{ fontWeight: 'bold' }} dangerouslySetInnerHTML={{__html : `Value of outstanding shares : &nbsp`}} />
                        <span>{sharePrice * (totalNumberBuy - totalNumberSell)}</span>
                    </div>
                </Col>
            </Row>
            <Row 
                className="justify-content-around" 
                style={{ 
                    margin: '15px 0', 
                    padding:'15px 0',
                    border: 'solid #27a745 3px',
                    borderRadius: '5px'
                }}
            >
                <Col>
                    <div>
                        <label style={{ fontWeight: 'bold', margin: '0px' }} dangerouslySetInnerHTML={{__html : 'Profit/Loss: &nbsp'}} />
                        <span>{profilAndLoss()}</span>
                        <div style={{ fontSize: '12px', margin: '0px 0px 10px 0' }} dangerouslySetInnerHTML={{__html : '(from total portfolio) &nbsp'}} />
                    </div>
                </Col>
                <Col>
                    <div>
                        <label style={{ fontWeight: 'bold', margin: '0px' }} dangerouslySetInnerHTML={{__html : 'Realised Gains : &nbsp'}} />
                        <span>{realisedGains}</span>
                        <div style={{ fontSize: '12px', margin: '0px 0px 10px 0' }} dangerouslySetInnerHTML={{__html : '(sum of gains after each transaction before fees) &nbsp'}} />
                    </div>
                </Col>
                <Col>
                    <div>
                        <label style={{ fontWeight: 'bold' , margin: '0px' }} dangerouslySetInnerHTML={{__html : 'Profit/Loss: &nbsp'}} />
                        <span>{(realisedGains - totalBuyFees - totalSellFees).toFixed(2)}</span>
                        <div style={{ fontSize: '12px', margin: '0px 0px 10px 0' }} dangerouslySetInnerHTML={{__html : '(from realised gains after fees)&nbsp'}} />
                    </div>
                </Col>
            </Row>
            <Row>
                <TradeTable trades={cells}/>
            </Row>
        </>
    )
}
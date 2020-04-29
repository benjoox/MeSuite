import React, { useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import { getSummaryForOneAsset, addAveragePriceAfterEachSell } from './_utils'
import TradeTable from './TradeTable'

export default function SecurityTab(props) {
    const [sharePrice, setPrice] = useState(0)
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
            <Row style={{ marginTop: '15px' }}>
                <Col>
                    <div>
                        <label style={{ fontWeight: 'bold' }} dangerouslySetInnerHTML={{__html : 'Portfolio: &nbsp'}} />
                        <span>{profilAndLoss()}</span>
                    </div>
                </Col>
            </Row>
            <Row>
                <TradeTable trades={addAveragePriceAfterEachSell(props.tradeList)}/>
            </Row>
        </>
    )
}
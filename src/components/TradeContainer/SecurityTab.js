import React, { useState } from 'react'
import { Row, Col } from 'react-bootstrap'

export default function SecurityTab(props) {
    const [sharePrice, setPrice] = useState(0)
    const { code, totalBuyCost, totalNumberBuy, totalSellCost, totalNumberSell, totalBuyFees, totalSellFees } = props.security
    
    if(!props.security) return null

    function profilAndLoss() {
        const calc = (totalSellCost - totalBuyCost - totalBuyFees - totalSellFees) + (totalNumberBuy - totalNumberSell) * sharePrice
        return calc.toFixed(2)
    }
    return (
        <>
        <Row className="justify-content-around">
            <Col>
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
            </Col>
            <Col>
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
            </Col>
        </Row>
        <Row>
            
            <Col>
                <label style={{ fontWeight: 'bold' }} dangerouslySetInnerHTML={{__html : 'Number of outstanding shares: &nbsp'}} />
                <span>{totalNumberBuy - totalNumberSell}</span>
            </Col>
        </Row>
        <Row>
            <Col>
                <label style={{ fontWeight: 'bold' }} dangerouslySetInnerHTML={{__html : `Enter a price for ${code} : &nbsp`}} />
                <input type='number' onChange={ev => setPrice(ev.target.value)} value={sharePrice}/>
            </Col>
            <Col>
                <label style={{ fontWeight: 'bold' }} dangerouslySetInnerHTML={{__html : 'Portfolio: &nbsp'}} />
                <span>{profilAndLoss()}</span>
            </Col>
        </Row>
        <Row>
            
        </Row>
        </>
    )
}
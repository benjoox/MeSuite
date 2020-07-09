import React from 'react'
import { Row, Col } from 'react-bootstrap'

export default function (props) {
    const { buyPrice, sellPrice , fees, shares } = props
    const totalBuy = buyPrice * shares + fees
    const totalSell = sellPrice * shares + fees
    const changeInDollar = sellPrice - buyPrice
    const changeInPercentage = (sellPrice - buyPrice) / buyPrice * 100
    const profitAndLoss = totalSell - totalBuy

    return (
        <Row>
            <Col>
                <h4>Total Buy</h4>
                <div>$ {totalBuy.toFixed(2)}</div>
            </Col>
            <Col>
                <h4>Total Sell</h4>
                <div>$ {totalSell.toFixed(2)}</div>
            </Col>
            <Col>
                <h4>Change for each unit in $$</h4>
                <div>$ {changeInDollar.toFixed(2)}</div>
            </Col>
            <Col>
                <h4>Change for each unit in %</h4>
                <div>{changeInPercentage.toFixed(2)}</div>
            </Col>
            <Col>
                <h4>P&L</h4>
                <div>$ {profitAndLoss.toFixed(2)}</div>
            </Col>
        </Row>
    )
}






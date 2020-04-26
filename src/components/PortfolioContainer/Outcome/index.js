import React from 'react'
import { Row, Col, ListGroup } from 'react-bootstrap'

export default function (props) {
    const { buyPrice, sellPrice , fees, shares } = props
    const totalBuy = buyPrice * shares + fees
    const totalSell = sellPrice * shares + fees
    const changeInDollar = sellPrice - buyPrice
    const changeInPercentage = (sellPrice - buyPrice) / buyPrice * 100
    const profitAndLoss = totalSell - totalBuy

    return (
        <Col>
            <ListGroup>
                <ListGroup.Item> 
                    <span style={{ fontWeight: 'bold' }} dangerouslySetInnerHTML={{ __html: 'Total buy: &nbsp'}} />
                    ${totalBuy.toFixed(2)}
                </ListGroup.Item>
                <ListGroup.Item>
                    <span style={{ fontWeight: 'bold' }} dangerouslySetInnerHTML={{ __html: 'Change for each unit in $:&nbsp'}} />
                    ${totalSell.toFixed(2)}
                </ListGroup.Item>
                <ListGroup.Item>
                    <span style={{ fontWeight: 'bold' }} dangerouslySetInnerHTML={{ __html: 'Change for each unit in %:&nbsp'}} />
                    ${changeInPercentage.toFixed(2)}
                </ListGroup.Item>
                <ListGroup.Item>
                    <span style={{ fontWeight: 'bold' }} dangerouslySetInnerHTML={{ __html: 'Total buy:&nbsp'}} />
                    ${profitAndLoss.toFixed(2)}
                </ListGroup.Item>
            </ListGroup>
        </Col>
    )
}






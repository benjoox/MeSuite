import React from 'react'
import { Col, ListGroup } from 'react-bootstrap'

export default function Outcome (props) {
    const { buyPrice, sellPrice , fees, shares } = props
    const totalBuy = (buyPrice * shares + fees).toFixed(2)
    const totalSell = (sellPrice * shares + fees).toFixed(2)
    const changeInDollarPerUnit = (sellPrice - buyPrice).toFixed(2)
    const changeInPercentageperUnit = (((sellPrice - buyPrice) / buyPrice) * 100).toFixed(2)
    const changeInDollarTotal = (totalBuy - totalSell).toFixed(2)
    const changeInPercentageTotal = ((totalBuy - totalSell)/ totalBuy * 100).toFixed(2)

    const profitAndLoss = (totalSell - totalBuy).toFixed(2)

    const percentageMode = props.percentageMode ? '%' : '$'
    const changePerUnit = props.percentageMode ? changeInPercentageperUnit : changeInDollarPerUnit
    const changeInTotal = props.percentageMode ? changeInPercentageTotal : changeInDollarTotal
    
    return (
        <Col>
            <ListGroup>
                <ListGroup.Item> 
                    <span style={{ fontWeight: 'bold' }} dangerouslySetInnerHTML={{ __html: 'Total buy: &nbsp'}} />
                    ${totalBuy}
                </ListGroup.Item>
                <ListGroup.Item>
                    <span style={{ fontWeight: 'bold' }} dangerouslySetInnerHTML={{ __html: 'Total sell: &nbsp'}} />
                    ${totalSell}
                </ListGroup.Item>
                <ListGroup.Item>
                    <span style={{ fontWeight: 'bold' }} dangerouslySetInnerHTML={{ __html: `Change for each unit in ${ percentageMode } :&nbsp`}} />
                    {changePerUnit}
                </ListGroup.Item>
                <ListGroup.Item>
                    <span style={{ fontWeight: 'bold' }} dangerouslySetInnerHTML={{ __html: `Change in total in ${ percentageMode } :&nbsp`}} />
                    {changeInTotal}
                </ListGroup.Item>
                <ListGroup.Item>
                    <span style={{ fontWeight: 'bold' }} dangerouslySetInnerHTML={{ __html: 'Profit and loss:&nbsp'}} />
                    ${profitAndLoss}
                </ListGroup.Item>
            </ListGroup>
        </Col>
    )
}






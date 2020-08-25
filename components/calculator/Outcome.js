import React from 'react'
import { Col, ListGroup } from 'react-bootstrap'

export default function Outcome({
    percentageMode,
    buyPrice,
    sellPrice,
    fees,
    shares,
}) {
    const totalBuy = (buyPrice * shares + fees).toFixed(2)
    const totalSell = (sellPrice * shares + fees).toFixed(2)
    const changeInDollarPerUnit = (sellPrice - buyPrice).toFixed(2)
    const changeInPercentageperUnit = (
        ((sellPrice - buyPrice) / buyPrice) *
        100
    ).toFixed(2)
    const changeInDollarTotal = (totalBuy - totalSell).toFixed(2)
    const changeInPercentageTotal = (
        ((totalBuy - totalSell) / totalBuy) *
        100
    ).toFixed(2)

    const profitAndLoss = (totalSell - totalBuy).toFixed(2)

    const mode = percentageMode ? '%' : '$'
    const changePerUnit = mode
        ? changeInPercentageperUnit
        : changeInDollarPerUnit
    const changeInTotal = mode ? changeInPercentageTotal : changeInDollarTotal

    return (
        <Col>
            <ListGroup>
                <ListGroup.Item>
                    <span style={{ fontWeight: 'bold' }}>
                        Total buy: &nbsp;
                    </span>
                    ${totalBuy}
                </ListGroup.Item>
                <ListGroup.Item>
                    <span style={{ fontWeight: 'bold' }}>
                        Total sell: &nbsp;
                    </span>
                    ${totalSell}
                </ListGroup.Item>
                <ListGroup.Item>
                    <span style={{ fontWeight: 'bold' }}>
                        Change for each unit in ${percentageMode} :&nbsp;
                    </span>

                    {changePerUnit}
                </ListGroup.Item>
                <ListGroup.Item>
                    <span style={{ fontWeight: 'bold' }}>
                        Change in total in ${percentageMode} :&nbsp;
                    </span>
                    {changeInTotal}
                </ListGroup.Item>
                <ListGroup.Item>
                    <span style={{ fontWeight: 'bold' }}>
                        Profit and loss:&nbsp;
                    </span>
                    ${profitAndLoss}
                </ListGroup.Item>
            </ListGroup>
        </Col>
    )
}

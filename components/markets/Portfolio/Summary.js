import React from 'react'
import { Row, Container } from 'react-bootstrap'
import Item from './Item'

const ContainerStyle = {
    margin: '20px 0',
    padding: '20px',
    borderTop: 'solid 1px lightgrey',
}

export default function Summary(props) {
    const { totalBuy, totalSell, value } = props
    return (
        <Container style={ContainerStyle}>
            <Row>
                <Item label="Total buy" value={totalBuy.toFixed(2)} />

                <Item
                    label="Total sell"
                    value={(totalSell + value).toFixed(2)}
                    tooltip="totalSell + value of outstanding shares"
                />
            </Row>
            <Row>
                <Item
                    label="Value of outstanding securities:"
                    value={value.toFixed(2)}
                    tooltip="price * outstandingUnits - fees"
                />

                <Item
                    label="Net"
                    value={(totalSell + value - totalBuy).toFixed(2)}
                    tooltip="totalSell + of outstanding securities - totalBuy"
                />
            </Row>
        </Container>
    )
}

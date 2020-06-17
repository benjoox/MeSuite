import React from 'react'
import { Row, Container } from 'react-bootstrap'
import Item from './Item'

export default function Summary(props) {
    return  <Container style={ContainerStyle}>
                <Row>
                    <Item 
                        label='Total buy'
                        value={props.totalBuy.toFixed(2)}
                    />

                    <Item 
                        label='Total sel'
                        value={(props.totalSell + props.value).toFixed(2)}
                        tooltip='totalSell + value of outstanding shares'
                    />
                </Row>
                <Row>
                    <Item 
                        label='Value of outstanding securities:'
                        value={props.value.toFixed(2)} 
                        tooltip='price * outstandingUnits - fees'
                    />

                    <Item 
                        label='Net'
                        value={(props.totalSell + props.value - props.totalBuy).toFixed(2)}
                        tooltip='totalSell + of outstanding securities - totalBuy'
                    />
                </Row>
            </Container>
}

const ContainerStyle = {
    margin: '20px 0',
    padding: '20px',
    borderTop: 'solid 1px lightgrey'
}
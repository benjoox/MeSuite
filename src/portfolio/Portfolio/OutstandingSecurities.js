import React from 'react'
import { array, bool, func } from 'prop-types'
import { Row, Col, Container, Spinner } from 'react-bootstrap'

export default function OutstandingSecurities(props) {
    return <Container style={ContainerStyle}>
            {
                props.loader 
                ? 
                <div  style={{ textAlign: 'center', width: '100%' }}>
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
                </div>
                :
                props.outstandingSecurities.map(ticker => <Row key={ticker.ticker}>
                    <Col><b>Ticker: </b>{ticker.ticker}</Col>
                    <Col><b>Number of securities: </b>{ticker.outstandingUnits}</Col>
                    <Col>
                        <b>Price: </b>
                        <input 
                            onChange={props.updatePrice} 
                            id={ticker.ticker}
                            type='number' 
                            value={ticker.lastPrice}  
                        />
                    </Col>
                </Row>)
            }
        </Container>
}

OutstandingSecurities.propTypes = {
    outstandingSecurities: array,
    loader: bool.isRequired,
    updatePrice: func.isRequired
}

const ContainerStyle = {
    margin: '20px 0',
    padding: '20px',
    borderTop: 'solid 1px lightgrey'
}


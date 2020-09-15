import React from 'react'
import { string, bool, func, arrayOf } from 'prop-types'
import { Row, Col, Container, Spinner } from 'react-bootstrap'

const ContainerStyle = {
    margin: '20px 0',
    padding: '20px',
    borderTop: 'solid 1px lightgrey',
}

export default function OutstandingSecurities({
    loader,
    outstandingSecurities,
    updatePrice,
}) {
    return (
        <Container style={ContainerStyle}>
            {loader ? (
                <div style={{ textAlign: 'center', width: '100%' }}>
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </div>
            ) : (
                outstandingSecurities.map((ticker) => (
                    <Row key={ticker.ticker}>
                        <Col>
                            <b>Ticker: </b>
                            {ticker.ticker}
                        </Col>
                        <Col>
                            <b>Number of securities: </b>
                            {ticker.outstandingUnits}
                        </Col>
                        <Col>
                            <b>Price: </b>
                            <input
                                onChange={updatePrice}
                                id={ticker.ticker}
                                type="number"
                                value={ticker.lastPrice}
                            />
                        </Col>
                    </Row>
                ))
            )}
        </Container>
    )
}

OutstandingSecurities.defaultProps = {
    outstandingSecurities: [],
}
OutstandingSecurities.propTypes = {
    outstandingSecurities: arrayOf(string),
    loader: bool.isRequired,
    updatePrice: func.isRequired,
}

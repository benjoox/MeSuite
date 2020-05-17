import React from 'react'
import { Col, Tab } from 'react-bootstrap'
import Security from '../Security'
import Calculator from '../Calculator'
import Portfolio from '../Portfolio'

export default props => {
    return (
        <Col sm={9} style={{ overflow: 'scroll' }}>
            <Tab.Content>
                <Tab.Pane key='portfolio' eventKey="portfolio">
                    <Portfolio tradesMap={props.tradesMap} />
                </Tab.Pane>
                { 
                    props.tradesMap ? Array.from(props.tradesMap)
                    .map(el => <Tab.Pane key={el[0]} eventKey={el[0]}>
                            <Security trades={el[1]}/>
                        </Tab.Pane>
                    )
                    :
                    ''
                }
                <Tab.Pane key='calculator' eventKey="calculator">
                    <Calculator />  
                </Tab.Pane>
            </Tab.Content>
        </Col>
    )
}
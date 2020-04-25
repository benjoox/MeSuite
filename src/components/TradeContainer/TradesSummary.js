import React, { useState } from 'react'
import { Tabs, Tab, Row, Col, Card } from 'react-bootstrap'

export default function TradeSummary(props) {
    const [key, setKey] = useState();
    const assetList = Object.entries(props.assetList)
    console.log('assetList ', assetList[0][0])
    return (
        <section style={{ textAlign: 'left'}}>
            <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
            >
                { assetList.map(el => 
                    <Tab eventKey={el[0]} title={el[0]} style={{ padding: '20px', borderLeft: 'solid 1px #dee2e6', borderRight: 'solid 1px #dee2e6' }}>
                        <Row className="justify-content-around">
                            <Col>
                                    
                                    <div>
                                        <label style={{ fontWeight: 'bold' }} dangerouslySetInnerHTML={{__html : 'Total buy cost: &nbsp'}} />
                                        <span>{el[1].totalBuyCost}</span>
                                    </div>
                                    <div>
                                        <label style={{ fontWeight: 'bold' }} dangerouslySetInnerHTML={{__html : 'Total number bought: &nbsp'}} />
                                        <span>{el[1].totalNumberBuy}</span>
                                    </div>
                            </Col>
                            <Col>
                                    <div>
                                        <label style={{ fontWeight: 'bold' }} dangerouslySetInnerHTML={{__html : 'Total sell cost: &nbsp'}} />
                                        <span>{el[1].totalSellCost}</span>
                                    </div>
                                    <div>
                                        <label style={{ fontWeight: 'bold' }} dangerouslySetInnerHTML={{__html : 'Total number sold: &nbsp'}} />
                                        <span>{el[1].totalNumberSell}</span>
                                    </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <label style={{ fontWeight: 'bold' }} dangerouslySetInnerHTML={{__html : 'Total borkerage paid: &nbsp'}} />
                                <span>{el[1].totalBrokerageCost}</span>
                            </Col>
                        </Row>
                    </Tab>
                )}
            </Tabs>
        </section>
    )
}
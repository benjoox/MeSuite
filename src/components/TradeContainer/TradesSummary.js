import React, { useState } from 'react'
import { Tabs, Tab, Row, Col, Card } from 'react-bootstrap'
import SecurityTab from './SecurityTab';

export default function TradeSummary(props) {
    const [key, setKey] = useState('total');
    const assetList = Object.entries(props.assetList)
    function createSecurityTab(assetList) {
        return assetList.map(asset => 
            <Tab 
                eventKey={asset[0]} 
                key={asset[0]} 
                title={asset[0]} 
                style={{ padding: '20px', borderLeft: 'solid 1px #dee2e6', borderRight: 'solid 1px #dee2e6' }}
            >
                <SecurityTab security={{...asset[1], code: asset[0]}}/>
            </Tab>
        )
    }

    function calculateProfitAndLoss() {
        // To do 
    }
  
    function calculateProfitAndLoss() {
        // To do 

    }
    const assets = props.assetList
    let security = {
        tabList: [],
        profitAndLoss: 0,
        totalBrokerageFee: 0
    }
    for(var k in assets) {
        security = { 
            ...security,
            tabList: () => createSecurityTab(assetList),
            totalBuyCost: assets[k].totalBuyCost ? assets[k].totalBuyCost : 0,
            totalSellCost: assets[k].totalSellCost ? assets[k].totalSellCost : 0,
            totalNumberBuy: assets[k].totalNumberBuy ? assets[k].totalNumberBuy : 0,
            totalNumberSell: assets[k].totalNumberSell ? assets[k].totalNumberSell : 0,
            totalFees: assets[k].totalFees ? assets[k].totalFees : 0,
            [k]: ""
        }
    }
    return (
        <section style={{ textAlign: 'left'}}>
            <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
            >   
                { security.tabList(assetList) }

                <Tab eventKey='total' title='Total' style={{ padding: '20px', borderLeft: 'solid 1px #dee2e6', borderRight: 'solid 1px #dee2e6' }}>
                    <div>{security.totalBuyCost}</div>
                    <div>{security.totalSellCost}</div>
                    <div>{security.totalNumberBuy}</div>
                    <div>{security.totalNumberSell}</div>
                    <div>{security.totalFees.toFixed(2)}</div>
                </Tab>
            </Tabs>
        </section>
    )
}
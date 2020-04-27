import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Tabs, Tab } from 'react-bootstrap'
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
                style={{ padding: '20px' }}
            >
                <SecurityTab security={{...asset[1], code: asset[0]}}/>
            </Tab>
        )
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

                <Tab eventKey='total' title='Total' style={{ padding: '20px' }}>
                    <div>
                        <label style={{ fontWeight: 'bold' }} dangerouslySetInnerHTML={{__html : 'Total buy cost: &nbsp'}} />
                        <span>{security.totalBuyCost}</span>
                    </div>
                    <div>
                        <label style={{ fontWeight: 'bold' }} dangerouslySetInnerHTML={{__html : 'Total sell cost: &nbsp'}} />
                        <span>{security.totalSellCost}</span>
                    </div>
                    <div>
                        <label style={{ fontWeight: 'bold' }} dangerouslySetInnerHTML={{__html : 'Total fees: &nbsp'}} />
                        <span>{security.totalFees.toFixed(2)}</span>
                    </div>
                    <div>
                        <label style={{ fontWeight: 'bold' }} dangerouslySetInnerHTML={{__html : 'Profit/Loss: &nbsp'}} />
                        <span>{security.totalSellCost - security.totalBuyCost - security.totalFees.toFixed(2)}</span>
                    </div>
                </Tab>
            </Tabs>
        </section>
    )
}

TradeSummary.propTypes = {
    assetList: PropTypes.object.isRequired
}

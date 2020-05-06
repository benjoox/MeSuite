import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { Tabs, Tab } from 'react-bootstrap'
import SecurityTab from './SecurityTab';
import { PortfolioContext } from '.'

export default function TradeSummary(props) {
    const [key, setKey] = useState('total');
    const portfolioContext = useContext(PortfolioContext)

    function createSecurityTab() {
        const tabList = []
        for(let [code, trade] of portfolioContext.tradesMap) {
            tabList.push(<Tab 
                eventKey={code} 
                key={code} 
                title={code} 
                style={{ padding: '20px 0 20px 0' }}
            >
                <SecurityTab code={code} tradeList={trade} />
            </Tab>)
        }
        return tabList
    }   
    if(!portfolioContext.tradesMap) {
        return <div>W8 M8</div>
    }
    console.log( ' portfolioContext.tradesMap', portfolioContext.tradesMap)
    
    const assets = portfolioContext.tradesMap
    let security = {
        tabList: [],
        profitAndLoss: 0,
        totalSellFees: 0,
        totalBuyFees: 0,
        totalBuyCost: 0,
        totalSellCost: 0,
        totalNumberBuy: 0
    }
    for(var k in assets) {
        security = { 
            ...security,    
            tabList: () => createSecurityTab(assetList),
            totalBuyCost: assets[k].totalBuyCost ? assets[k].totalBuyCost + security.totalBuyCost : security.totalBuyCost,
            totalSellCost: assets[k].totalSellCost ? assets[k].totalSellCost + security.totalSellCost: security.totalSellCost,
            totalNumberBuy: assets[k].totalNumberBuy ? assets[k].totalNumberBuy + security.totalNumberBuy : security.totalNumberBuy,
            totalNumberSell: assets[k].totalNumberSell ? assets[k].totalNumberSell + security.totalNumberSell: security.totalNumberSell,
            totalSellFees: assets[k].totalSellFees ? assets[k].totalSellFees + security.totalSellFees : security.totalSellFees,
            totalBuyFees: assets[k].totalBuyFees ? assets[k].totalBuyFees + security.totalBuyFees : security.totalBuyFees,
            [k]: ""
        }
    }
    const totalFees = security.totalBuyFees + security.totalSellFees
    return (
        <section style={{ textAlign: 'left'}}>
            <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
            >   
                { createSecurityTab(props.assetList) }

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
                        <span>{totalFees.toFixed(2)}</span>
                    </div>
                    <div>
                        <label style={{ fontWeight: 'bold' }} dangerouslySetInnerHTML={{__html : 'Profit/Loss: &nbsp'}} />
                        <span>{(security.totalSellCost - security.totalBuyCost - totalFees).toFixed(2)}</span>
                    </div>
                </Tab>
            </Tabs>
        </section>
    )
}

TradeSummary.propTypes = {
    assetList: PropTypes.object.isRequired
}

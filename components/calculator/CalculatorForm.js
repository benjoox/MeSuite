import React from 'react'
import { Col } from 'react-bootstrap'
import InputWithSlider from '../shared/InputWithSlider'

export default function CalculatorForm(props) {
    const  {
        buyPrice,
        setBuy,
        sellPrice,
        setSell,
        shares,
        setShares,
        fees,
        setFees
    } = props
    

    function setNumberOfShares(ev) {
        ev.preventDefault()
        setShares(ev.target.value)
    }

    function setBuyPrice(ev) {
        ev.preventDefault()
        setBuy(parseFloat(ev.target.value))
    }

    function setSellPrice(ev) {
        ev.preventDefault()
        setSell(parseFloat(ev.target.value))
    }

    function setBrokerageFees(ev) {
        ev.preventDefault()
        setFees(parseFloat(ev.target.value))
    }
    
    return  <Col xs md={5}>
                <InputWithSlider 
                    value={buyPrice}
                    onChange={setBuyPrice}
                    label="Buy price"
                    placeholder="Buy price"
                    steps={0.01}
                    min={0}
                    max={200}
                />
                <InputWithSlider 
                    value={shares}
                    onChange={setNumberOfShares}
                    label="Number of shares"
                    placeholder="Number of shares"
                    steps={1}
                    min={0}
                    max={10000}
                /> 
                <InputWithSlider 
                    value={sellPrice}
                    onChange={setSellPrice}
                    label="Sell price"
                    placeholder="Sell price"
                    steps={0.01}
                    min={0}
                    max={200}
                />
                <InputWithSlider 
                    onChange={setBrokerageFees}
                    label="Brokerage fees"
                    placeholder="10"
                    value={fees}
                    steps={1}
                /> 
        </Col>
}
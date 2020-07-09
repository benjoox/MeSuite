import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'
import * as csv from 'csvtojson'

const ACCEPTABLE_HEADERS = ['net', 'orderNumber', 'date', 'type', 'code', 'units', 'price', 'fees']
export default function UploadButton(props) {
    const uploaderRef = useRef()

    function handleClick(ev) { 
        ev.preventDefault()
        uploaderRef.current.click()
    }
  
    function onFileChange(ev) { 
        ev.preventDefault()
        const reader = new FileReader()
        reader.onload = ev => {
            const firstLine = ev.target.result.split("\n")[0]
            const csvHeaders = firstLine.split(",")
        
            for(let k = 0; k < csvHeaders.length; k++) {
                if(!ACCEPTABLE_HEADERS.includes(csvHeaders[k].trim())) {
                    alert(`Header ${csvHeaders[k]} is missing in the csv file`)
                    throw Error(`Header ${csvHeaders[k]} is missing in the csv file`)
                }
                    
            }            
            csv().fromString(ev.target.result)
                .then(result => {
                    console.log('result ', result)
                    
                    props.uploadCSVFile(result)
                })
                .catch(err => console.log('Error in converting CSV to JSON ', err.message))
        }

        reader.readAsText(event.target.files[0]);
    }
    
    return (
        <> 
            <Button variant="outline-dark" onClick={handleClick}> Upload </Button> 
            <input type="file" onChange={onFileChange} ref={uploaderRef} hidden accept='.csv'/> 
        </>
    )
}

UploadButton.propTypes = {
    uploadCSVFile: PropTypes.func.isRequired
}


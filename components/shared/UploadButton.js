import React, { useRef } from 'react'
import { func, array } from 'prop-types'
import moment from 'moment-timezone'
import { Button } from 'react-bootstrap'
import * as csv from 'csvtojson'

function extractHeader(target) {
    const firstLine = target.split("\n")[0]
    return firstLine.split(",")
}

function validateHeaders(requiredHeaders, fileHeaders){
    for(let k = 0; k < fileHeaders.length; k++) {
        if(!requiredHeaders.includes(fileHeaders[k].trim())) {
            alert(`The uploaded file does not have one of the required headers ${requiredHeaders}`)
            throw (`The uploaded file does not have one of the required headers ${requiredHeaders}`)
        }
    }  
}

// TODO: Ask the user for the format of the date
const convertDates = (list, format='DD/MM/YYYY') =>
    list.map(el => ({...el, date: moment(el.date, format, true).tz('Australia/Melbourne').unix()}))


export default function UploadButton(props) {
    const uploaderRef = useRef()
    const formRef = useRef()

    function handleClick(ev) { 
        ev.preventDefault()
        uploaderRef.current.click()
    }

    const onFileChange = (ev) => { 
        const reader = new FileReader()
        reader.readAsText(ev.target.files[0]);
        reader.onload = ev => {
            try {
                const target = ev.target.result
                const headers = extractHeader(target)
                validateHeaders(props.headers, headers)
                csv().fromString(ev.target.result)
                    .then(data => {
                        props.uploadCSVFile(convertDates(data))
                        formRef.current.reset()
                    })
                    .catch(err => console.log('Error in converting CSV to JSON ', err.message))
            } catch(err) {
                console.error(err)
                formRef.current.reset()
            }
        }
    }
    
    return (
        <form ref={formRef}>
            <Button variant="outline-dark" onClick={handleClick}>Upload Transactions</Button> 
            <input type="file" onChange={onFileChange} ref={uploaderRef} hidden accept='.csv'/> 
        </form>
    )
}

UploadButton.propTypes = {
    uploadCSVFile: func.isRequired,
    headers: array.isRequired
}


import React, { useRef } from 'react'
import moment from 'moment-timezone'
import { Button } from 'react-bootstrap'
import * as csv from 'csvtojson'

function extractHeader(target) {
    const firstLine = target.split('\n')[0]
    return firstLine.split(',')
}

function validateHeaders(requiredHeaders, fileHeaders) {
    for (let k = 0; k < fileHeaders.length; k += 1) {
        if (!requiredHeaders.includes(fileHeaders[k].trim())) {
            // eslint-disable-next-line no-alert
            alert(
                `The uploaded file does not have one of the required headers ${requiredHeaders}`
            )
            throw Error(
                `The uploaded file does not have one of the required headers ${requiredHeaders}`
            )
        }
    }
}

// TODO: Ask the user for the format of the date
const convertDates = (list, format = 'DD/MM/YYYY') =>
    list.map((el) => ({
        ...el,
        date: moment(el.date, format, true).tz('Australia/Melbourne').unix(),
    }))

export default function UploadButton({ handleUpload, headers, timestamped }) {
    const uploaderRef = useRef()
    const formRef = useRef()

    function handleClick(ev) {
        ev.preventDefault()
        uploaderRef.current.click()
    }

    const onFileChange = (event) => {
        const reader = new FileReader()
        reader.readAsText(event.target.files[0])
        reader.onload = (ev) => {
            ev.preventDefault()
            console.log(' handle upload ', handleUpload)
            try {
                const target = ev.target.result
                const fileHeaders = extractHeader(target)
                validateHeaders(headers, fileHeaders)
                csv()
                    .fromString(ev.target.result)
                    .then((rawData) => {
                        const data = timestamped
                            ? convertDates(rawData)
                            : rawData
                        handleUpload(data)
                        if (formRef.current) {
                            formRef.current.reset()
                        }
                    })
                    .catch((err) =>
                        console.error(
                            'Error in converting CSV to JSON ',
                            err.message
                        )
                    )
            } catch (err) {
                console.error(err)
                formRef.current.reset()
            }
        }
    }

    return (
        <form ref={formRef}>
            <Button variant="outline-dark" onClick={handleClick}>
                Upload
            </Button>
            <input
                type="file"
                onChange={onFileChange}
                ref={uploaderRef}
                hidden
                accept=".csv"
            />
        </form>
    )
}

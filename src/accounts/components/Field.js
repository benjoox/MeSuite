import React, { useEffect, useState } from 'react'
import moment from 'moment-timezone'
import { Button } from 'react-bootstrap';

const TIMEZONE = 'AUSTRALIA/MELBOURNE'

const convertTime = (timestamp, timezone=TIMEZONE) => {
    return moment.tz(moment.unix(timestamp), timezone).format("DD/MM/YYYY")
}

export default function Field (props) {
    const { transaction, deleteTransaction, updateTransaction } = props 
    const [category, setCategory] = useState('')
    useEffect(() => setCategory(transaction.category), [])
    
    return (
            <tr>
                <td>{convertTime(transaction.date)}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.account ? transaction.account.toLowerCase() : ''}</td>
                <td>
                  
                    <input 
                        type='text'
                        value={category ? category: ''}
                        onChange={ev => setCategory(ev.target.value)}
                    />
                </td>
                <td>{transaction.description ? transaction.description.toLowerCase() : ''}</td>
                <td colSpan={5}>
                    <Button onClick={() => updateTransaction({ ...transaction, category })}>Save</Button>
                </td> 
                <td colSpan={5}>
                    <Button onClick={() => deleteTransaction(transaction._id)}>Delete</Button>
                </td>   
            </tr>
    )
}
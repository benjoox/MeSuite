import React, { useEffect, useState, useContext } from 'react'
import moment from 'moment-timezone'
import { Button } from 'react-bootstrap'
import { AccountsContext } from '../../pages/accounts'
import { AppContext } from '../../pages/_app'

const TIMEZONE = 'AUSTRALIA/MELBOURNE'

const convertTime = (timestamp, timezone = TIMEZONE) => {
    return moment.tz(moment.unix(timestamp), timezone).format('DD/MM/YYYY')
}

export default function Field(props) {
    const { transaction } = props
    const [category, setCategory] = useState('')
    useEffect(() => setCategory(transaction.category), [])
    const { deleteAccountTransaction, updateAccountTransaction } = useContext(
        AccountsContext
    )
    const { mode } = useContext(AppContext)

    return (
        <tr>
            <td>{convertTime(transaction.date)}</td>
            <td>{transaction.amount}</td>
            <td>
                {transaction.account ? transaction.account.toLowerCase() : ''}
            </td>
            <td>
                <input
                    type="text"
                    value={category || ''}
                    onChange={(ev) => setCategory(ev.target.value)}
                />
            </td>
            <td>
                {transaction.description
                    ? transaction.description.toLowerCase()
                    : ''}
            </td>
            {mode ? (
                <>
                    <td colSpan={5}>
                        <Button
                            onClick={() =>
                                updateAccountTransaction({
                                    ...transaction,
                                    category,
                                })
                            }
                        >
                            Save
                        </Button>
                    </td>
                    <td colSpan={5}>
                        <Button
                            onClick={() =>
                                deleteAccountTransaction(transaction.id)
                            }
                        >
                            Delete
                        </Button>
                    </td>
                </>
            ) : (
                ''
            )}
        </tr>
    )
}

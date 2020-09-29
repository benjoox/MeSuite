import React, { useEffect, useState, useContext } from 'react'
import { Button } from 'react-bootstrap'
import { AccountsContext } from '../../store/AccountContextProvider'
import { AppContext } from '../../store/AppContextProvider'

export default function Field(props) {
    const { transaction } = props
    const [category, setCategory] = useState('')
    useEffect(() => setCategory(transaction.category), [])
    const { deleteAccountTransaction, updateAccountTransaction } = useContext(
        AccountsContext
    )
    const { modeIsOnline } = useContext(AppContext)

    return (
        <tr>
            <td>{transaction.datetimeDisplay}</td>
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
            {modeIsOnline ? (
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
            ) : (
                <td colSpan={5}>NA</td>
            )}
            {modeIsOnline ? (
                <td colSpan={5}>
                    <Button
                        onClick={() => deleteAccountTransaction(transaction.id)}
                    >
                        Delete
                    </Button>
                </td>
            ) : (
                <td colSpan={5}>NA</td>
            )}
        </tr>
    )
}

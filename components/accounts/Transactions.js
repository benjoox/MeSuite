import React, { useState } from 'react'

import { Container, Table, Button } from 'react-bootstrap'
import Field from './Field'

export default function Transctions(props) {
    const [balance, setBalance] = useState(0)
    const [debit, setDebit] = useState(0)
    const [credit, setCredit] = useState(0)

    const { list } = props
    function sort(sortBy) {
        const sortedArray = list.sort((a, b) => {
            if (a[sortBy] > b[sortBy]) return -1
            if (b[sortBy] > a[sortBy]) return 1
            return 0
        })
        props.updateFilteredList([...sortedArray])
    }

    function calcTotal() {
        const totalObj = list.reduce(
            (acc, transaction) => {
                return {
                    debit:
                        transaction.amount < 0
                            ? parseFloat(transaction.amount) + acc.debit
                            : acc.debit,
                    credit:
                        transaction.amount >= 0
                            ? parseFloat(transaction.amount) + acc.credit
                            : acc.credit,
                    balance: parseFloat(transaction.amount) + acc.balance,
                }
            },
            { debit: 0, credit: 0, balance: 0 }
        )
        setBalance(totalObj.balance)
        setDebit(totalObj.debit)
        setCredit(totalObj.credit)
    }

    return (
        <Container>
            <Table>
                <thead>
                    <tr>
                        <th onClick={() => sort('date')}>Date</th>
                        <th onClick={() => sort('amount')}>Amount</th>
                        <th onClick={() => sort('account')}>Account</th>
                        <th onClick={() => sort('category')}>Category</th>
                        <th onClick={() => sort('description')}>Description</th>
                        <th colSpan={5} onClick={() => sort('description')}>
                            Save
                        </th>
                        <th colSpan={5} onClick={() => sort('description')}>
                            Delete
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {props.list.map((transaction) => (
                        <Field key={Math.random()} transaction={transaction} />
                    ))}

                    <tr>
                        <td>Debit</td>
                        <td colSpan={2}>{debit || 0}</td>
                    </tr>
                    <tr>
                        <td>Credit</td>
                        <td>{credit || 0}</td>
                    </tr>
                    <tr>
                        <td>Balance</td>
                        <td>{balance || 0}</td>
                    </tr>
                    <tr>
                        <td colSpan={5}>
                            <Button onClick={calcTotal}>Get total</Button>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </Container>
    )
}

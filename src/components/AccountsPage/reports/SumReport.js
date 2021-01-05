import React from 'react'
import { Table } from 'react-bootstrap'

export default function SumReport({ filteredList }) {
    if (filteredList.length < 1) return ''

    const { balance, credit, debit } = filteredList.reduce(
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

    return (
        <Table>
            <tbody>
                <tr>
                    <td>Debit</td>
                    <td colSpan={2}>{debit.toFixed(2) || 0}</td>
                </tr>
                <tr>
                    <td>Credit</td>
                    <td>{credit.toFixed(2) || 0}</td>
                </tr>
                <tr>
                    <td>Balance</td>
                    <td>{balance.toFixed(2) || 0}</td>
                </tr>
            </tbody>
        </Table>
    )
}

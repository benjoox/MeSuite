import React, { useContext } from 'react'
import { Jumbotron, Table } from 'react-bootstrap'
import {
    AccountsContext,
    Transaction,
} from '../../../store/AccountContextProvider'

type Header = {
    date: string,
}

export default function FileUploadPreview({ headers }: { headers: Header }) {
    const {
        uploadedTransactions,
    }: { uploadedTransactions: Transaction } = useContext(AccountsContext)

    return (
        <Jumbotron>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        {headers.map((title) => (
                            <th>{title}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {uploadedTransactions.map((transaction) => (
                        <tr key={`${transaction.account}`}>
                            <td>{transaction.date}</td>
                            <td>{transaction.amount}</td>
                            <td>{transaction.account}</td>
                            <td>{transaction.category}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Jumbotron>
    )
}

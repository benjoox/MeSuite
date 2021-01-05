import React, { useContext } from 'react'
import { Container, Table } from 'react-bootstrap'
import Field from './Field'
import { FilterContext } from '../../store/FilterContextProvider'

export default function Transctions() {
    const { filteredList, sort } = useContext(FilterContext)

    if (filteredList.length < 1) return ''

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
                    {filteredList.map((transaction) => (
                        <Field key={Math.random()} transaction={transaction} />
                    ))}
                </tbody>
            </Table>
        </Container>
    )
}

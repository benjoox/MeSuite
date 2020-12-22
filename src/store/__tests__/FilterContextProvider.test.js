import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import FilterContextProvider from '../FilterContextProvider'
import AccountContainer from '../../components/AccountsPage/AccountContainer'

const transactionList = [
    {
        date: 12232131231,
        description: 'test',
        category: 'excluded',
    },
]

jest.mock('@auth0/auth0-react')
jest.mock('next/router')

const renderTransactionFilter = (list) =>
    render(
        <FilterContextProvider
            primaryList={{
                name: 'test account name',
                transactions: list,
            }}
        >
            <AccountContainer name="test account name" transactions={list} />
        </FilterContextProvider>
    )

describe('FilterContextProvider filterList function ', () => {
    it('Filter the list with including text in category', () => {
        const { queryAllByText } = renderTransactionFilter(transactionList)
        console.warn(
            'TODO: complete the test with queryAllByText',
            queryAllByText
        )
        // const test = screen.getByText('The number of transactions are')
        // expect(test).toBe('The number of transactions are')
    })
})

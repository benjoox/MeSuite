import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import AccountContainer from '../AccountContainer'
import { FilterContext } from '../../../store/FilterContextProvider'
import { AccountsContext } from '../../../store/AccountContextProvider'

jest.mock('../../Filters/DateFields.js', () => () => (
    <div>mock implementation</div>
))
jest.mock('../../../store/FilterContextProvider')

const setup = (filteredList) =>
    render(
        <AccountsContext.Provider
            value={{
                uploadAccountTransactionFile: jest.fn(() => {}),
                deleteAccount: jest.fn(() => {}),
                selectedAccount: jest.fn(() => {}),
            }}
        >
            <FilterContext.Provider
                value={{
                    filteredList,
                    taglist: [],
                }}
            >
                <AccountContainer />
            </FilterContext.Provider>
        </AccountsContext.Provider>
    )

describe('Title: "The number of transactions are"', () => {
    it('should show the number of items in the filtered list', () => {
        expect.assertions(1)
        const transcations = [
            {
                date: '1589875500',
                username: 'test@gmail.com',
                amount: '803.24',
                id: 'test@gmail.com_accountName_1589875500_803.24',
                description: '',
                category: 'test',
            },
            {
                date: '1594973220',
                username: 'test@gmail.com',
                amount: '1015.74',
                id: 'test@gmail.com_accountName_1594973220_1015.74',
                description: '',
                category: 'test',
            },
            {
                date: '1580893320',
                username: 'test@gmail.com',
                amount: '2000',
                id: 'test@gmail.com_accountName_1580893320_2000',
                description: '',
                category: 'test',
            },
            {
                date: '1567411740',
                username: 'test@gmail.com',
                amount: '-605',
                id: 'test@gmail.com_accountName_1567411740_-605',
                description: '',
            },
            {
                date: '1585728240',
                username: 'test@gmail.com',
                amount: '1606.48',
                id: 'test@gmail.com_accountName_1585728240_1606.48',
                description: '',
            },
            {
                date: '1576055520',
                username: 'test@gmail.com',
                amount: '-2724.54',
                id: 'test@gmail.com_accountName_1576055520_-2724.54',
                description: '',
            },
            {
                date: '1572858660',
                username: 'test@gmail.com',
                amount: '-183.5',
                id: 'test@gmail.com_accountName_1572858660_-183.5',
                description: '',
            },
            {
                date: '1575018660',
                username: 'test@gmail.com',
                amount: '1587.6',
                id: 'test@gmail.com_accountName_1575018660_1587.6',
                description: '',
            },
            {
                date: '1574673060',
                username: 'test@gmail.com',
                amount: '-146.96',
                id: 'test@gmail.com_accountName_1574673060_-146.96',
                description: '',
            },
        ]

        const { getByText } = setup(transcations)

        expect(
            getByText(`The number of transactions are ${transcations.length}`)
        ).toBeInTheDocument()
    })
})

describe('Report tab', () => {
    it('should show the right sum for each category', () => {
        expect.assertions(3)
        const transcations = [
            {
                date: '1589875500',
                username: 'test@gmail.com',
                amount: '803.24',
                id: 'test@gmail.com_accountName_1589875500_803.24',
                description: '',
                category: 'test',
            },
            {
                date: '1594973220',
                username: 'test@gmail.com',
                amount: '1015.74',
                id: 'test@gmail.com_accountName_1594973220_1015.74',
                description: '',
                category: 'test',
            },
            {
                date: '1580893320',
                username: 'test@gmail.com',
                amount: '2000',
                id: 'test@gmail.com_accountName_1580893320_2000',
                description: '',
                category: 'test',
            },
            {
                date: '1567411740',
                username: 'test@gmail.com',
                amount: '-605',
                id: 'test@gmail.com_accountName_1567411740_-605',
                description: '',
            },
            {
                date: '1585728240',
                username: 'test@gmail.com',
                amount: '1606.48',
                id: 'test@gmail.com_accountName_1585728240_1606.48',
                description: '',
            },
            {
                date: '1576055520',
                username: 'test@gmail.com',
                amount: '-2724.54',
                id: 'test@gmail.com_accountName_1576055520_-2724.54',
                description: '',
            },
            {
                date: '1572858660',
                username: 'test@gmail.com',
                amount: '-183.5',
                id: 'test@gmail.com_accountName_1572858660_-183.5',
                description: '',
            },
            {
                date: '1575018660',
                username: 'test@gmail.com',
                amount: '1587.6',
                id: 'test@gmail.com_accountName_1575018660_1587.6',
                description: '',
            },
            {
                date: '1574673060',
                username: 'test@gmail.com',
                amount: '-146.96',
                id: 'test@gmail.com_accountName_1574673060_-146.96',
                description: '',
            },
        ]

        const { getByText } = setup(transcations)

        expect(getByText(`Report`)).toBeInTheDocument()

        expect(getByText(`test`)).toBeInTheDocument()

        expect(getByText(3818.98)).toBeInTheDocument()
    })
})

describe('Sum report', () => {
    it('should show the right balance for all the items in the list', () => {
        expect.assertions(2)
        const transcations = [
            {
                date: '1589875500',
                username: 'test@gmail.com',
                amount: '803.24',
                id: 'test@gmail.com_accountName_1589875500_803.24',
                description: '',
                category: 'test',
            },
            {
                date: '1594973220',
                username: 'test@gmail.com',
                amount: '1015.74',
                id: 'test@gmail.com_accountName_1594973220_1015.74',
                description: '',
                category: 'test',
            },
            {
                date: '1580893320',
                username: 'test@gmail.com',
                amount: '2000',
                id: 'test@gmail.com_accountName_1580893320_2000',
                description: '',
                category: 'test',
            },
            {
                date: '1567411740',
                username: 'test@gmail.com',
                amount: '-605',
                id: 'test@gmail.com_accountName_1567411740_-605',
                description: '',
            },
            {
                date: '1585728240',
                username: 'test@gmail.com',
                amount: '-1606.41',
                id: 'test@gmail.com_accountName_1585728240_1606.48',
                description: '',
            },
        ]

        const { getByText } = setup(transcations)

        expect(getByText(`Balance`)).toBeInTheDocument()

        expect(getByText(1607.57)).toBeInTheDocument()
    })
})

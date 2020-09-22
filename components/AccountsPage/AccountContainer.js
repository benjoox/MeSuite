import React, { useEffect, useState, useContext } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import ReactCSVUploadTest from 'react-csv-upload-test'
import Filter from './Filters'
import Transactions from './Transactions'
import Taglist from './TagList'
import Charts from '../shared/Charts'
import { AccountsContext } from '../../store/AccountContextProvider'

const today = new Date()
today.setMonth(2)
today.setDate(15)

export default function AccountContainer({ transactions, name }) {
    const [filteredList, setFilteredList] = useState([])
    const [filterField, setFilterField] = useState('')
    const [includingText, setIncludingText] = useState('')
    const [excludingText, setExcludingText] = useState('')
    const [startDate, setStartDate] = useState(today)
    const [endDate, setEndDate] = useState(new Date())

    const isDateIncluded = (date) => {
        const startDateTimestamp = startDate.getTime() / 1000
        const endDateTimestamp = endDate.getTime() / 1000
        return startDateTimestamp <= date && date <= endDateTimestamp
    }

    const filteredByDate = () =>
        transactions.filter(({ date }) => isDateIncluded(date))

    const isTextIncluded = (text) =>
        text.toString().toLowerCase().includes(includingText.toLowerCase())

    const isTextExcluded = (text) =>
        !text.toString().toLowerCase().includes(excludingText.toLowerCase())

    function filterList() {
        const updatedFilterList = filteredByDate().filter((transaction) => {
            if (filterField === '') return true
            return (
                (includingText === '' ||
                    isTextIncluded(transaction[filterField])) &&
                (excludingText === '' ||
                    isTextExcluded(transaction[filterField]))
            )
        })
        setFilteredList(updatedFilterList)
    }

    useEffect(filterList, [
        transactions,
        filterField,
        includingText,
        excludingText,
        startDate,
        endDate,
    ])

    const { uploadAccountTransactionFile, accountsAvailable } = useContext(
        AccountsContext
    )

    return (
        <Container>
            {accountsAvailable ? (
                <Taglist transactionList={transactions} />
            ) : (
                ''
            )}
            <Filter
                includingText={includingText}
                excludingText={excludingText}
                filterField={filterField}
                startDate={startDate}
                endDate={endDate}
                updateStartDate={setStartDate}
                updateEndDate={setEndDate}
                setIncludingText={setIncludingText}
                setExcludingText={setExcludingText}
                updateFilterField={setFilterField}
            />
            <div style={{ marginTop: '15px', marginBottom: '15px' }}>
                <Row>
                    <Col md={4}>
                        {' '}
                        The number of transactions are {
                            transactions.length
                        }{' '}
                    </Col>
                    <Col md={4}>
                        {' '}
                        The number of filtered list are {
                            filteredList.length
                        }{' '}
                    </Col>
                    <Col md={4}>
                        <ReactCSVUploadTest
                            handleFile={(data) =>
                                uploadAccountTransactionFile(data, name)
                            }
                            headers={[
                                'date',
                                'amount',
                                'description',
                                'balance',
                                'category',
                            ]}
                        />
                    </Col>
                </Row>
            </div>
            {filteredList.length > 0 ? (
                <Transactions
                    list={filteredList}
                    updateFilteredList={setFilteredList}
                />
            ) : (
                ''
            )}
            <Row>
                <Charts data={filteredList} />
            </Row>
        </Container>
    )
}

import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Filter from './Filters'
import Transactions from './Transactions'
import Taglist from './TagList';
import Charts from './Charts';

const today = new Date()
today.setMonth(2)
today.setDate(15)

export default function Account(props) {
    const [transactionList, updateTransactionsList] = useState([])
    const [filteredList, setFilteredList] = useState([])
    const [filterField, setFilterField] = useState('')
    const [includingText, setIncludingText] = useState('')
    const [excludingText, setExcludingText] = useState('')
    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(new Date());

    useEffect(filterList, 
        [transactionList, filterField, includingText, excludingText, startDate, endDate])

    async function updateTransaction(transaction) {
        try {
            const response = await fetch(process.env.API_URL, {
                method: 'PUT',
                body: JSON.stringify(transaction),
                headers: {
                    'Content-Type': 'application/json',
                  }
            })
            const { content } = await response.json()
            if(!content) return  
        } catch(err) {
            console.error('Error from the server ', err)
        }
    }

    const isTextIncluded = text => text.toString().toLowerCase()
        .includes(includingText.toLowerCase())
    
    const isTextExcluded = text => !text.toString().toLowerCase()
        .includes(excludingText.toLowerCase())

    const isDateIncluded = date => {
        const startDateTimestamp = startDate.getTime()/1000
        const endDateTimestamp = endDate.getTime()/1000
        return startDateTimestamp <= date &&  date <= endDateTimestamp 
    }

    const filteredByDate = () => props.transactions.filter(({ date }) => isDateIncluded(date))

    function filterList() {
        const updatedFilterList = filteredByDate().filter(transaction => {
            if (filterField === '') return true
            return  (includingText === '' || isTextIncluded(transaction[filterField]))
                    &&
                    (excludingText === '' || isTextExcluded(transaction[filterField]))
        })
        setFilteredList(updatedFilterList)
    }

    return <Container>
        { transactionList.length > 0 ? <Taglist transactionList={transactionList} /> : ''}
        
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
        <Row>
            <Col md={4}> The number of transactions are {transactionList.length} </Col>
            <Col md={4}> The number of filtered list are {filteredList.length} </Col>
        </Row>
        {
            filteredList.length > 0 
            ? 
            <Transactions 
                list={filteredList}
                updateFilteredList={setFilteredList}
                updateTransaction={updateTransaction}
            />
            :
            ''
        }
        <Row>
            <Charts data={filteredList} />
        </Row>

    </Container>
}
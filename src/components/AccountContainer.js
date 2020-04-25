import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import Filter from './Filters'
import Transactions from './Transactions'
import Taglist from './TagList';

export default function Account(props) {
    const [transactionList, updateTransactionsList] = useState([])
    const [filteredList, setFilteredList] = useState([])
    const [filterField, setFilterField] = useState('')
    const [searchText, setSearchText] = useState('')
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    useEffect(fetchAccounts, [])
    useEffect(filterList, [filterField, searchText, startDate, endDate])

    async function updateTransaction(transaction) {
        try {
            console.log('the transaction to be updated is ', transaction)
            const response = await fetch(`http://localhost:3040/api/transactions/`, {
                method: 'PUT',
                body: JSON.stringify(transaction),
                headers: {
                    'Content-Type': 'application/json',
                  }
            })
            const { content } = await response.json()
            if(!content) return  
            console.log('the content after updating the transaction is ', content)
        } catch(err) {
            console.error('Error from the server ', err)
        }
    }
    async function deleteTransaction(id) {
        try {
            console.log('the transaction to be deleted has id of ', id)
            const response = await fetch(`http://localhost:3040/api/transactions/${id}`, {
                method: 'DELETE'
            })
            const { content } = await response.json()
            if(!content) return  
            console.log('the content after updating the transaction is ', content)
        } catch(err) {
            console.error('Error from the server ', err)
        }
    }

    function fetchAccounts() {  
        async function fetchData() {
            try {
                const response = await fetch(`http://localhost:3040/api/transactions/${props.name}`)
                const { content } = await response.json()
                if(!content) return  
                updateTransactionsList(content)
                setFilteredList(content)
            } catch(err) {
                console.error('Error from the server ', err)
            }
        } 
        fetchData()
    }

    const textIncludes = filter => filter && filter
        .toLowerCase()
        .includes(searchText.toLowerCase())

    function filterList() {
        const updatedFilterList = transactionList.filter(account => {
            if(filterField === '') return true
            if(filterField === 'date') {
                const startDateTimestamp = startDate.getTime()/1000
                const endDateTimestamp = endDate.getTime()/1000
                return startDateTimestamp <= account.date &&  account.date <= endDateTimestamp
            }

            if(searchText === '') return true
            return textIncludes(account[filterField])
        })
        setFilteredList(updatedFilterList)
    }

    return <Container>
        { transactionList.length > 0 ? <Taglist transactionList={transactionList} /> : ''}
        
        <Filter 
            searchText={searchText}
            filterField={filterField}
            startDate={startDate}
            endDate={endDate}
            updateStartDate={setStartDate}
            updateEndDate={setEndDate}
            updateSearchText={setSearchText}
            updateFilterField={setFilterField}
        />
        <Row>
            <Col md={4}> The number of transactions are {transactionList.length} </Col>
            <Col md={4}> The number of filtered list are {filteredList.length} </Col>
        </Row>
        {
            filteredList.length > 0 ? 
            <Transactions 
                list={filteredList}
                updateFilteredList={setFilteredList}
                updateTransaction={updateTransaction}
                deleteTransaction={deleteTransaction}
            />
            :
            ''
        }

    </Container>
}
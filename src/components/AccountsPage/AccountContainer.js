import React, { useContext } from 'react'
import { Container, Row, Col, Button, Tabs, Tab } from 'react-bootstrap'
import ReactCSVUploadTest from 'react-csv-upload-test'
import Filter from '../Filters'
import Transactions from './Transactions'
import { AccountsContext } from '../../store/AccountContextProvider'
import { FilterContext } from '../../store/FilterContextProvider'
import { extractTags } from '../../store/__utils'
import FilteredTransactionsTaglist from './taglist/FilteredTransactionsTaglist'
import SumReport from './reports/SumReport'
import Table from '../shared/Table'

const column = [
    {
        Header: 'Category',
        accessor: 'category',
    },
    {
        Header: 'Sum',
        accessor: 'sum',
    },
]

export default function AccountContainer() {
    const {
        uploadAccountTransactionFile,
        deleteAccount,
        selectedAccount,
    } = useContext(AccountsContext)

    const { filteredList } = useContext(FilterContext)

    if (!selectedAccount) return ''
    const { name } = selectedAccount

    const { taglist, tagsMeta } = extractTags(filteredList)

    const tableData = []
    tagsMeta.forEach((v, k) =>
        tableData.push({
            category: k,
            sum: v.sum.toFixed(2),
        })
    )

    return (
        <Container>
            <Row>
                <div style={{ position: 'absolute', right: 0 }}>
                    <Button variant="dark" onClick={() => deleteAccount()}>
                        Delete Account
                    </Button>
                </div>
            </Row>

            <Filter />
            <div style={{ marginTop: '15px', marginBottom: '15px' }}>
                <Row>
                    <Col md={4}>
                        {filteredList
                            ? `The number of transactions are ${filteredList.length}`
                            : 'Select an account'}
                    </Col>
                    <Col md={7}>
                        <FilteredTransactionsTaglist
                            taglist={taglist}
                            tagsMeta={tagsMeta}
                        />
                    </Col>
                    <Col md={1}>
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
            <SumReport filteredList={filteredList || []} />
            <Tabs defaultActiveKey="report" id="uncontrolled-tab-example">
                <Tab eventKey="detail" title="Detail">
                    <Transactions />
                </Tab>
                <Tab eventKey="report" title="Report">
                    <Table list={tableData} column={column} />
                </Tab>
            </Tabs>
        </Container>
    )
}

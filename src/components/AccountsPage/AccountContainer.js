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
import { datetimeObject } from '../../__utils'

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

const button = {
    margin: '5px',
}

export default function AccountContainer() {
    const {
        uploadAccountTransactionFile,
        deleteAccount,
        selectedAccount,
    } = useContext(AccountsContext)

    const { filteredList, setEndDate, setStartDate } = useContext(FilterContext)

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

    const FY_17_18 = 'FY_17_18'
    const FY_18_19 = 'FY_18_19'
    const FY_19_20 = 'FY_19_20'
    const FY_20_21 = 'FY_20_21'

    const setPeriods = (period) => {
        switch (period) {
            case FY_17_18:
                setStartDate(
                    datetimeObject('01/07/2017 00:00:00', 'DD/MM/YYYY hh:mm:ss')
                )
                setEndDate(
                    datetimeObject('30/06/2018 23:59:59', 'DD/MM/YYYY hh:mm:ss')
                )
                break
            case FY_18_19:
                setStartDate(
                    datetimeObject('01/07/2018 00:00:00', 'DD/MM/YYYY hh:mm:ss')
                )
                setEndDate(
                    datetimeObject('30/06/2019 23:59:59', 'DD/MM/YYYY hh:mm:ss')
                )
                break
            case FY_19_20:
                setStartDate(
                    datetimeObject('01/07/2019 00:00:00', 'DD/MM/YYYY hh:mm:ss')
                )
                setEndDate(
                    datetimeObject('30/06/2020 23:59:59', 'DD/MM/YYYY hh:mm:ss')
                )
                break
            case FY_20_21:
                setStartDate(
                    datetimeObject('01/07/2020 00:00:00', 'DD/MM/YYYY hh:mm:ss')
                )
                setEndDate(
                    datetimeObject('30/06/2021 23:59:59', 'DD/MM/YYYY hh:mm:ss')
                )
                break
            default:
                console.warn('The period requested is not recognised')
        }
    }

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
            <Tabs defaultActiveKey="report">
                <Tab eventKey="detail" title="Detail">
                    <Transactions />
                </Tab>
                <Tab eventKey="report" title="Report">
                    <Row
                        style={{
                            justifyContent: 'flex-end',
                            margin: '10px',
                        }}
                    >
                        <Button
                            style={button}
                            variant="outline-info"
                            as="input"
                            type="button"
                            value="FY 17/18"
                            onClick={() => setPeriods(FY_17_18)}
                        />{' '}
                        <Button
                            style={button}
                            variant="outline-info"
                            as="input"
                            type="button"
                            value="FY 19/1"
                            onClick={() => setPeriods(FY_18_19)}
                        />{' '}
                        <Button
                            style={button}
                            variant="outline-info"
                            as="input"
                            type="button"
                            value="FY 19/20"
                            onClick={() => setPeriods(FY_19_20)}
                        />{' '}
                        <Button
                            style={button}
                            variant="outline-info"
                            as="input"
                            type="button"
                            value="FY 20/21"
                            onClick={() => setPeriods(FY_20_21)}
                        />{' '}
                    </Row>
                    <Table list={tableData} column={column} />
                </Tab>
            </Tabs>
        </Container>
    )
}

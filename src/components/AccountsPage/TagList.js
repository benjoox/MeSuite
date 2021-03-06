import React, { useState, useEffect, useContext } from 'react'
import { Container, Row, Col, Badge } from 'react-bootstrap'
import { FilterContext } from '../../store/FilterContextProvider'
import { AccountsContext } from '../../store/AccountContextProvider'

export default function Taglist() {
    const [tagList, setTaglist] = useState([])
    const { filterByTag } = useContext(FilterContext)
    const {
        selectedAccount: { name, transactions },
    } = useContext(AccountsContext)

    function extractTags() {
        if (transactions.length > 0) {
            const newTagList = [
                ...new Set(transactions.map((item) => item.category)),
            ].sort()
            setTaglist(newTagList)
        }
    }

    useEffect(extractTags, [name])

    if (name === '') return ''
    return (
        <Container>
            <div style={{ marginBottom: '15px' }}>
                <Row>
                    <Col>
                        {tagList.map((tag) => (
                            <Badge
                                onClick={() => filterByTag(tag)}
                                pill
                                variant="info"
                                key={tag}
                            >
                                {tag}
                            </Badge>
                        ))}
                    </Col>
                </Row>
            </div>
        </Container>
    )
}

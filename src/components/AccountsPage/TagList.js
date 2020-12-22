import React, { useState, useEffect, useContext } from 'react'
import { Container, Row, Col, Badge } from 'react-bootstrap'
import { FilterContext } from '../../store/FilterContextProvider'

export default function Taglist(props) {
    const { transactionList } = props
    const [tagList, setTaglist] = useState([])
    const { filterByTag } = useContext(FilterContext)

    function extractTags() {
        const newTagList = [
            ...new Set(transactionList.map((item) => item.category)),
        ].sort()
        setTaglist(newTagList)
    }

    useEffect(extractTags, [])

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

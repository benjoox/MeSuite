import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Badge } from 'react-bootstrap';

export default function Taglist(props) {
    const { transactionList } = props
    const [tagList, setTaglist] = useState([])
    useEffect(extractTags, [])

    function extractTags () {
        const tagList = transactionList.map(item => item.category)  
        setTaglist([...new Set(tagList)].sort()) 
    }

    return (
        <Container>
            <div style={{ marginBottom: '15px' }}>
                <Row>
                    <Col>
                        { tagList.map(tag => <Badge pill variant="info" key={tag} >{tag}</Badge>) }
                    </Col>
                </Row>
            </div>
        </Container>
    )
}
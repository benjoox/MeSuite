import React, { useContext } from 'react'
import { Container, Row, Col, Badge } from 'react-bootstrap'
import { FilterContext } from '../../store/FilterContextProvider'

export default function Taglist() {
    const { taglist, tagsMeta, filterByTag } = useContext(FilterContext)

    return (
        <Container>
            <div style={{ marginBottom: '15px' }}>
                <Row>
                    <Col>
                        {taglist.length > 0 &&
                            taglist.map((tag) => (
                                <Badge
                                    onClick={() => filterByTag(tag)}
                                    pill
                                    // Since we are using 'includingText' and 'category' to filter the list by tag
                                    variant={
                                        tagsMeta.has(tag) &&
                                        tagsMeta.get(tag).selected
                                            ? 'primary'
                                            : 'secondary'
                                    }
                                    key={tag}
                                >
                                    {tag}{' '}
                                    {tagsMeta.has(tag) &&
                                        tagsMeta.get(tag).count}
                                </Badge>
                            ))}
                    </Col>
                </Row>
            </div>
        </Container>
    )
}

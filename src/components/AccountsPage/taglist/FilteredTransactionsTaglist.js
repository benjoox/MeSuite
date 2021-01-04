import React from 'react'
import { Badge } from 'react-bootstrap'

export default function FilteredTransactionsTaglist({ taglist, tagsMeta }) {
    return (
        <>
            {taglist.length > 0 &&
                taglist.map((tag) => (
                    <Badge
                        pill
                        // Since we are using 'includingText' and 'category' to filter the list by tag
                        variant="info"
                        key={tag}
                    >
                        {tag} {tagsMeta.has(tag) && tagsMeta.get(tag).count}
                    </Badge>
                ))}
        </>
    )
}

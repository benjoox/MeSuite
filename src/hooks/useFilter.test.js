import React from 'react'
import { render } from '@testing-library/react'
import useFilter from './useFilter'

function setup(...args) {
    const returnVal = {}
    function TestComponent() {
        Object.assign(returnVal, useFilter(...args))
        return null
    }
    render(<TestComponent />)
    return returnVal
}
test('filter the correct including text', () => {
    const filteredList = setup({
        list: [
            {
                date: 12232131231,
                description: 'test',
                category: 'excluded',
            },
            {
                date: 12232131231,
                description: 'test_me',
                category: 'excluded',
            },
        ],
        field: 'description',
        includingText: 'es',
        excludingText: 'no',
        startDate: 12232131230,
        endDate: 12232131233,
        tags: [],
    })

    // assert initial state
    expect(filteredList[0]).toEqual({
        date: 12232131231,
        description: 'test',
        category: 'excluded',
    })
})

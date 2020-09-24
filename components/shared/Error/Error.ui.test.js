import React from 'react'
import renderer from 'react-test-renderer'
import ErrorBar from '.'

describe('Error message ', () => {
    it('renders correctly', () => {
        const tree = renderer
            .create(<ErrorBar message="this is a message" />)
            .toJSON()
        expect(tree).toMatchSnapshot()
    })
})

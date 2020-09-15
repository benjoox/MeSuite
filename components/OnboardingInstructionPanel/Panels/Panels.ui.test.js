import React from 'react'
import renderer from 'react-test-renderer'
import Panel from '.'

it('renders correctly', () => {
    const tree = renderer.create(<Panel message="this is a message" />).toJSON()
    expect(tree).toMatchSnapshot()
})

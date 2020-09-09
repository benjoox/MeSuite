import React from 'react'
import renderer from 'react-test-renderer'
import EmptyAccountNotification from '.'

it('renders correctly', () => {
    const tree = renderer
        .create(<EmptyAccountNotification message="this is a message" />)
        .toJSON()
    expect(tree).toMatchSnapshot()
})

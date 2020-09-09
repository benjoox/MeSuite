// __tests__/fetch.test.js
import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import EmptyAccountNotification from '.'

test('renders the message', async () => {
    const { getByText } = render(
        <EmptyAccountNotification message="test message" />
    )

    expect(getByText(/^test message/)).toHaveTextContent('test message')
})

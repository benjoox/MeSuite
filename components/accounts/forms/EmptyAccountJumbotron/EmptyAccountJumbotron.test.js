// __tests__/fetch.test.js
import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import AccountOfflineForm from '.'

test('renders the message and a button', async () => {
    const testMessage = 'This is a test message'
    const { getByText } = render(<AccountOfflineForm message={testMessage} />)

    expect(getByText(testMessage)).toHaveTextContent(testMessage)
    expect(getByText(/^Upload Transactions/)).toHaveTextContent(
        'Upload Transactions'
    )
})

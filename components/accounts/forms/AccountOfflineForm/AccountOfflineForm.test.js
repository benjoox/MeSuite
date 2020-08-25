// __tests__/fetch.test.js
import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import AccountOfflineForm from '.'

test('renders the message and a button', async () => {
    const { getByText } = render(<AccountOfflineForm />)

    expect(
        getByText(
            /^In the offline mode you can upload a CSV file and analyse your account without saving any data/
        )
    ).toHaveTextContent(
        'In the offline mode you can upload a CSV file and analyse your account without saving any data'
    )
    expect(getByText(/^Upload Transactions/)).toHaveTextContent(
        'Upload Transactions'
    )
})

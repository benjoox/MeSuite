// __tests__/fetch.test.js
import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import TinyInstructionPanel from '.'

test('renders the message', async () => {
    const { getByText } = render(
        <TinyInstructionPanel message="test message" />
    )

    expect(getByText(/^test message/)).toHaveTextContent('test message')
})

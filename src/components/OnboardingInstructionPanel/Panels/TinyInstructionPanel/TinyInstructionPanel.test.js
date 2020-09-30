import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import ReactCSVUploadTest from 'react-csv-upload-test'
import TinyInstructionPanel from '.'

describe('Tiny Instruction panel ', () => {
    it('renders correctly', () => {
        const { getByText } = render(
            <TinyInstructionPanel message="this is a message">
                <ReactCSVUploadTest />
            </TinyInstructionPanel>
        )

        const textMessage = getByText(/^this is a message/)
        expect(textMessage.innerHTML).toBe('this is a message')
    })
})

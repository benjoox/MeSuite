import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import ReactCSVUploadTest from 'react-csv-upload-test'
import JumboInstructionPanel from '.'

describe('Jumbo Instruction panel ', () => {
    it('renders correctly', () => {
        const { getByText } = render(
            <JumboInstructionPanel message="this is a message">
                <ReactCSVUploadTest />
            </JumboInstructionPanel>
        )

        const textMessage = getByText(/^this is a message/)
        expect(textMessage.innerHTML).toBe('this is a message')
    })
})

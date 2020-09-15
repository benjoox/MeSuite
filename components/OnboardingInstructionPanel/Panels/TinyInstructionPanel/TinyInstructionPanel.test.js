import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import TinyInstructionPanel from '.'
import UploadButton from '../../../shared/UploadButton'

describe('Tiny Instruction panel ', () => {
    beforeEach(() => {
        UploadButton.mockReturnValue(<div>Nothing</div>)
    })
})
it('renders correctly', () => {
    const { getByText } = render(
        <TinyInstructionPanel message="this is a message">
            <UploadButton />
        </TinyInstructionPanel>
    )

    const textMessage = getByText(/^this is a message/)

    expect(textMessage.innerHTML).toBe('this is a message')
})

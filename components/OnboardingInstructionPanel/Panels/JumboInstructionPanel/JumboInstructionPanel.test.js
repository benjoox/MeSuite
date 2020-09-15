import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import JumboInstructionPanel from '.'
import UploadButton from '../../../shared/UploadButton'

describe('Jumbo Instruction panel ', () => {
    beforeEach(() => {
        UploadButton.mockReturnValue(<div>Nothing</div>)
    })
})
it('renders correctly', () => {
    const { getByText } = render(
        <JumboInstructionPanel message="this is a message">
            <UploadButton />
        </JumboInstructionPanel>
    )

    const textMessage = getByText(/^this is a message/)
    expect(textMessage.innerHTML).toEqual('this is a message')
})

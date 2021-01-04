import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Taglist from '../taglist/MainTaglist'
import { FilterContext } from '../../../store/FilterContextProvider'

jest.mock('../../../store/FilterContextProvider')

const filterByTag = jest.fn(() => {})
const setup = (taglist, tagsMeta) =>
    render(
        <FilterContext.Provider
            value={{
                taglist,
                tagsMeta,
                filterByTag,
            }}
        >
            <Taglist />
        </FilterContext.Provider>
    )

describe('TagList', () => {
    expect.assertions(1)
    it('should render all the tags', () => {
        const taglist = [
            'tag 1',
            'tag 2',
            'tag 3',
            'tag 4',
            'tag 5',
            'tag 6',
            'tag 7',
            'tag 8',
        ]
        const tagsMeta = new Map()
        tagsMeta.set('tag 1', { count: 3, selected: false })
        tagsMeta.set('tag 2', { count: 2, selected: true })
        tagsMeta.set('tag 3', { count: 3, selected: false })
        tagsMeta.set('tag 4 ', { count: 2, selected: false })
        tagsMeta.set('tag 5', { count: 3, selected: false })
        tagsMeta.set('tag 6', { count: 2, selected: false })
        tagsMeta.set('tag 7', { count: 3, selected: false })
        tagsMeta.set('tag 8', { count: 2, selected: false })
        const { container } = setup(taglist, tagsMeta)

        expect(container.querySelectorAll('span').length).toBe(8)
    })
    it('should render nothing if the filteredList is empty', () => {
        expect.assertions(1)
        const { container } = setup([], new Map())
        expect(container.querySelectorAll('span').length).toBe(0)
    })
    it('should call the filterByTag function on click', () => {
        expect.assertions(1)
        const taglist = ['tag 1', 'tag 2']
        const tagsMeta = new Map()
        tagsMeta.set('tag 1', { count: 3, selected: false })
        tagsMeta.set('tag 2', { count: 2, selected: true })

        const { getByText } = setup(taglist, tagsMeta)
        fireEvent.click(getByText(/tag 1/g))
        expect(filterByTag).toHaveBeenCalledWith('tag 1')
    })
})

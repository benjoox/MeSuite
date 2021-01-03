// @flow

import React, { useState, createContext } from 'react'
import { today } from '../__utils'

export const FilterContext = createContext('FilterContext')

type TransactionDTO = {
    name: string,
    transactions: string[],
}

type IProps = {
    primaryList: TransactionDTO,
    children: any,
}

export default function useFilter({ children, primaryList }: IProps) {
    const [filterField, setFilterField] = useState('')
    const [includingText, setIncludingText] = useState('')
    const [excludingText, setExcludingText] = useState('')
    const [startDate, setStartDate] = useState(today)
    const [endDate, setEndDate] = useState(today)
    const [sortBy, setSortBy] = useState('date')
    /** date is timestamp */
    const isDateIncluded = (date) =>
        startDate.unix() <= parseInt(date, 10) &&
        parseInt(date, 10) <= endDate.unix()

    const filteredByDate = () => {
        if (primaryList.name === '') return []
        return primaryList.transactions.filter(({ timestamp }) =>
            isDateIncluded(timestamp)
        )
    }

    const isTextIncluded = (text = '') =>
        text.toString().toLowerCase().includes(includingText.toLowerCase())

    const isTextExcluded = (text = '') =>
        !text.toString().toLowerCase().includes(excludingText.toLowerCase())

    function filterList() {
        return filteredByDate().filter((transaction) => {
            if (filterField === '') return true

            return (
                (includingText === '' ||
                    isTextIncluded(transaction[filterField])) &&
                (excludingText === '' ||
                    isTextExcluded(transaction[filterField]))
            )
        })
    }

    function filterByTag(tag) {
        setFilterField('category')
        setIncludingText(tag)
    }
    function sortList(list) {
        return list.sort((a, b) => {
            if (sortBy === 'amount') {
                const parsedA = parseInt(a[sortBy], 10)
                const parsedB = parseInt(b[sortBy], 10)
                if (parsedA > parsedB) return -1
                if (parsedB > parsedA) return 1
            } else {
                if (a[sortBy] > b[sortBy]) return -1
                if (b[sortBy] > a[sortBy]) return 1
            }

            return 0
        })
    }

    function sort(param) {
        setSortBy(param)
    }
    function extractTags() {
        const tagsMeta = new Map()
        const { transactions } = primaryList
        if (transactions.length > 0) {
            const taglist = [
                ...new Set(
                    transactions.map((item) => {
                        const itemCategory = item.category || 'unknown'

                        if (tagsMeta.has(itemCategory)) {
                            const meta = tagsMeta.get(itemCategory)
                            tagsMeta.set(itemCategory, {
                                count: meta.count + 1,
                                selected: itemCategory.includes(includingText),
                            })
                        } else {
                            tagsMeta.set(itemCategory, {
                                count: 1,
                                selected: itemCategory.includes(includingText),
                            })
                        }
                        return itemCategory
                    })
                ),
            ].sort((a, b) => {
                if (tagsMeta.get(a).count > tagsMeta.get(b).count) return -1
                if (tagsMeta.get(b).count > tagsMeta.get(a).count) return 1
                return 0
            })

            return { taglist, tagsMeta }
        }
        return { taglist: [], tagsMeta }
    }

    let filteredList = filterList()
    filteredList = sortList(filteredList)
    const { taglist, tagsMeta } = extractTags()

    const value = {
        filteredList,
        filterField,
        includingText,
        excludingText,
        startDate,
        endDate,
        setFilterField,
        setIncludingText,
        setExcludingText,
        setStartDate,
        setEndDate,
        taglist,
        tagsMeta,
        filterByTag,
        sort,
    }
    return (
        <FilterContext.Provider value={value}>
            {children}
        </FilterContext.Provider>
    )
}

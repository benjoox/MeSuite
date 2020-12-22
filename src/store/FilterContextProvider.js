// @flow

import React, { useEffect, useState, createContext } from 'react'
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
    const [filteredList, setFilteredList] = useState([])
    const [filterField, setFilterField] = useState('')
    const [includingText, setIncludingText] = useState('')
    const [excludingText, setExcludingText] = useState('')
    const [startDate, setStartDate] = useState(today)
    const [endDate, setEndDate] = useState(today)
    const [filterTags, setFilterTags] = useState([])
    /** date is timestamp */
    const isDateIncluded = (date) => {
        const startDateTimestamp = startDate.unix()
        const endDateTimestamp = endDate.unix()
        return startDateTimestamp <= date && date <= endDateTimestamp
    }

    const filteredByDate = () => {
        if (primaryList.name === '') return []
        return primaryList.transactions.filter(({ timestamp }) =>
            isDateIncluded(timestamp)
        )
    }

    const isTextIncluded = (text) =>
        text.toString().toLowerCase().includes(includingText.toLowerCase())

    const isTextExcluded = (text) =>
        !text.toString().toLowerCase().includes(excludingText.toLowerCase())

    function filterList() {
        const updatedFilterList = filteredByDate().filter((transaction) => {
            if (filterField === '') return true

            const hasAllsTags =
                filterTags.length < 1 ||
                filterTags.includes(transaction.category)

            return (
                (includingText === '' ||
                    isTextIncluded(transaction[filterField])) &&
                (excludingText === '' ||
                    isTextExcluded(transaction[filterField])) &&
                hasAllsTags
            )
        })
        setFilteredList(updatedFilterList)
    }

    function filterByTag(tag) {
        setFilterTags(filterTags.push(tag))
    }
    useEffect(filterList, [
        primaryList,
        filterField,
        includingText,
        excludingText,
        startDate,
        endDate,
        filterTags,
    ])

    const value = {
        filteredList,
        filterField,
        includingText,
        excludingText,
        startDate,
        endDate,
        setFilteredList,
        setFilterField,
        setIncludingText,
        setExcludingText,
        setStartDate,
        setEndDate,
        filterByTag,
    }
    return (
        <FilterContext.Provider value={value}>
            {children}
        </FilterContext.Provider>
    )
}

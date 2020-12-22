// @flow

import { useState, useEffect } from 'react'

type PropsDTO = {
    list: Array<any>, // array of object of any shape
    column: string,
    field: string, // the field to be apply the filters
    includingText: string,
    excludingText: string,
    startDate: string,
    endDate: string,
    tags: Array<string>,
}

export default function useFilterTable({
    list,
    field,
    includingText,
    excludingText,
    startDate,
    endDate,
    tags,
}: PropsDTO) {
    const [filteredList, setFilteredList] = useState([])
    /** date is timestamp */
    /*
    TODO: to be implemented

    const isDateIncluded = (date) => {
        const startDateTimestamp = startDate.unix()
        const endDateTimestamp = endDate.unix()
        return startDateTimestamp <= date && date <= endDateTimestamp
    }
    */

    // take a list of object with a textIncluded field and a text
    // return a sub array of given object where the textIncluded field includes the text
    const isTextIncluded = (filterItem) =>
        !includingText ||
        includingText === '' ||
        filterItem
            .toString()
            .toLowerCase()
            .includes(includingText.toLowerCase())

    const containsTheExcludedText = (text) =>
        excludingText &&
        excludingText !== '' &&
        text.toString().toLowerCase().includes(excludingText.toLowerCase())

    const hasTag = (tag) => tags.length === 0 || tags.includes(tag)

    useEffect(() => {
        const TAG_FIELD = 'category'
        const finalList: Array<Object> = list
            .filter((item) => isTextIncluded(item[field]))
            .filter((item) => !containsTheExcludedText(item[field]))
            .filter((item) => hasTag(item[TAG_FIELD]))

        setFilteredList(finalList)
    }, [field, includingText, excludingText, startDate, endDate, tags])

    return filteredList
}

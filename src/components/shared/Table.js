/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import styled from 'styled-components'
import { useTable, usePagination, useFilters } from 'react-table'

const Styles = styled.div`
    padding: 1rem;

    table {
        border-spacing: 0;
        border: 1px solid black;

        tr {
            :last-child {
                td {
                    border-bottom: 0;
                }
            }
        }

        th,
        td {
            margin: 0;
            padding: 0.5rem;
            border-bottom: 1px solid black;
            border-right: 1px solid black;

            :last-child {
                border-right: 0;
            }
        }

        td {
            input {
                font-size: 1rem;
                padding: 0;
                margin: 0;
                border: 0;
            }
        }
    }

    .pagination {
        padding: 0.5rem;
    }
`
// Be sure to pass our updateMyData and the skipReset option
function Table({ columns, data }) {
    // Use the state and functions returned from useTable to build your UI
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page, // Instead of using 'rows', we'll use page,
        // which has only the rows for the active page

        // The rest of these things are super handy, too ;)
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns,
            data,
        },
        useFilters,
        usePagination
    )

    // Render the UI for your table
    return (
        <>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()}>
                                    <div>
                                        <span>{column.render('Header')}</span>
                                    </div>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return (
                                        <td {...cell.getCellProps()}>
                                            {cell.isAggregated
                                                ? // If the cell is aggregated, use the Aggregated
                                                  // renderer for cell
                                                  cell.render('Aggregated')
                                                : cell.isPlaceholder
                                                ? null // For cells with repeated values, render null
                                                : // Otherwise, just render the regular cell
                                                  cell.render('Cell')}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            {/*
        Pagination can be built however you'd like.
        This is just a very basic UI implementation:
      */}
            <div className="pagination">
                <button
                    type="button"
                    onClick={() => gotoPage(0)}
                    disabled={!canPreviousPage}
                >
                    {'<<'}
                </button>{' '}
                <button
                    type="button"
                    onClick={() => previousPage()}
                    disabled={!canPreviousPage}
                >
                    {'<'}
                </button>{' '}
                <button
                    type="button"
                    onClick={() => nextPage()}
                    disabled={!canNextPage}
                >
                    {'>'}
                </button>{' '}
                <button
                    type="button"
                    onClick={() => gotoPage(pageCount - 1)}
                    disabled={!canNextPage}
                >
                    {'>>'}
                </button>{' '}
                <span>
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{' '}
                </span>
                <span>
                    | Go to page:{' '}
                    <input
                        type="number"
                        defaultValue={pageIndex + 1}
                        onChange={(e) => {
                            gotoPage(
                                e.target.value ? Number(e.target.value) - 1 : 0
                            )
                        }}
                        style={{ width: '100px' }}
                    />
                </span>{' '}
                <select
                    type="select"
                    value={pageSize}
                    onBlur={(e) => {
                        setPageSize(Number(e.target.value))
                    }}
                    onChange={() => console.log('To Be Implemented')}
                >
                    {[10, 20, 30, 40, 50].map((size) => (
                        <option key={size} value={size}>
                            Show {size}
                        </option>
                    ))}
                </select>
            </div>
        </>
    )
}

function ReactTable(props) {
    const columns = React.useMemo(() => props.column, [])

    const [data, setData] = React.useState([])

    const { list } = props
    React.useEffect(() => {
        setData(props.list)
    }, [list])

    return (
        <Styles>
            <Table columns={columns} data={data} />
        </Styles>
    )
}

export default ReactTable

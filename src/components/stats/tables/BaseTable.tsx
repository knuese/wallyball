import { FC } from 'react'
import { useTable, useSortBy } from 'react-table'
import { Column } from './columns'

type BaseTableProps = {
  columns: Column[]
  data: Record<string, any>[]
  className?: string
}

export const BaseTable: FC<BaseTableProps> = ({ columns, data, className }) => {
  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows } =
    useTable({ columns, data }, useSortBy)

  return (
    <table {...getTableProps()} className={className}>
      <thead>
        {headerGroups.map((hg) => (
          <tr {...hg.getHeaderGroupProps()}>
            {hg.headers.map((col: any) => (
              <th {...col.getHeaderProps((col as any).getSortByToggleProps())}>
                {col.render('header')}
                {col.isSorted && (col.isSortedDesc ? '▼' : '▲')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              ))}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default BaseTable

import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useTable, useSortBy } from 'react-table'
import { RootState } from '../../../store/reducers'
import {
  calculateAvg,
  calculateObp,
  calculateOps,
  calculateSlg
} from '../../../util'
import getColumns from './columns'

export const IndividualTable = () => {
  const stats = useSelector((state: RootState) => state.stats)

  const columns = useMemo(() => getColumns(), []) as any
  const tableData = useMemo(
    () =>
      stats
        ? Object.entries(stats).map(([id, { name, team, games, batting }]) => {
            const obp = calculateObp(batting)
            const slg = calculateSlg(batting)
            return {
              id,
              name,
              team,
              games,
              ...batting,
              avg: calculateAvg(batting),
              obp,
              slg,
              ops: calculateOps({ obp, slg })
            }
          })
        : [],
    [stats]
  )

  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows } =
    useTable({ columns, data: tableData }, useSortBy)

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((hg) => (
          <tr {...hg.getHeaderGroupProps()}>
            {hg.headers.map((col) => (
              <th {...col.getHeaderProps((col as any).getSortByToggleProps())}>
                {col.render('header')}
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

export default IndividualTable

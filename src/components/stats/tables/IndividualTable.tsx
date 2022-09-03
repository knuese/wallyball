import { FC, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { BaseTable } from '.'
import { RootState } from '../../../store/reducers'
import { getIndividualColumns } from './columns'
import {
  calculateAvg,
  calculateObp,
  calculateOps,
  calculateSlg
} from '../../../util'

export const IndividualTable: FC = () => {
  const { individual: stats } = useSelector((state: RootState) => state.stats)

  const columns = useMemo(() => getIndividualColumns(), []) as any
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

  return <BaseTable columns={columns} data={tableData} className='individual-table' />
}

export default IndividualTable

import { FC, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/reducers'
import { BaseTable } from '.'
import { getStandingsColumns } from './columns'

export const StandingsTable: FC = () => {
  const { standings } = useSelector((state: RootState) => state.stats)

  const columns = useMemo(() => getStandingsColumns(), []) as any
  const tableData = useMemo(
    () =>
      standings
        ? Object.entries(standings).map(([team, { wins, losses }]) => ({
            team,
            wins,
            losses,
            gamesBack: 0,
            winPercentage: '.000'
          }))
        : [],
    [standings]
  )

  return (
    <BaseTable columns={columns} data={tableData} className="standings-table" />
  )
}

export default StandingsTable

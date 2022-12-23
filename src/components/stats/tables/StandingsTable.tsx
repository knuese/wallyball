import { FC, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { chain } from 'lodash'
import { RootState } from '../../../store/reducers'
import { BaseTable } from '.'
import { getStandingsColumns } from './columns'
import { calculateGamesBehind, calculateWinPct } from '../../../util'

export const StandingsTable: FC = () => {
  const { standings } = useSelector((state: RootState) => state.stats)

  const columns = useMemo(() => getStandingsColumns(), []) as any
  const tableData = useMemo(() => {
    if (!standings) {
      return []
    }

    // figure out the team with the best win-to-loss differentials
    const leadTeam = chain(standings)
      .values()
      .orderBy(({ wins, losses }) => wins - losses, 'desc')
      .value()[0]

    return chain(standings)
      .entries()
      .map(([teamName, record]) => ({
        ...record,
        team: teamName,
        gamesBehind: calculateGamesBehind(leadTeam, record),
        winPercentage: calculateWinPct(record)
      }))
      .orderBy(
        [
          ({ gamesBehind }) => Number(gamesBehind.replace('½', '.5')),
          ({ winPercentage }) => Number(winPercentage)
        ],
        ['asc', 'desc']
      )
      .value()
  }, [standings])

  return (
    <BaseTable columns={columns} data={tableData} className="standings-table" />
  )
}

export default StandingsTable

import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { chain } from 'lodash'
import hash from 'object-hash'
import { BaseTable } from '.'
import { RootState } from '../../../store/reducers'
import { getTeamColumns } from './columns'
import { aggregateTeamStats } from '../../../util'

export const TeamTable = () => {
  const { individual: stats } = useSelector((state: RootState) => state.stats)

  const columns = getTeamColumns()
  const tableData = useMemo(
    () =>
      chain(stats)
        .values()
        .groupBy('team')
        .reduce<Array<any>>(
          (acc, players) => [
            ...acc,
            {
              name: players[0].team,
              games: players[0].games,
              ...aggregateTeamStats(players)
            }
          ],
          []
        )
        .value(),
    [hash(stats)]
  )

  return <BaseTable columns={columns} data={tableData} className="team-table" />
}

export default TeamTable

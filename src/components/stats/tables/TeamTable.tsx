import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { chain } from 'lodash'
import hash from 'object-hash'
import { RootState } from '../../../store/reducers'
import { getTeamColumns } from './columns'
import {
  calculateAvg,
  calculateObp,
  calculateOps,
  calculateSlg
} from '../../../util'
import BaseTable from './BaseTable'

const statBase = {
  plateAppearances: 0,
  atBats: 0,
  runs: 0,
  hits: 0,
  doubles: 0,
  triples: 0,
  homeRuns: 0,
  rbis: 0,
  walks: 0,
  hbps: 0,
  strikeouts: 0
}

export const TeamTable = () => {
  const { individual: stats } = useSelector((state: RootState) => state.stats)

  const columns = getTeamColumns()
  const tableData = useMemo(
    () =>
      chain(stats)
        .values()
        .groupBy('team')
        .reduce<Array<any>>((acc, teamStats) => {
          const combined = teamStats.reduce(
            (acc, { batting: cur }) => ({
              plateAppearances: acc.plateAppearances + cur.plateAppearances,
              atBats: acc.atBats + cur.atBats,
              runs: acc.runs + cur.runs,
              hits: acc.hits + cur.hits,
              doubles: acc.doubles + cur.doubles,
              triples: acc.triples + cur.triples,
              homeRuns: acc.homeRuns + cur.homeRuns,
              rbis: acc.rbis + cur.rbis,
              walks: acc.walks + cur.walks,
              hbps: 0,
              strikeouts: acc.strikeouts + cur.strikeouts
            }),
            { ...statBase }
          )

          const obp = calculateObp(combined)
          const slg = calculateSlg(combined)

          return [
            ...acc,
            {
              name: teamStats[0].team,
              games: teamStats[0].games,
              ...combined,
              avg: calculateAvg(combined),
              obp,
              slg,
              ops: calculateOps({ obp, slg })
            }
          ]
        }, [])
        .value(),
    [hash(stats)]
  )

  return <BaseTable columns={columns} data={tableData} className="team-table" />
}

export default TeamTable

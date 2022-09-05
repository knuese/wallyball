import { Player } from '../model'
import { PlayerStats } from '../store/types/stats'

export const getAverage = (player: Player): string => {
  const { batting: gameBatting } = player.getGameStats()
  const { batting: seasonBatting } = player.getSeasonStats()

  return calculateAvg({
    atBats: gameBatting.atBats + seasonBatting.atBats,
    hits: gameBatting.hits + seasonBatting.hits
  })
}

const sliced = (x: number): string => x.toFixed(3).slice(x < 1 ? 1 : 0)

export const calculateAvg = ({
  atBats,
  hits
}: {
  atBats: number
  hits: number
}): string => {
  if (atBats > 0) {
    const avg = hits / atBats
    return sliced(avg)
  } else {
    return '.000'
  }
}

export const calculateObp = ({
  plateAppearances,
  hits,
  walks,
  hbps
}: {
  plateAppearances: number
  hits: number
  walks: number
  hbps: number
}): string => {
  if (plateAppearances > 0) {
    const obp = (hits + walks + hbps) / plateAppearances
    return sliced(obp)
  } else {
    return '.000'
  }
}

export const calculateSlg = ({
  atBats,
  hits,
  doubles,
  triples,
  homeRuns
}: {
  atBats: number
  hits: number
  doubles: number
  triples: number
  homeRuns: number
}): string => {
  if (atBats > 0) {
    const singles = hits - doubles - triples - homeRuns
    const slg = (singles + 2 * doubles + 3 * triples + 4 * homeRuns) / atBats
    return sliced(slg)
  } else {
    return '.000'
  }
}

export const calculateOps = ({
  obp,
  slg
}: {
  obp: string
  slg: string
}): string => sliced(Number(obp) + Number(slg))

export const aggregateTeamStats = (players: PlayerStats[]) => {
  const combined = players.reduce(
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
    {
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
  )

  const obp = calculateObp(combined)
  const slg = calculateSlg(combined)

  return {
    ...combined,
    obp,
    slg,
    ops: calculateOps({ obp, slg })
  }
}

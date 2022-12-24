import { Player } from '../model'
import { PlayerStats } from '../store/types/stats'

const sliced = (x: number, precision: number): string =>
  x.toFixed(precision).slice(x < 1 ? 1 : 0)

export const calculateWinPct = ({
  wins,
  losses
}: {
  wins: number
  losses: number
}): string => {
  if (wins === 0) {
    return '.000'
  } else {
    return sliced(wins / (wins + losses), 3)
  }
}

export const calculateGamesBehind = (
  leadTeam: { wins: number; losses: number },
  teamToCalc: { wins: number; losses: number }
): string => {
  const diff =
    leadTeam.wins - teamToCalc.wins + (teamToCalc.losses - leadTeam.losses)
  return `${diff / 2}`.replace(/(?:^0)?.5$/, '½')
}

export const calculateAvg = ({
  atBats,
  hits
}: {
  atBats: number
  hits: number
}): string => {
  if (atBats > 0) {
    const avg = hits / atBats
    return sliced(avg, 3)
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
    return sliced(obp, 3)
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
    return sliced(slg, 3)
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
}): string => sliced(Number(obp) + Number(slg), 3)

export const inningsPitchedToNumber = (ip: string): number => {
  const [innings, outs] = ip.split('.')
  return Number(innings) + Number(outs) * (1 / 3)
}

export const addInningsPitched = (one: string, two: string): string => {
  const [oneInnings, oneOuts] = one.split('.')
  const [twoInnings, twoOuts] = two.split('.')

  let total = Number(oneInnings) + Number(twoInnings)
  let remainingOuts = Number(oneOuts) + Number(twoOuts)

  if (remainingOuts >= 3) {
    total++
    remainingOuts -= 3
  }

  return `${total}.${remainingOuts}`
}

export const calculateERA = ({
  earnedRuns,
  inningsPitched
}: {
  earnedRuns: number
  inningsPitched: number
}): string => {
  if (earnedRuns === 0) {
    return '0.00'
  } else if (inningsPitched === 0) {
    return 'INF'
  }

  const era = (earnedRuns * 9) / inningsPitched
  return sliced(era, 2)
}

export const getAverage = (player: Player): string => {
  const { batting: gameBatting } = player.getGameStats()
  const { batting: seasonBatting } = player.getSeasonStats()

  return calculateAvg({
    atBats: gameBatting.atBats + seasonBatting.atBats,
    hits: gameBatting.hits + seasonBatting.hits
  })
}

export const getERA = (player: Player): string => {
  const { pitching: gamePitching } = player.getGameStats()
  const { pitching: seasonPitching } = player.getSeasonStats()

  return calculateERA({
    earnedRuns: gamePitching.earnedRuns + seasonPitching.earnedRuns,
    inningsPitched: inningsPitchedToNumber(
      addInningsPitched(
        gamePitching.inningsPitched,
        seasonPitching.inningsPitched
      )
    )
  })
}

export const aggregateTeamStats = (
  players: PlayerStats[]
): Record<string, string | number> => {
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

  const avg = calculateAvg(combined)
  const obp = calculateObp(combined)
  const slg = calculateSlg(combined)

  return {
    ...combined,
    avg,
    obp,
    slg,
    ops: calculateOps({ obp, slg })
  }
}

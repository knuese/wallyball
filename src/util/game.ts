import { Team } from '../model'

export const getOrdinal = (n: number) =>
  ['', 'st', 'nd', 'rd'][(n / 10) % 10 ^ 1 && n % 10] || 'th'

export const getTotalScore = (innings: number[]): number =>
  innings.reduce((acc, cur) => acc + cur, 0)

export const getNumHits = (team: Team): number =>
  Object.values(team.players).reduce(
    (acc, cur) => acc + cur.getGameStats().batting.hits,
    0
  )

export const isOver = ({
  inning,
  isBottom,
  outs,
  awayScore,
  homeScore
}: {
  inning: number
  isBottom: boolean
  outs: number
  awayScore: number
  homeScore: number
}): boolean => {
  const homeTeamWon = (isBottom || outs === 3) && homeScore > awayScore
  const awayTeamWon = isBottom && outs === 3 && awayScore > homeScore
  return inning >= 9 && (homeTeamWon || awayTeamWon)
}

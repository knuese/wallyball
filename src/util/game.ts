import { Player, Team } from '../model'
import { ScoreArray } from '../store/types/game'

export const calcOffset = (batter: Player, pitcher: Player): number => {
  const starAdjustment =
    batter.attributes.battingStarPower - pitcher.attributes.pitchingStarPower
  const pitcherFatigue = pitcher.attributes.fatigue(
    Number(pitcher.getGameStats().pitching.inningsPitched)
  )
  return (starAdjustment + pitcherFatigue) / 100
}

export const getOrdinal = (n: number) =>
  ['', 'st', 'nd', 'rd'][(n / 10) % 10 ^ 1 && n % 10] || 'th'

export const getTotalScore = (scores: ScoreArray): number =>
  scores.reduce<number>(
    (acc, cur) => (typeof cur === 'number' ? acc + cur : acc),
    0
  )

export const getNumHits = (team: Team): number =>
  team
    .getRoster()
    .reduce((acc, cur) => acc + cur.getGameStats().batting.hits, 0)

export const incrementInningsPitched = (
  old: string,
  outsRecorded: number
): string => {
  const [innings, outs] = old.split('.')
  const newOuts = Number(outs) + outsRecorded

  return newOuts > 2 ? `${Number(innings) + 1}.0` : `${innings}.${newOuts}`
}

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

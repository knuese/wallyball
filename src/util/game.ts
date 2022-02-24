export const getTotalScore = (innings: number[]): number =>
  innings.reduce((acc, cur) => acc + cur, 0)

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

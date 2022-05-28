import { Player } from '../model'

export const getAverage = (player: Player): string => {
  const { batting: gameBatting } = player.getGameStats()
  const { batting: seasonBatting } = player.getSeasonStats()

  const atBats = gameBatting.atBats + seasonBatting.atBats
  const hits = gameBatting.hits + seasonBatting.hits

  if (atBats > 0) {
    const avg = hits / atBats
    return avg.toFixed(3).slice(avg < 1 ? 1 : 0)
  } else {
    return '.000'
  }
}

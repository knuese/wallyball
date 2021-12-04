import { Game, Outcome, Team } from '../model'

export class GameService {
  gameState: Game

  constructor(awayTeam: Team, homeTeam: Team) {
    this.gameState = new Game(awayTeam, homeTeam)
  }

  simulateAtBat(): boolean {
    const batter = this.gameState.getCurrentBatter()
    const pitcher = this.gameState.getCurrentPitcher()

    const useBatterStats = Math.random() < 0.4
    const { outcome, rawValue } = useBatterStats ? batter.bat() : pitcher.pitch()

    console.log(`${batter.name} -> ${outcome}`)

    let runsScored = 0
    if (outcome === Outcome.STRIKEOUT) {
      this.gameState.outs++
    } else {
      runsScored = this.gameState.advanceRunners({
        batter,
        pitcher,
        outcome,
        rawValue,
        useBatterStats
      })
    }

    batter.logAtBat(outcome, runsScored)

    const isOver = this.gameState.isGameOver()

    if (!isOver && this.gameState.outs === 3) {
      console.log('three outs, changing sides\n')
      this.gameState.progressInning()
    }

    return isOver
  }
}

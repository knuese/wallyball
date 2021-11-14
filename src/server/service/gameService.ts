import { Game, Outcome, Team } from '../model'

export class GameService {
  gameState: Game

  constructor(awayTeam: Team, homeTeam: Team) {
    this.gameState = new Game(awayTeam, homeTeam)
  }

  simulateAtBat(): boolean {
    const batter = this.gameState.getCurrentBatter()
    const pitcher = this.gameState.getCurrentPitcher()
    const outcome = Math.random() < 0.4 ? batter.bat() : pitcher.pitch()

    console.log(`${batter.name} -> ${outcome}`)

    if (outcome === Outcome.STRIKEOUT) {
      this.gameState.outs++
    } else {
      this.gameState.advanceRunners(outcome)
    }

    const isOver = this.gameState.isGameOver()

    if (!isOver && this.gameState.outs === 3) {
      console.log('three outs, changing sides\n')
      this.gameState.progressInning()
    }

    return isOver
  }
}

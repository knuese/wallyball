import { Bases } from '.'
import { Outcome, Player, Team } from '..'

const getOrdinal = (n: number) => [,'st','nd','rd'][n/10%10^1&&n%10]||'th'

export class Game {
  awayTeam: Team
  homeTeam: Team
  inning: number
  bases: Bases
  isBottom: boolean
  outs: number
  score: { away: number; home: number }

  constructor(awayTeam: Team, homeTeam: Team) {
    this.awayTeam = awayTeam
    this.homeTeam = homeTeam

    this.inning = 1
    this.isBottom = false
    this.outs = 0
    this.score = { away: 0, home: 0 }
    this.bases = new Bases()
  }

  getCurrentBatter(): Player {
    return this.isBottom
      ? this.homeTeam.nextBatter()
      : this.awayTeam.nextBatter()
  }

  getCurrentPitcher(): Player {
    return this.isBottom ? this.awayTeam.defense.P : this.homeTeam.defense.P
  }

  progressInning(): void {
    if (this.isBottom) {
      this.inning++
    }

    this.outs = 0
    this.isBottom = !this.isBottom
    this.bases.clear()

    const inningStr = `${this.inning}${getOrdinal(this.inning)}`
    console.log(
      `starting the ${this.isBottom ? 'bottom' : 'top'} of the ${inningStr}`
    )
  }

  isGameOver(): boolean {
    const homeTeamWon =
      (this.isBottom || this.outs === 3) && this.score.home > this.score.away
    const awayTeamWon =
      this.isBottom && this.outs === 3 && this.score.away > this.score.home

    const isOver = this.inning >= 9 && (homeTeamWon || awayTeamWon)

    if (isOver) {
      console.log(`
      Final score:
        ${this.awayTeam.name} ${this.score.away}
        ${this.homeTeam.name} ${this.score.home}
      `)
    }

    return isOver
  }

  addToScore(runs: number): void {
    if (this.isBottom) {
      this.score.home += runs
    } else {
      this.score.away += runs
    }

    console.log(`
      Updated score:
        ${this.awayTeam.name} ${this.score.away}
        ${this.homeTeam.name} ${this.score.home}
    `)
  }

  advanceRunners(outcome: Outcome): number {
    const { runsScored, outs } = this.bases.advanceRunners(outcome, this.outs)

    if (runsScored > 0) {
      this.addToScore(runsScored)
    }

    this.outs += outs

    return runsScored
  }
}

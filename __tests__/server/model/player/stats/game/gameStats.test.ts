import { GameStats, Outcome } from '../../../../../../src/server/model'

describe('gameStats', () => {
  let gameStats: GameStats

  beforeEach(() => {
    gameStats = new GameStats()
  })

  it('logs a single', () => {
    gameStats.logAtBat(Outcome.SINGLE, 0)
    expect(gameStats.batting.atBats).toEqual(1)
    expect(gameStats.batting.hits).toEqual(1)
  })

  it.each([
    [Outcome.DOUBLE, 'doubles', 1],
    [Outcome.TRIPLE, 'triples', 3],
    [Outcome.HOME_RUN, 'homeRuns', 4]
  ])('logs "%s" as a hit', (outcome, statKey, runsScored) => {
    gameStats.logAtBat(outcome, runsScored)

    expect(gameStats.batting.atBats).toEqual(1)
    expect(gameStats.batting.hits).toEqual(1)
    expect(gameStats.batting.rbis).toEqual(runsScored)
    expect(gameStats.batting[statKey]).toEqual(1)
  })

  it.each([
    [Outcome.WALK, 0, 'walks'],
    [Outcome.HIT_BY_PITCH, 0, 'hbps'],
    [Outcome.STRIKEOUT, 1, 'strikeouts'],
    [Outcome.FLY, 1, 'flies'],
    [Outcome.GROUNDER, 1, 'grounders']
  ])('logs "%s" as a non-hit', (outcome, atBats, statKey) => {
    gameStats.logAtBat(outcome, 0)
    expect(gameStats.batting.atBats).toEqual(atBats)
    expect(gameStats.batting[statKey]).toEqual(1)
  })
})

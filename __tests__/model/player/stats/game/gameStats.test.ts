import { GameStats, Outcome } from '../../../../../src/model'

describe('gameStats', () => {
  let gameStats: GameStats

  beforeEach(() => {
    gameStats = new GameStats()
  })

  describe('logAtBat', () => {
    it('logs a single', () => {
      gameStats.logAtBat(Outcome.SINGLE, 0)
      expect(gameStats.batting.plateAppearances).toEqual(1)
      expect(gameStats.batting.atBats).toEqual(1)
      expect(gameStats.batting.hits).toEqual(1)
    })

    it.each([
      [Outcome.DOUBLE, 'doubles', 1],
      [Outcome.TRIPLE, 'triples', 3],
      [Outcome.HOME_RUN, 'homeRuns', 4]
    ])('logs "%s" as a hit', (outcome, statKey, runsScored) => {
      gameStats.logAtBat(outcome, runsScored)
      expect(gameStats.batting.plateAppearances).toEqual(1)
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
      expect(gameStats.batting.plateAppearances).toEqual(1)
      expect(gameStats.batting.atBats).toEqual(atBats)
      expect(gameStats.batting[statKey]).toEqual(1)
    })
  })

  describe('logBatterFaced', () => {
    it('logs a strikeout', () => {
      gameStats.logBatterFaced(Outcome.STRIKEOUT, 1, 0)
      expect(gameStats.pitching.battersFaced).toEqual(1)
      expect(gameStats.pitching.inningsPitched).toEqual('0.1')
      expect(gameStats.pitching.strikeouts).toEqual(1)
    })

    it('logs a double play', () => {
      gameStats.logBatterFaced(Outcome.GROUNDER, 2, 0)
      expect(gameStats.pitching.battersFaced).toEqual(1)
      expect(gameStats.pitching.inningsPitched).toEqual('0.2')
    })

    it('logs a hit with runs scored', () => {
      gameStats.logBatterFaced(Outcome.HOME_RUN, 0, 2)
      expect(gameStats.pitching.battersFaced).toEqual(1)
      expect(gameStats.pitching.inningsPitched).toEqual('0.0')
      expect(gameStats.pitching.hits).toEqual(1)
      expect(gameStats.pitching.runs).toEqual(2)
      expect(gameStats.pitching.earnedRuns).toEqual(2)
    })

    it('logs a walk', () => {
      gameStats.logBatterFaced(Outcome.WALK, 0, 0)
      expect(gameStats.pitching.battersFaced).toEqual(1)
      expect(gameStats.pitching.inningsPitched).toEqual('0.0')
      expect(gameStats.pitching.walks).toEqual(1)
    })

    it('logs an error', () => {
      gameStats.logBatterFaced(Outcome.ERROR, 0, 0)
      expect(gameStats.pitching.battersFaced).toEqual(1)
      expect(gameStats.pitching.inningsPitched).toEqual('0.0')
    })
  })
})

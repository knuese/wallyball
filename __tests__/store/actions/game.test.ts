import { mockStore } from '__test_utils__'
import { away, game, home, stats } from '__test_data__'
import { GameActionTypes } from '../../../src/store/types/game'
import {
  advanceRunners,
  checkEnd,
  requestSimulation,
  setTeams,
  simulateAtBat,
  switchSides
} from '../../../src/store/actions/game'
import { updateStandings } from '../../../src/store/actions/stats'
import { Outcome, Team } from '../../../src/model'

jest.mock('../../../src/store/actions/stats', () => ({
  saveStats: jest.fn(() => ({ type: 'MOCK_SAVE_STATS' })),
  updateStandings: jest.fn(() => ({ type: 'MOCK_UPDATE_STANDINGS' }))
}))

jest.mock('../../../src/util/game', () => ({
  ...jest.requireActual('../../../src/util/game'),
  calcOffset: () => 0
}))

describe('game actions', () => {
  describe('setTeams', () => {
    it('sets the teams', () => {
      const store = mockStore<GameActionTypes>()
      store.dispatch(setTeams(away, home))
      expect(store.getActions()).toEqual([
        {
          type: 'SET_TEAMS',
          payload: { away, home }
        }
      ])
    })
  })

  describe('advanceRunners', () => {
    it('records a run if someone scores', () => {
      const result = { runnersScored: ['p1', 'p2'], outs: 0 }
      const bases = { advanceRunners: () => result }

      const store = mockStore<GameActionTypes>()
      const actual = store.dispatch(advanceRunners({ bases } as any))

      expect(actual).toEqual(result)
      expect(store.getActions()).toEqual([{ type: 'RUN_SCORED', payload: 2 }])
    })

    it('logs an out', () => {
      const result = { runnersScored: [], outs: 1 }
      const bases = { advanceRunners: () => result }

      const store = mockStore<GameActionTypes>()
      const actual = store.dispatch(advanceRunners({ bases } as any))

      expect(actual).toEqual(result)
      expect(store.getActions()).toEqual([{ type: 'RECORD_OUT', payload: 1 }])
    })
  })

  describe('checkEnd', () => {
    it('detects when the game is over - home team wins', () => {
      const store = mockStore<GameActionTypes>({
        stats,
        game: {
          ...game,
          inning: 9,
          isBottom: true,
          outs: 0,
          scores: {
            away: [0, 0, 0, 1, 1, 0, 0, 0, 0],
            home: [2, 2, 0, 0, 0, 0, 0, 1]
          }
        }
      })

      store.dispatch(checkEnd() as any)

      expect(store.getActions()).toEqual([
        { type: 'GAME_OVER' },
        { type: 'MOCK_SAVE_STATS' },
        { type: 'MOCK_UPDATE_STANDINGS' }
      ])
      expect(updateStandings as jest.Mock).toHaveBeenCalledWith(home, away)
    })

    it('detects when the game is over - away team wins', () => {
      const store = mockStore<GameActionTypes>({
        stats,
        game: {
          ...game,
          inning: 9,
          isBottom: true,
          outs: 3,
          scores: {
            away: [0, 0, 0, 1, 0, 0, 0, 0, 0],
            home: [0, 0, 0, 0, 0, 0, 0, 0, 0]
          }
        }
      })

      store.dispatch(checkEnd() as any)

      expect(store.getActions()).toEqual([
        { type: 'GAME_OVER' },
        { type: 'MOCK_SAVE_STATS' },
        { type: 'MOCK_UPDATE_STANDINGS' }
      ])
      expect(updateStandings as jest.Mock).toHaveBeenCalledWith(away, home)
    })

    it('does nothing if the game is not over', () => {
      const store = mockStore<GameActionTypes>({
        stats,
        game: {
          ...game,
          inning: 4,
          isBottom: true,
          outs: 1,
          scores: {
            away: [0, 0, 0, 1],
            home: [0, 0, 0]
          }
        }
      })

      store.dispatch(checkEnd() as any)
      expect(store.getActions()).toEqual([])
    })
  })

  describe('switchSides', () => {
    it('dispatches the action', () => {
      const store = mockStore<GameActionTypes>()
      store.dispatch(switchSides())
      expect(store.getActions()).toEqual([{ type: 'PROGRESS_INNING' }])
    })
  })

  describe('requestSimulation', () => {
    it('simulates an at bat', () => {
      const store = mockStore<GameActionTypes>({
        game: { ...game, isOver: false, outs: 2 }
      })
      store.dispatch(requestSimulation() as any)

      // confirm that a play was registered, doesn't matter what actually happened
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ type: 'ADD_TO_PLAY_HISTORY' })
        ])
      )
    })

    it('switches sides if there are three outs', () => {
      const store = mockStore<GameActionTypes>({
        game: { isOver: false, outs: 3 }
      })
      store.dispatch(requestSimulation() as any)
      expect(store.getActions()).toEqual([{ type: 'PROGRESS_INNING' }])
    })

    it('does nothing if the game is over', () => {
      const store = mockStore<GameActionTypes>({
        game: { isOver: true }
      })
      store.dispatch(requestSimulation() as any)
      expect(store.getActions()).toEqual([])
    })
  })

  describe('simulateAtBat', () => {
    it.each([
      ['away', { home }],
      ['home', { away }]
    ])('throws an error if one of the %s is missing', (_desc, teams) => {
      const store = mockStore<GameActionTypes>({ game: { ...teams } })
      expect(() => store.dispatch(simulateAtBat() as any)).toThrowError()
    })

    describe('plays', () => {
      let randomSpy: jest.SpyInstance
      const batter = { name: 'batter', bat: jest.fn(), logAtBat: jest.fn() }
      const battingTeam = {
        nextBatter: () => batter,
        playerScored: jest.fn()
      } as any as Team
      const pitcher = {
        name: 'pitcher',
        pitch: jest.fn(),
        logBatterFaced: jest.fn()
      }
      const fieldingTeam = { defenderAt: () => pitcher } as any as Team

      beforeEach(() => {
        ;(battingTeam.playerScored as jest.Mock).mockReset()
        batter.bat.mockReset()
        batter.logAtBat.mockReset()
        pitcher.pitch.mockReset()
        pitcher.logBatterFaced.mockReset()
        randomSpy = jest.spyOn(Math, 'random')
      })

      it("records a single from the batter's stats", () => {
        const store = mockStore<GameActionTypes>({
          game: {
            ...game,
            inning: 1,
            isBottom: false,
            away: battingTeam,
            home: fieldingTeam
          }
        })

        // batter threshold is < 0.4
        randomSpy.mockReturnValue(0.1)
        batter.bat.mockReturnValue({ outcome: Outcome.SINGLE, rawValue: 0.234 })

        store.dispatch(simulateAtBat() as any)

        expect(store.getActions()).toEqual(
          expect.arrayContaining([
            {
              type: 'ADD_TO_PLAY_HISTORY',
              payload: `${batter.name} ${Outcome.SINGLE}.`
            }
          ])
        )

        expect(batter.bat).toHaveBeenCalled()
        expect(pitcher.pitch).not.toHaveBeenCalled()

        expect(batter.logAtBat).toHaveBeenCalledWith(Outcome.SINGLE, 0)
        expect(pitcher.logBatterFaced).toHaveBeenCalledWith(
          Outcome.SINGLE,
          0,
          0
        )
      })

      it("records a strikeout from the pitcher's stats", () => {
        const store = mockStore<GameActionTypes>({
          game: {
            ...game,
            inning: 1,
            isBottom: true,
            away: fieldingTeam,
            home: battingTeam
          }
        })

        // batter threshold is < 0.4
        randomSpy.mockReturnValue(0.8)
        pitcher.pitch.mockReturnValue({
          outcome: Outcome.STRIKEOUT,
          rawValue: 0.567
        })

        store.dispatch(simulateAtBat() as any)

        expect(store.getActions()).toEqual(
          expect.arrayContaining([
            {
              type: 'ADD_TO_PLAY_HISTORY',
              payload: `${batter.name} ${Outcome.STRIKEOUT}.`
            }
          ])
        )

        expect(pitcher.pitch).toHaveBeenCalled()
        expect(batter.bat).not.toHaveBeenCalled()

        expect(batter.logAtBat).toHaveBeenCalledWith(Outcome.STRIKEOUT, 0)
        expect(pitcher.logBatterFaced).toHaveBeenCalledWith(
          Outcome.STRIKEOUT,
          1,
          0
        )
      })

      it('checks for the end of the game at the ninth inning', () => {
        const store = mockStore<GameActionTypes>({
          game: {
            ...game,
            inning: 9,
            outs: 3,
            isBottom: false,
            away: battingTeam,
            home: fieldingTeam,
            scores: {
              away: [0, 0, 0, 0, 0, 0, 0, 0, 0],
              home: [0, 0, 0, 0, 0, 0, 0, 1]
            }
          }
        })

        // batter threshold is < 0.4
        randomSpy.mockReturnValue(0.8)
        pitcher.pitch.mockReturnValue({
          outcome: Outcome.FLY,
          rawValue: 0.999
        })

        store.dispatch(simulateAtBat() as any)

        expect(store.getActions()).toEqual(
          expect.arrayContaining([{ type: 'GAME_OVER' }])
        )
      })

      it('logs when a player scores', () => {
        const bases = {
          advanceRunners: () => ({
            runnersScored: ['p1', 'p2'],
            outs: 0
          })
        }
        const store = mockStore<GameActionTypes>({
          game: {
            ...game,
            bases,
            inning: 1,
            isBottom: false,
            away: battingTeam,
            home: fieldingTeam
          }
        })

        // batter threshold is < 0.4
        randomSpy.mockReturnValue(0.1)
        batter.bat.mockReturnValue({ outcome: Outcome.TRIPLE, rawValue: 0.234 })

        store.dispatch(simulateAtBat() as any)

        expect(battingTeam.playerScored).toHaveBeenCalledTimes(2)
        expect(battingTeam.playerScored).toHaveBeenCalledWith('p1')
        expect(battingTeam.playerScored).toHaveBeenCalledWith('p2')
        expect(batter.logAtBat).toHaveBeenCalledWith(Outcome.TRIPLE, 2)
        expect(pitcher.logBatterFaced).toHaveBeenCalledWith(
          Outcome.TRIPLE,
          0,
          2
        )
      })
    })
  })
})

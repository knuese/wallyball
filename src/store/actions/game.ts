import { Dispatch } from 'redux'
import { Bases, Outcome, Player, Position, Team } from '../../model'
import { getTotalScore, isOver } from '../../util'
import { RootState } from '../reducers'
import {
  GameActionTypes,
  GameState,
  GAME_OVER,
  PROGRESS_INNING,
  RECORD_OUT,
  RUN_SCORED
} from '../types/game'

const getTeams = (game: GameState) =>
  ({
    batting: game.isBottom ? game.home : game.away,
    fielding: game.isBottom ? game.away : game.home
  } as { batting: Team; fielding: Team })

export const advanceRunners =
  ({
    bases,
    batter,
    pitcher,
    numOuts,
    outcome,
    rawValue,
    useBatterStats
  }: {
    bases: Bases
    batter: Player
    pitcher: Player
    numOuts: number
    outcome: Outcome
    rawValue: number
    useBatterStats: boolean
  }) =>
  (dispatch: Dispatch<GameActionTypes>): number => {
    const { runnersScored, outs } = bases.advanceRunners({
      batter,
      pitcher,
      outcome,
      rawValue,
      numOuts,
      useBatterStats
    })

    if (runnersScored.length > 0) {
      dispatch({ type: RUN_SCORED, payload: runnersScored.length })
    }

    if (outs > 0) {
      dispatch({ type: RECORD_OUT, payload: outs })
    }

    return runnersScored.length
  }

export const simulateAtBat =
  () =>
  (dispatch: Dispatch<GameActionTypes>, getState: () => RootState): void => {
    const { game } = getState()

    if (!game.away || !game.home) {
      throw new Error('teams must be defined')
    }

    const { batting, fielding } = getTeams(game)
    const batter = batting.nextBatter()
    const pitcher = fielding.defenderAt(Position.PITCHER)

    const useBatterStats = Math.random() < 0.4
    const { outcome, rawValue } = useBatterStats
      ? batter.bat()
      : pitcher.pitch()

    console.log(`${batter.name} -> ${outcome}`)

    let runsScored = 0
    if (outcome === Outcome.STRIKEOUT) {
      dispatch({ type: RECORD_OUT, payload: 1 })
    } else {
      runsScored = dispatch(
        advanceRunners({
          bases: game.bases,
          batter,
          pitcher,
          numOuts: game.outs,
          outcome,
          rawValue,
          useBatterStats
        }) as any
      )
    }

    if (runsScored) {
      console.log('scored:', runsScored)
      // TODO batter.logAtBat(outcome, runsScored)
    }

    const awayScore = getTotalScore(game.scores.away)
    const homeScore = getTotalScore(game.scores.home)
    const isGameOver = isOver({
      inning: game.inning,
      isBottom: game.isBottom,
      outs: game.outs,
      homeScore,
      awayScore
    })

    if (isGameOver) {
      dispatch({ type: GAME_OVER })
    } else if (game.outs === 3) {
      dispatch({ type: PROGRESS_INNING })
    }
  }
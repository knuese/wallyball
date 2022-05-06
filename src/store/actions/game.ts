import { Dispatch } from 'redux'
import { Bases, Outcome, Player, Position, Team } from '../../model'
import { calcOffset, getTotalScore, isOver } from '../../util'
import { RootState } from '../reducers'
import {
  ADD_TO_PLAY_HISTORY,
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
  (
    dispatch: Dispatch<GameActionTypes>
  ): { runnersScored: string[]; outs: number } => {
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

    return { runnersScored, outs }
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

    const useBatterStats = Math.random() < 0.4 + calcOffset(batter, pitcher)
    const { outcome, rawValue } = useBatterStats
      ? batter.bat()
      : pitcher.pitch()

    dispatch({
      type: ADD_TO_PLAY_HISTORY,
      payload: `${batter.name} ${outcome}.`
    })

    let runnersScored = []
    let outsRecorded = 0

    if (outcome === Outcome.STRIKEOUT) {
      dispatch({ type: RECORD_OUT, payload: 1 })
      outsRecorded = 1
    } else {
      const { runnersScored: runs, outs } = dispatch(
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

      runnersScored = runs
      outsRecorded = outs
    }

    batter.logAtBat(outcome, runnersScored.length)
    pitcher.logBatterFaced(outcome, outsRecorded, runnersScored.length)

    for (const runnerId of runnersScored) {
      batting.players[runnerId].scored()
    }
  }

export const switchSides =
  () =>
  (dispatch: Dispatch<GameActionTypes>, getState: () => RootState): void => {
    const { game } = getState()

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

export const requestSimulation =
  () =>
  (dispatch: Dispatch<GameActionTypes>, getState: () => RootState): void => {
    const { outs } = getState().game
    dispatch((outs < 3 ? simulateAtBat : switchSides)() as any)
  }

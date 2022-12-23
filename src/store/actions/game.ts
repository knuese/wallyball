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
  RUN_SCORED,
  SET_TEAMS
} from '../types/game'
import { saveStats, updateStandings } from './stats'

export const setTeams =
  (away: Team, home: Team) =>
  (dispatch: Dispatch<GameActionTypes>): void => {
    dispatch({ type: SET_TEAMS, payload: { away, home } })
  }

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

    const useBatterStats = Math.random() + calcOffset(batter, pitcher) < 0.4
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
      batting.playerScored(runnerId)
    }

    if (game.inning >= 9) {
      dispatch(checkEnd() as any)
    }
  }

export const checkEnd =
  () =>
  (dispatch: Dispatch<any>, getState: () => RootState): void => {
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
      dispatch(saveStats(game.away as Team, game.home as Team) as any)

      let winner, loser

      if (homeScore > awayScore) {
        winner = game.home
        loser = game.away
      } else {
        winner = game.away
        loser = game.home
      }

      dispatch(updateStandings(winner as Team, loser as Team))
    }
  }

export const switchSides =
  () =>
  (dispatch: Dispatch<GameActionTypes>): void => {
    dispatch({ type: PROGRESS_INNING })
  }

export const requestSimulation =
  () =>
  (dispatch: Dispatch<GameActionTypes>, getState: () => RootState): void => {
    const { outs, isOver } = getState().game

    if (!isOver) {
      dispatch((outs < 3 ? simulateAtBat : switchSides)() as any)
    }
  }

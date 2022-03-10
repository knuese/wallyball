import { useSelector } from 'react-redux'
import { Side, Team } from '../model'
import { RootState } from '../store/reducers'
import { TeamState } from '../store/types/team'

export const useTeam = (side: Side): TeamState => {
  const key = side === Side.AWAY ? 'away' : 'home'
  const teamState = useSelector((state: RootState) => state.teams[key])
  return teamState
}

export const useTeams = (): { batting: Team; pitching: Team } => {
  const { game } = useSelector((state: RootState) => state)
  const batting = game.isBottom ? game.home : game.away
  const pitching = game.isBottom ? game.away : game.home
  return {
    batting: (game.isBottom ? game.home : game.away) as Team,
    pitching: (game.isBottom ? game.away : game.home) as Team
  }
}

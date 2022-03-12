import { useSelector } from 'react-redux'
import { Team } from '../model'
import { RootState } from '../store/reducers'

export const useTeams = (): { batting: Team; pitching: Team } => {
  const { game } = useSelector((state: RootState) => state)
  return {
    batting: (game.isBottom ? game.home : game.away) as Team,
    pitching: (game.isBottom ? game.away : game.home) as Team
  }
}

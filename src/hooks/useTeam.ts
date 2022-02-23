import { useSelector } from 'react-redux'
import { Side } from '../model'
import { RootState } from '../store/reducers'
import { TeamState } from '../store/types/team'

export const useTeam = (side: Side): TeamState => {
  const key = side === Side.AWAY ? 'away' : 'home'
  const teamState = useSelector((state: RootState) => state.teams[key])
  return teamState
}

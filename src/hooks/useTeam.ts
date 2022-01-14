import { useSelector } from "react-redux";
import { RootState } from "../client/store/reducers";
import { Side } from "../client/store/types/team";

export const useTeam = (side: Side) => {
  const key = side === Side.AWAY ? 'away' : 'home'
  const { lineup, defense } = useSelector(
    (state: RootState) => state.teams[key]
  )
  return [lineup, defense]
}

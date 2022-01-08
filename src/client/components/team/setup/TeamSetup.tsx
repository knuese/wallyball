import { FC } from 'react'
import { Player } from '../../../store/types/team'
import { Roster, StarterTable } from '.'

export type TeamSetupProps = {
  players: Player[]
}

export const TeamSetup: FC<TeamSetupProps> = ({ players }) => {
  return players?.length ? (
    <div className="flex-column">
      <Roster players={players} />
      <div className="starters">
        <span className="sub-label">Starting Lineup</span>
        <StarterTable players={players} />
      </div>
    </div>
  ) : (
    <></>
  )
}

export default TeamSetup

import { FC } from 'react'
import { Player } from '../../../store/types/team'
import { AvailablePlayers, Starter } from '.'

export type TeamSetupProps = {
  players: Player[]
}

export const TeamSetup: FC<TeamSetupProps> = ({ players }) => {
  const starters = [...new Array(9).keys()].map((_, i) => (
    <Starter key={i} index={i} />
  ))

  return players?.length ? (
    <div className="flex-column">
      <AvailablePlayers players={players} />
      <div className="starters">
        <span className="sub-label">Starting Lineup</span>
        {starters}
      </div>
    </div>
  ) : (
    <></>
  )
}

export default TeamSetup

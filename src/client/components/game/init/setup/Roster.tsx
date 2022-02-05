import { FC } from 'react'
import { PlayerConfig } from '../../../../store/types/team'

export type RosterProps = {
  players: PlayerConfig[]
}

export const Roster: FC<RosterProps> = ({ players }) => {
  return (
    <div>
      <p className="sub-label">Roster</p>
      <ul className="player-list">
        {players.map((p, i) => (
          <li key={p.name + i}>{p.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default Roster

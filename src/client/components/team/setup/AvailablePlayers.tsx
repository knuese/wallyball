import { FC } from 'react'
import { Player } from '../../../store/types/team'

export type AvailablePlayerProps = {
  players: Player[]
}

export const AvailablePlayers: FC<AvailablePlayerProps> = ({ players }) => {
  return (
    <div>
      <p className="sub-label">Available Players</p>
      <ul className="player-list">
        {players.map((p, i) => (
          <li key={p.name + i}>{p.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default AvailablePlayers

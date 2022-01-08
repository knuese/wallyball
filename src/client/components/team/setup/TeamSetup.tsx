import { FC } from 'react'
import { Player } from '../../../store/types/team'
import { Starter } from '.'

export type TeamSetupProps = {
  players: Player[]
}

export const TeamSetup: FC<TeamSetupProps> = ({ players }) => {
  return players?.length ? (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div>
        <p>Available Players</p>
        <ul style={{ columns: 2 }}>
          {players.map((p, i) => (
            <li key={p.name + i}>{p.name}</li>
          ))}
        </ul>
      </div>
      <div>
        {[...new Array(9).keys()].map((_, i) => (
          <Starter index={i} />
        ))}
      </div>
    </div>
  ) : (
    <></>
  )
}

export default TeamSetup

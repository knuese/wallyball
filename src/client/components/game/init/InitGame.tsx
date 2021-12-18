import { FC } from 'react'
import { TeamView } from '../..'

export const InitGame: FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <TeamView />
      <TeamView isHome />
    </div>
  )
}

export default InitGame

import { FC } from 'react'
import { TeamSetup } from '../..'

export const InitGame: FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <TeamSetup />
      <TeamSetup isHome />
    </div>
  )
}

export default InitGame

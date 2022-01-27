import { FC, useState } from 'react'
import { Innings, TeamStats, TeamToggles } from '.'
import { Side } from '../../../../store/types/team'

export const BoxScore: FC = () => {
  const [activeSide, setActiveSide] = useState(Side.AWAY)

  return (
    <div className="flex-column box-score">
      <Innings />
      <TeamToggles activeSide={activeSide} setActiveSide={setActiveSide} />
      <TeamStats side={activeSide} />
    </div>
  )
}

export default BoxScore

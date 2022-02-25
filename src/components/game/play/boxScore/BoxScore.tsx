import { FC, useState } from 'react'
import { Side } from '../../../../model'
import { Innings, TeamStats, TeamToggles } from '.'
import { bears, turtles } from './sample'

export const BoxScore: FC = () => {
  const [activeSide, setActiveSide] = useState<Side>(Side.AWAY)

  return (
    <div className="flex-column box-score">
      <Innings away={bears} home={turtles} />
      <TeamToggles
        activeSide={activeSide}
        setActiveSide={setActiveSide}
        away={bears}
        home={turtles}
      />
      <TeamStats {...(activeSide === Side.AWAY ? bears : turtles)} />
    </div>
  )
}

export default BoxScore
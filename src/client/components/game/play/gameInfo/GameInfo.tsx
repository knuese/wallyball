import { FC } from 'react'
import { Controls, CurrentPlayer } from '.'
import { PlayDescriptor } from '..'
import { bears, turtles } from '../boxScore/sample'

const batterStats = {
  today: '1-4, HR, RBI',
  season: {
    H: '12',
    HR: '4',
    RBI: '16',
    AVG: '0.265'
  }
}

const pitcherStats = {
  today: '0.2 IP, 0 R, 0 ER, 2 K',
  season: {
    IP: '14.0',
    BB: '2',
    K: '14',
    ERA: '1.07'
  }
}

export const GameInfo: FC = () => {
  return (
    <div className="flex-column game-info">
      <div className="flex-column border-all">
        <CurrentPlayer
          isBatting
          name="Sparey"
          color={bears.color}
          background={bears.background}
          stats={batterStats}
        />
        <div className="border-bottom" />
        <CurrentPlayer
          name="Shells"
          color={turtles.color}
          background={turtles.background}
          stats={pitcherStats}
        />
      </div>
      <br />
      <PlayDescriptor text="Bo Bo doubled." />
      <br />
      <Controls />
    </div>
  )
}

export default GameInfo

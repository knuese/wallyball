import { FC } from 'react'
import { Controls, CurrentPlayer, InningStatus, PlayHistory } from '.'
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
      <div className="game-info-item">
        <InningStatus inning={5} isBottom={false} outs={2} />
      </div>
      <div className="game-info-item">
        <CurrentPlayer
          isBatting
          name="Sparey"
          color={bears.color}
          background={bears.background}
          stats={batterStats}
        />
      </div>
      <div className="game-info-item">
        <CurrentPlayer
          name="Shells"
          color={turtles.color}
          background={turtles.background}
          stats={pitcherStats}
        />
      </div>
      <div className="game-info-item">
        <PlayHistory
          plays={[
            'Jingle grounded out.',
            'September struck out.',
            'Sammy singled.'
          ]}
        />
      </div>
      <Controls />
    </div>
  )
}

export default GameInfo

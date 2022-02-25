import { FC } from 'react'
import { useSelector } from 'react-redux'
import { Controls, CurrentPlayer, InningStatus, PlayHistory } from '.'
import { Position } from '../../../../model'
import { RootState } from '../../../../store/reducers'

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
  const {
    away,
    home,
    inning,
    isBottom,
    outs,
    playsForInning
  } = useSelector((state: RootState) => state.game)

  if (!home || !away) {
    throw new Error()
  }

  const battingTeam = isBottom ? home : away
  const pitchingTeam = isBottom ? away: home

  return (
    <div className="flex-column game-info">
      <div className="game-info-item">
        <InningStatus inning={inning} isBottom={isBottom} outs={outs} />
      </div>
      <div className="game-info-item">
        <CurrentPlayer
          isBatting
          name={battingTeam.peekNextBatter().name}
          color={battingTeam.secondaryColor}
          background={battingTeam.primaryColor}
          stats={batterStats}
        />
      </div>
      <div className="game-info-item">
        <CurrentPlayer
          name={pitchingTeam.defenderAt(Position.PITCHER).name}
          color={pitchingTeam.secondaryColor}
          background={pitchingTeam.primaryColor}
          stats={pitcherStats}
        />
      </div>
      <div className="game-info-item">
        <PlayHistory plays={playsForInning} />
      </div>
      <Controls />
    </div>
  )
}

export default GameInfo

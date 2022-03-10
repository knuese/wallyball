import { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Controls, CurrentPlayer, InningStatus, PlayHistory } from '.'
import { useTeams } from '../../../../hooks'
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
  const [batterName, setBatterName] = useState('')
  const { inning, isBottom, outs, playsForInning } = useSelector(
    (state: RootState) => state.game
  )

  const { batting, pitching } = useTeams()

  useEffect(() => {
    // prevent next batter from showing when there are three outs
    if (outs < 3) {
      setBatterName(batting.peekNextBatter().name)
    }
  }, [outs, batting.currentBatter()])

  return (
    <div className="flex-column game-info">
      <div className="game-info-item">
        <InningStatus inning={inning} isBottom={isBottom} outs={outs} />
      </div>
      <div className="game-info-item">
        <CurrentPlayer
          isBatting
          name={batterName}
          color={batting.secondaryColor}
          background={batting.primaryColor}
          stats={batterStats}
        />
      </div>
      <div className="game-info-item">
        <CurrentPlayer
          name={pitching.defenderAt(Position.PITCHER).name}
          color={pitching.secondaryColor}
          background={pitching.primaryColor}
          stats={pitcherStats}
        />
      </div>
      <div className="game-info-item">
        <PlayHistory plays={playsForInning} />
      </div>
      <Controls outs={outs} />
    </div>
  )
}

export default GameInfo

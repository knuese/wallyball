import { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Controls, CurrentPlayer, InningStatus, PlayHistory } from '.'
import { useTeams } from '../../../../hooks'
import { Player, Position } from '../../../../model'
import { RootState } from '../../../../store/reducers'

export const GameInfo: FC = () => {
  const [currentBatter, setCurrentBatter] = useState<Player | null>(null)
  const [currentPitcher, setCurrentPitcher] = useState<Player | null>(null)

  const { inning, isBottom, isOver, outs, playsForInning } = useSelector(
    (state: RootState) => state.game
  )

  const { batting, fielding } = useTeams()

  useEffect(() => {
    // prevent next batter from showing when there are three outs
    if (outs < 3) {
      setCurrentBatter(batting.currentBatter())
    }
  }, [outs, batting.currentBatter()])

  useEffect(() => {
    setCurrentPitcher(fielding.defenderAt(Position.PITCHER))
  }, [fielding.defenderAt(Position.PITCHER)])

  return (
    <div className="flex-column game-info">
      <div className="game-info-item">
        <InningStatus inning={inning} isBottom={isBottom} outs={outs} />
      </div>
      <div className="game-info-item">
        <CurrentPlayer
          isBatting
          name={currentBatter?.name || ''}
          color={batting.secondaryColor}
          background={batting.primaryColor}
          stats={{
            today: currentBatter?.getBattingStatLine(),
            season: currentBatter?.getBatterSeasonStats()
          }}
        />
      </div>
      <div className="game-info-item">
        <CurrentPlayer
          name={currentPitcher?.name || ''}
          color={fielding.secondaryColor}
          background={fielding.primaryColor}
          stats={{
            today: currentPitcher?.getPitchingStatLine(),
            season: currentPitcher?.getPitcherSeasonStats()
          }}
        />
      </div>
      <div className="game-info-item">
        <PlayHistory plays={playsForInning} />
      </div>
      <Controls outs={outs} isOver={isOver} />
    </div>
  )
}

export default GameInfo

import { FC, useState } from 'react'
import { useSelector } from 'react-redux'
import { Side } from '../../../../model'
import { Innings, TeamStats, TeamToggles } from '.'
import { RootState } from '../../../../store/reducers'
import { getNumHits, getTotalScore } from '../../../../util'

export const BoxScore: FC = () => {
  const [activeSide, setActiveSide] = useState<Side>(Side.AWAY)
  const { away, home, scores, inning, isBottom, isOver } = useSelector(
    (state: RootState) => state.game
  )

  if (!away || !home) {
    throw new Error('fail!')
  }

  const awayDisplayProps = {
    name: away.name,
    color: away.secondaryColor,
    background: away.primaryColor
  }

  const homeDisplayProps = {
    name: home.name,
    color: home.secondaryColor,
    background: home.primaryColor
  }

  return (
    <div className="flex-column box-score">
      <Innings
        currentInning={inning}
        isBottom={isBottom}
        isOver={isOver}
        away={{
          ...awayDisplayProps,
          scores: scores.away,
          runs: getTotalScore(scores.away),
          hits: getNumHits(away),
          errors: 0
        }}
        home={{
          ...homeDisplayProps,
          scores: scores.home,
          runs: getTotalScore(scores.home),
          hits: getNumHits(home),
          errors: 0
        }}
      />
      <TeamToggles
        activeSide={activeSide}
        setActiveSide={setActiveSide}
        away={awayDisplayProps}
        home={homeDisplayProps}
      />
      <TeamStats
        {...(activeSide === Side.AWAY
          ? {
              ...awayDisplayProps,
              batting: away.getBattingLines(),
              battingExtra: away.getBattingExtra(),
              pitching: away.getPitchingLines()
            }
          : {
              ...homeDisplayProps,
              batting: home.getBattingLines(),
              battingExtra: home.getBattingExtra(),
              pitching: home.getPitchingLines()
            })}
      />
    </div>
  )
}

export default BoxScore

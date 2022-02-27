import { FC, useState } from 'react'
import { useSelector } from 'react-redux'
import { Side } from '../../../../model'
import { Innings, TeamStats, TeamToggles } from '.'
import { RootState } from '../../../../store/reducers'

export const BoxScore: FC = () => {
  const [activeSide, setActiveSide] = useState<Side>(Side.AWAY)
  const { away, home, scores } = useSelector((state: RootState) => state.game)

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
        away={{
          ...awayDisplayProps,
          scores: scores.away,
          runs: 0,
          hits: 0,
          errors: 0
        }}
        home={{
          ...homeDisplayProps,
          scores: scores.home,
          runs: 0,
          hits: 0,
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
              battingExtra: {},
              pitching: [['September', '0.0', 0, 0, 0, 0, 0]]
            }
          : {
              ...homeDisplayProps,
              batting: home.getBattingLines(),
              battingExtra: {},
              pitching: [['Gary', '0.0', 0, 0, 0, 0, 0]]
            })}
      />
    </div>
  )
}

export default BoxScore

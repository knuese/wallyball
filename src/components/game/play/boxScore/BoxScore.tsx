import { FC, useState } from 'react'
import { useSelector } from 'react-redux'
import { Side } from '../../../../model'
import { Innings, TeamStats, TeamToggles } from '.'
import { RootState } from '../../../../store/reducers'
import { bears, turtles } from './sample'

export const BoxScore: FC = () => {
  const [activeSide, setActiveSide] = useState<Side>(Side.AWAY)
  const { away, home, scores } = useSelector((state: RootState) => state.game)

  if (!away || !home) {
    throw new Error('fail!')
  }

  return (
    <div className="flex-column box-score">
      <Innings
        away={{
          label: away.label,
          scores: scores.away,
          runs: 0,
          hits: 0,
          errors: 0
        }}
        home={{
          label: home.label,
          scores: scores.home,
          runs: 0,
          hits: 0,
          errors: 0
        }}
      />
      <TeamToggles
        activeSide={activeSide}
        setActiveSide={setActiveSide}
        away={away.label}
        home={home.label}
      />
      <TeamStats {
        ...(activeSide === Side.AWAY
          ? {
            label: away.label,
            batting: Object.values(away.players).map(({ name }) => [name, 0, 0, 0, 0, 0, 0]),
            battingExtra: {},
            pitching: [['September', '0.0', 0, 0, 0, 0, 0]]
          } : {
            label: home.label,
            batting: Object.values(home.players).map(({ name }) => [name, 0, 0, 0, 0, 0, 0]),
            battingExtra: {},
            pitching: [['Gary', '0.0', 0, 0, 0, 0, 0]]
          }
        )}
      />
    </div>
  )
}

export default BoxScore

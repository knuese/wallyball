import { FC } from 'react'
import { InningColumns, StatColumns, TeamColumn } from '.'
import { ScoreArray } from '../../../../store/types/game'

type PropsForSide = {
  name: string
  color: string
  background: string
  scores: ScoreArray
  runs: number
  hits: number
  errors: number
}

export type InningProps = {
  currentInning: number
  isBottom: boolean
  isOver: boolean
  away: PropsForSide
  home: PropsForSide
}

export const Innings: FC<InningProps> = ({
  currentInning,
  isBottom,
  isOver,
  away,
  home
}) => (
  <div className="flex-row">
    <TeamColumn away={{ ...away }} home={{ ...home }} />
    <InningColumns
      currentInning={currentInning}
      isBottom={isBottom}
      isOver={isOver}
      awayScores={away.scores}
      homeScores={home.scores}
    />
    <StatColumns away={away} home={home} />
  </div>
)

export default Innings

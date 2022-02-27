import { FC } from 'react'
import { InningColumns, StatColumns, TeamColumn } from '.'

type PropsForSide = {
  name: string
  color: string
  background: string
  scores: number[]
  runs: number
  hits: number
  errors: number
}

export type InningProps = {
  away: PropsForSide
  home: PropsForSide
}

export const Innings: FC<InningProps> = ({ away, home }) => (
  <div className="flex-row">
    <TeamColumn away={{ ...away }} home={{ ...home }} />
    <InningColumns awayScores={away.scores} homeScores={home.scores} />
    <StatColumns away={away} home={home} />
  </div>
)

export default Innings

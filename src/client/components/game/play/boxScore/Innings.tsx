import { FC } from 'react'
import { InningColumns, StatColumns, TeamColumn } from '.'
import { useTeam } from '../../../../hooks'
import { Side } from '../../../../store/types/team'

export const Innings: FC = () => {
  const away = useTeam(Side.AWAY)
  const home = useTeam(Side.HOME)

  return (
    <div className="flex-row">
      <TeamColumn
        away={{
          name: 'Bears',
          color: '#DEB887',
          background: '#841B2D'
        }}
        home={{
          name: 'Turtles',
          color: '#A7FC00',
          background: '#007F5C'
        }}
      />
      <InningColumns
        awayScores={[0, 0, 1, 0, 0, 1, 0, 0, 0]}
        homeScores={[0, 0, 0, 2, 0, 1, 0, 0, 0]}
      />
      <StatColumns
        away={{
          runs: 2,
          hits: 5,
          errors: 0
        }}
        home={{
          runs: 3,
          hits: 8,
          errors: 1
        }}
      />
    </div>
  )
}

export default Innings

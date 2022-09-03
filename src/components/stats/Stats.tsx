import { FC, useState } from 'react'
import classNames from 'classnames'
import { IndividualTable, StandingsTable, TeamTable } from '.'

enum StatType {
  STANDINGS = 'Standings',
  INDIVIDUAL = 'Individual',
  TEAM = 'Team'
}

export const Stats: FC = () => {
  const [statType, setStatType] = useState(StatType.STANDINGS)

  const components = [
    StatType.STANDINGS,
    StatType.INDIVIDUAL,
    StatType.TEAM
  ].map((type) => (
    <a
      className={classNames({ selected: statType === type })}
      onClick={() => setStatType(type)}
    >
      {type}
    </a>
  ))

  return (
    <div className="stats">
      <h1>Stats</h1>
      <div className="flex-row center stat-types">{components}</div>
      <div className="stats-table-container">
        {(() => {
          switch (statType) {
            case StatType.STANDINGS:
              return <StandingsTable />
            case StatType.INDIVIDUAL:
              return <IndividualTable />
            case StatType.TEAM:
              return <TeamTable />
          }
        })()}
      </div>
    </div>
  )
}

export default Stats

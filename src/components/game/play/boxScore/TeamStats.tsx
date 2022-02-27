import { FC } from 'react'
import { TeamLabel } from '../../../../model/game/team'

type BattingExtra = {
  doubles?: string[]
  triples?: string[]
  homeRuns?: string[]
}

export type TeamStatProps = {
  label: TeamLabel
  batting: Array<string | number>[]
  battingExtra: BattingExtra
  pitching: Array<string | number>[]
}

export const TeamStats: FC<TeamStatProps> = ({
  label,
  batting,
  battingExtra,
  pitching
}) => {
  const headerStyle = {
    color: label.color,
    background: label.background
  }

  const getRows = (stats: Array<string | number>, i: number) => (
    <tr
      key={`${label.name}:${stats[0]}`}
      className={i % 2 === 0 ? 'even-row' : 'odd-row'}
    >
      {stats.map((stat, i) => (
        <td
          key={`${label.name}:${stats[0]}:${i}`}
          className={i === 0 ? 'border-right' : 'stat-cell'}
        >
          {stat}
        </td>
      ))}
    </tr>
  )

  const { doubles, triples, homeRuns } = battingExtra

  return (
    <div className="flex-column">
      <table className="team-stats-table">
        <thead style={headerStyle}>
          <tr>
            <th></th>
            <th>AB</th>
            <th>R</th>
            <th>H</th>
            <th>RBI</th>
            <th>BB</th>
            <th>SO</th>
          </tr>
        </thead>
        <tbody>{batting.map(getRows)}</tbody>
      </table>
      {(doubles || triples || homeRuns) && (
        <div className="batting-extra">
          {doubles?.length && (
            <p className="batting-extra-line">{`2B: ${doubles?.join(', ')}`}</p>
          )}
          {triples?.length && (
            <p className="batting-extra-line">{`3B: ${triples?.join(', ')}`}</p>
          )}
          {homeRuns?.length && (
            <p className="batting-extra-line">{`HR: ${homeRuns?.join(
              ', '
            )}`}</p>
          )}
        </div>
      )}
      <div style={{ height: '0.5rem' }} />
      <table className="team-stats-table">
        <thead style={headerStyle}>
          <tr>
            <th></th>
            <th>IP</th>
            <th>H</th>
            <th>R</th>
            <th>ER</th>
            <th>BB</th>
            <th>SO</th>
          </tr>
        </thead>
        <tbody>{pitching.map(getRows)}</tbody>
      </table>
    </div>
  )
}

export default TeamStats

import { FC } from 'react'
// import { useTeam } from "../../../../hooks";
import { Side } from '../../../../store/types/team'

export type TeamStatProps = {
  side: Side
}

type ExtraStats = {
  doubles?: string[]
  triples?: string[]
  homeRuns?: string[]
}

const bearsBatting = [
  ['Sammy', 4, 0, 0, 0, 0, 0],
  ['Buster', 3, 1, 1, 0, 1, 1],
  ['Tush', 4, 0, 2, 1, 0, 2],
  ['Bo Bo', 4, 0, 0, 0, 0, 2],
  ['Spanky', 4, 0, 1, 0, 0, 2],
  ['Sparey', 4, 1, 1, 1, 0, 0],
  ['Cappy', 3, 0, 0, 0, 0, 1],
  ['Cupcake', 3, 0, 0, 0, 0, 1],
  ['September', 3, 0, 0, 0, 0, 1]
]

const bearsExtra = {
  doubles: ['Buster'],
  homeRuns: ['Sparey']
}

const bearsPitching = [['September', '8.0', 8, 3, 2, 2, 9]]

const turtlesBatting = [
  ['Zoona', 4, 1, 2, 0, 0, 0],
  ['Chan', 3, 0, 1, 1, 1, 1],
  ['Guss', 4, 0, 0, 0, 0, 2],
  ['Browny', 3, 0, 0, 0, 1, 3],
  ['Shells', 4, 1, 1, 1, 0, 1],
  ['Glen', 4, 0, 2, 0, 0, 0],
  ['Cookie', 4, 1, 0, 0, 0, 1],
  ['George', 3, 0, 1, 0, 0, 1],
  ['Gary', 3, 0, 1, 0, 0, 0]
]

const turtlesExtra = {
  doubles: ['Chan', 'Glen'],
  triples: ['Zoona']
}

const turtlesPitching = [
  ['Gary', '8.0', 4, 2, 2, 1, 8],
  ['Shells', '1.0', 1, 0, 0, 0, 2]
]

export const TeamStats: FC<TeamStatProps> = ({ side }) => {
  // const { primaryColor } = useTeam(side)
  const isAway = side === Side.AWAY

  const headerStyle = {
    color: isAway ? '#DEB887' : '#A7FC00',
    backgroundColor: isAway ? '#841B2D' : '#007F5C' // primaryColor
  }

  const getRows = (stats: Array<string | number>, i: number) => (
    <tr className={i % 2 === 0 ? 'even-row' : 'odd-row'}>
      {stats.map((stat, i) => (
        <td className={i === 0 ? 'border-right' : 'stat-cell'}>{stat}</td>
      ))}
    </tr>
  )

  const battingRows = (isAway ? bearsBatting : turtlesBatting).map(getRows)
  const { doubles, triples, homeRuns } = (
    isAway ? bearsExtra : turtlesExtra
  ) as ExtraStats
  const pitchingRows = (isAway ? bearsPitching : turtlesPitching).map(getRows)

  return (
    <div className="flex-column">
      <table className="team-stats-table">
        <thead style={headerStyle}>
          <th></th>
          <th>AB</th>
          <th>R</th>
          <th>H</th>
          <th>RBI</th>
          <th>BB</th>
          <th>SO</th>
        </thead>
        <tbody>{battingRows}</tbody>
      </table>
      <div className="batting-extra">
        {doubles?.length && (
          <p className="batting-extra-line">{`2B: ${doubles?.join(', ')}`}</p>
        )}
        {triples?.length && (
          <p className="batting-extra-line">{`3B: ${triples?.join(', ')}`}</p>
        )}
        {homeRuns?.length && (
          <p className="batting-extra-line">{`HR: ${homeRuns?.join(', ')}`}</p>
        )}
      </div>
      <div style={{ height: '0.5rem' }} />
      <table className="team-stats-table">
        <thead style={headerStyle}>
          <th></th>
          <th>IP</th>
          <th>H</th>
          <th>R</th>
          <th>ER</th>
          <th>BB</th>
          <th>SO</th>
        </thead>
        <tbody>{pitchingRows}</tbody>
      </table>
    </div>
  )
}

export default TeamStats

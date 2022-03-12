import { FC } from 'react'

export type BattingStatsSeason = {
  H: string
  HR: string
  RBI: string
  AVG: string
}

export type PitchingStatsSeason = {
  IP: string
  BB: string
  K: string
  ERA: string
}

export type CurrentPlayerProps = {
  name: string
  color: string
  background: string
  stats: {
    today: string
    season: BattingStatsSeason | PitchingStatsSeason
  }
  isBatting?: boolean
}

export const CurrentPlayer: FC<CurrentPlayerProps> = ({
  name,
  color,
  background,
  stats,
  isBatting
}) => (
  <div className="flex-column border-all">
    <div className="center game-info-title" style={{ color, background }}>
      CURRENT {isBatting ? 'BATTER' : 'PITCHER'}
    </div>
    <div className="flex-row" style={{ background }}>
      <div className="flex center current-player-name" style={{ color }}>
        <b>{name}</b>
      </div>
      <table className="center current-player-table">
        <thead>
          <tr>
            {Object.keys(stats.season).map((k, i) => (
              <th key={`${i}:${k}`} style={{ backgroundColor: color }}>
                {k}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {Object.values(stats.season).map((v, i) => (
              <td key={`${i}:${v}`} style={{ backgroundColor: color }}>
                {v}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
    <div className="current-player-text" style={{ color, background }}>
      Today: {stats.today}
    </div>
  </div>
)

export default CurrentPlayer

import { FC } from 'react'
import { BattingStatsSeason, PitchingStatsSeason } from '../../../../types'

export type CurrentPlayerProps = {
  name: string
  color: string
  background: string
  isBatting?: boolean
  stats: {
    today?: string
    season?: BattingStatsSeason | PitchingStatsSeason
  }
}

export const CurrentPlayer: FC<CurrentPlayerProps> = ({
  name,
  color,
  background,
  isBatting,
  stats: { today = '', season = { H: '--', HR: '--', RBI: '--', AVG: '--' } }
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
            {Object.keys(season).map((k, i) => (
              <th key={`${i}:${k}`} style={{ backgroundColor: color }}>
                {k}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {Object.values(season).map((v, i) => (
              <td key={`${i}:${v}`} style={{ backgroundColor: color }}>
                {v}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
    <div className="current-player-text" style={{ color, background }}>
      Today: {today}
    </div>
  </div>
)

export default CurrentPlayer

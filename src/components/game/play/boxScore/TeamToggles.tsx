import { FC } from 'react'
import { Side } from '../../../../store/types/team'

export type TeamToggleProps = {
  activeSide: Side
  setActiveSide: (side: Side) => void
  away: {
    name: string
    color: string
    background: string
  }
  home: {
    name: string
    color: string
    background: string
  }
}

export const TeamToggles: FC<TeamToggleProps> = ({
  activeSide,
  setActiveSide,
  away,
  home
}) => {
  return (
    <div className="flex-row team-toggles">
      <div
        data-testid="away-toggle"
        className={`team-toggle border-top border-bottom ${
          activeSide === Side.AWAY
            ? ['team-toggle-active', 'border-right'].join(' ')
            : 'team-toggle-inactive'
        }`}
        style={{
          color: away.color,
          backgroundColor: away.background
        }}
        onClick={() => setActiveSide(Side.AWAY)}
      >
        {away.name}
      </div>
      <div
        data-testid={'home-toggle'}
        className={`team-toggle border-top border-bottom ${
          activeSide === Side.HOME
            ? ['team-toggle-active', 'border-left'].join(' ')
            : 'team-toggle-inactive'
        }`}
        style={{
          color: home.color,
          backgroundColor: home.background
        }}
        onClick={() => setActiveSide(Side.HOME)}
      >
        {home.name}
      </div>
    </div>
  )
}

export default TeamToggles

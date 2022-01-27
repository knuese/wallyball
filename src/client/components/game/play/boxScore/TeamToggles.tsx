import { FC } from 'react'
import { Side } from '../../../../store/types/team'

export type TeamToggleProps = {
  activeSide: Side
  setActiveSide: (side: Side) => void
}

export const TeamToggles: FC<TeamToggleProps> = ({
  activeSide,
  setActiveSide
}) => {
  return (
    <div className="flex-row team-toggles">
      <div
        className={`team-toggle border-top border-bottom ${
          activeSide === Side.AWAY
            ? ['team-toggle-active', 'border-right'].join(' ')
            : 'team-toggle-inactive'
        }`}
        style={{
          color: '#DEB887', // away.secondaryColor,
          backgroundColor: '#841B2D' // away.primaryColor
        }}
        onClick={() => setActiveSide(Side.AWAY)}
      >
        Bears
      </div>
      <div
        className={`team-toggle border-top border-bottom ${
          activeSide === Side.HOME
            ? ['team-toggle-active', 'border-left'].join(' ')
            : 'team-toggle-inactive'
        }`}
        style={{
          color: '#A7FC00', // home.secondaryColor,
          backgroundColor: '#007F5C' // home.primaryColor
        }}
        onClick={() => setActiveSide(Side.HOME)}
      >
        Turtles
      </div>
    </div>
  )
}

export default TeamToggles

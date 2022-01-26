import { FC, useState } from 'react'
import { Innings } from '.'
import { Side } from '../../../../store/types/team'

export const BoxScore: FC = () => {
  const [activeSide, setActiveSide] = useState(Side.AWAY)
  console.log(activeSide)

  return (
    <div className="flex-column">
      <Innings />
      <div className="flex-row team-toggles">
        <div
          className={`team-toggle ${
            activeSide === Side.AWAY
              ? 'team-toggle-active'
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
          className={`team-toggle ${
            activeSide === Side.HOME
              ? 'team-toggle-active'
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
    </div>
  )
}

export default BoxScore

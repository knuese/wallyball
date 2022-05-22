import { FC } from 'react'
import { Team } from '../../../model'
import { Roster, StarterTable } from '.'

export type TeamSetupProps = {
  team: Team | undefined
  isHome?: boolean
  invalid?: boolean
}

export const TeamSetup: FC<TeamSetupProps> = ({ team, isHome, invalid }) => {
  return (
    <div className="team-view margin-1 solid-border">
      {team && (
        <>
          <p
            className="team-title"
            style={{
              color: team.secondaryColor,
              backgroundColor: team.primaryColor
            }}
          >
            {team.name}
          </p>
          <div className="flex-column">
            <Roster players={team.getRoster()} />
            <div className="starters">
              <span className="sub-label">Starting Lineup</span>
              <StarterTable players={team.getRoster()} isHome={isHome} />
            </div>
          </div>
        </>
      )}
      {invalid &&
        'Please ensure all positions are filled before starting the game!'}
    </div>
  )
}

export default TeamSetup

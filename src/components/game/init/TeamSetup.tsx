import { FC } from 'react'
import { Defense, Lineup, Team } from '../../../model'
import { Roster, StarterTable } from '.'

export type TeamSetupProps = {
  team: Team
}

export const TeamSetup: FC<TeamSetupProps> = ({ team }) => {
  const onLineupChanged = (lineup: Lineup, defense: Defense) => {
    if (new Set(Object.values(defense)).size < 9) {
      team.clearStarters()
    } else {
      team.setStarters(
        Object.entries(lineup)
          .sort(([one, _o], [two, _t]) => Number(one) - Number(two))
          .map(([_, playerId]) => ({
            playerId,
            position: defense[playerId]
          }))
      )
    }
  }

  return (
    <div className="team-view margin-1 solid-border">
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
          <StarterTable
            players={team.getRoster()}
            onLineupChanged={onLineupChanged}
          />
        </div>
      </div>
    </div>
  )
}

export default TeamSetup

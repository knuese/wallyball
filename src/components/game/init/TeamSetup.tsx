import { FC } from 'react'
import { useDispatch } from 'react-redux'
import { Team } from '../../../model'
import { clearTeam, readTeamFile } from '../../../store/actions/team/team'
import { Dropzone } from '../..'
import { Roster, StarterTable } from '.'

export type TeamSetupProps = {
  isHome?: boolean
  invalid?: boolean
  team: Team | null | undefined
}

export const TeamSetup: FC<TeamSetupProps> = ({ isHome, invalid, team }) => {
  const dispatch = useDispatch()

  const onFileLoaded = (file: File) => {
    dispatch(readTeamFile(file, isHome))
  }

  const onFileRemoved = () => {
    dispatch(clearTeam(isHome))
  }

  const fileUploadMsg = (
    <p>
      Select a file for the{' '}
      <b data-testid="upload-team">{`${isHome ? 'Home' : 'Away'}`}</b> team.
    </p>
  )

  return (
    <div className="team-view margin-1 solid-border">
      <Dropzone
        onFileLoaded={onFileLoaded}
        onFileRemoved={onFileRemoved}
        instructionMessage={fileUploadMsg}
      />
      <p
        className="team-title"
        style={{
          color: team?.secondaryColor,
          backgroundColor: team?.primaryColor
        }}
      >
        {team?.name}
      </p>
      {team && team?.getPlayerList().length && (
        <div className="flex-column">
          <Roster players={team.getPlayerList()} />
          <div className="starters">
            <span className="sub-label">Starting Lineup</span>
            <StarterTable players={team.getPlayerList()} isHome={isHome} />
          </div>
        </div>
      )}
      {invalid &&
        'Please ensure all positions are filled before starting the game!'}
    </div>
  )
}

export default TeamSetup

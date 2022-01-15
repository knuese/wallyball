import { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearTeam, readTeamFile } from '../../../store/actions/team/team'
import { RootState } from '../../../store/reducers'
import { Dropzone } from '../..'
import { Roster, StarterTable } from '.'

export type TeamSetupProps = {
  isHome?: boolean
  invalid?: boolean
}

export const TeamSetup: FC<TeamSetupProps> = ({ isHome, invalid }) => {
  const dispatch = useDispatch()
  const {
    name: teamName,
    primaryColor,
    secondaryColor,
    players
  } = useSelector((state: RootState) => state.teams[isHome ? 'home' : 'away'])

  const onFileLoaded = (file: File) => {
    dispatch(readTeamFile(file, isHome))
  }

  const onFileRemoved = () => {
    dispatch(clearTeam(isHome))
  }

  const fileUploadMsg = (
    <p>
      Select a file for the <b>{`${isHome ? 'Home' : 'Away'}`}</b> team.
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
        style={{ color: secondaryColor, backgroundColor: primaryColor }}
      >
        {teamName}
      </p>
      {Boolean(players?.length) && (
        <div className="flex-column">
          <Roster players={players} />
          <div className="starters">
            <span className="sub-label">Starting Lineup</span>
            <StarterTable players={players} isHome={isHome} />
          </div>
        </div>
      )}
      {invalid &&
        'Please ensure all positions are filled before starting the game!'}
    </div>
  )
}

export default TeamSetup

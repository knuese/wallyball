import { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dropzone } from '..'
import { readTeamFile } from '../../store/actions/team/team'
import { RootState } from '../../store/reducers'

export type TeamViewProps = {
  isHome?: boolean
}

export const TeamView: FC<TeamViewProps> = ({ isHome }) => {
  const dispatch = useDispatch()
  const { name: teamName, players } = useSelector(
    (state: RootState) => state.teams[isHome ? 'home' : 'away']
  )

  const onFileLoaded = (file: File) => {
    dispatch(readTeamFile(file, isHome))
  }

  const fileUploadMsg = (
    <p>
      Select a file for the <b>{`${isHome ? 'Home' : 'Away'}`}</b> team.
    </p>
  )

  return (
    <div
      style={{
        width: '50%',
        textAlign: 'center',
        border: '1px solid black',
        margin: '1rem'
      }}
    >
      <Dropzone
        onFileLoaded={onFileLoaded}
        instructionMessage={fileUploadMsg}
      />
      <p>{teamName}</p>
      {players.map((p) => (
        <p key={p.name}>{JSON.stringify(p)}</p>
      ))}
    </div>
  )
}

export default TeamView

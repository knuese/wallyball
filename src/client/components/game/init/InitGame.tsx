import { FC } from 'react'
import { Dropzone } from '../..'

export const InitGame: FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Dropzone
        instructionMessage={
          <p>
            Select a file for the <b>Away</b> team.
          </p>
        }
      />
      <Dropzone
        instructionMessage={
          <p>
            Select a file for the <b>Home</b> team.
          </p>
        }
      />
    </div>
  )
}

export default InitGame

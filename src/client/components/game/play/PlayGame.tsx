import { FC } from 'react'
import { BoxScore, Field, PlayDescriptor } from '.'

export const PlayGame: FC = () => {
  return (
    <div className="flex-column" style={{ flexBasis: 0 }}>
      <div className="flex-row" style={{ display: 'inline-flex' }}>
        <span className="margin-right-full">
          <Field />
        </span>
        <BoxScore />
      </div>
      <PlayDescriptor text='Bo Bo doubled.' />
    </div>
  )
}

export default PlayGame

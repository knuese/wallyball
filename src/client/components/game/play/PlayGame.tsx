import { FC } from 'react'
import { BoxScore, Field } from '.'

export const PlayGame: FC = () => {
  return (
    <div className="flex-row">
      <span className="margin-right-full">
        <Field />
      </span>
      <BoxScore />
    </div>
  )
}

export default PlayGame

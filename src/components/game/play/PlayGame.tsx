import { FC } from 'react'
import { BoxScore, Field, GameInfo } from '.'

export const PlayGame: FC = () => {
  return (
    <div className="flex-column" style={{ flexBasis: 0 }}>
      <div className="flex-row" style={{ display: 'inline-flex' }}>
        <span className="margin-right-full">
          <Field />
        </span>
        <span className="margin-right-full">
          <GameInfo />
        </span>
        <BoxScore />
      </div>
    </div>
  )
}

export default PlayGame

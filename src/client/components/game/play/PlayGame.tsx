import { FC } from 'react'
import { Field, Innings } from '.'

export const PlayGame: FC = () => {
  return (
    <div className="flex-row">
      <span className='margin-right-full'><Field /></span>
      <Innings />
    </div>
  )
}

export default PlayGame

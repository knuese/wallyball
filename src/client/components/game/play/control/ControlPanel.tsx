import { FC } from 'react'
import { CurrentPlayer } from '.'
import { bears, turtles } from '../boxScore/sample'

export const ControlPanel: FC = () => {
  return (
    <div className="flex-column border-all">
      <CurrentPlayer
        isBatting
        name="Sparey"
        color={bears.color}
        background={bears.background}
        stats={{
          today: '1-4, HR, RBI',
          season: {
            AVG: '0.265',
            HR: '4',
            RBI: '16'
          }
        }}
      />
      <div className='border-bottom' />
      <CurrentPlayer
        name="Shells"
        color={turtles.color}
        background={turtles.background}
        stats={{
          today: '0.2 IP, 0 R, 0 ER, 2 K',
          season: {
            IP: '14.0',
            BB: '2',
            K: '14',
            ERA: '1.07'
          }
        }}
      />
    </div>
  )
}

export default ControlPanel

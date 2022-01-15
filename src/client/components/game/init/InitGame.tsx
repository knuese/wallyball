import { FC, useState } from 'react'
import { useTeam } from '../../../../hooks'
import { Side } from '../../../store/types/team'
import { TeamSetup } from '.'

export const InitGame: FC = () => {
  const [awayLineup, awayDefense] = useTeam(Side.AWAY)
  const [homeLineup, homeDefense] = useTeam(Side.HOME)
  const [awayInvalid, setAwayInvalid] = useState(false)
  const [homeInvalid, setHomeInvalid] = useState(false)

  const awayLineupFull = Object.values(awayLineup).filter((v) => v).length === 9
  const homeLineupFull = Object.values(homeLineup).filter((v) => v).length === 9
  const canSubmit = awayLineupFull && homeLineupFull

  const submit = () => {
    setAwayInvalid(new Set(Object.values(awayDefense)).size !== 9)
    setHomeInvalid(new Set(Object.values(homeDefense)).size !== 9)

    if (!awayInvalid && !homeInvalid) {
      console.log('submitting!')
    }
  }

  return (
    <div className="flex-column center">
      <div className="flex-row">
        <TeamSetup invalid={awayInvalid} />
        <TeamSetup isHome invalid={homeInvalid} />
      </div>
      <button disabled={!canSubmit} className="submit-button" onClick={submit}>
        Submit
      </button>
    </div>
  )
}

export default InitGame

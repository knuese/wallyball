import { FC, useEffect, useState } from 'react'
import { useTeam } from '../../../hooks'
import { Side } from '../../../store/types/team'
import { TeamSetup } from '.'
import { isLineupFull, isDefenseValid } from '../../../util'

export const InitGame: FC = () => {
  const {
    lineup: awayLineup,
    defense: awayDefense,
    ...awayRest
  } = useTeam(Side.AWAY)

  const {
    lineup: homeLineup,
    defense: homeDefense,
    ...homeRest
  } = useTeam(Side.HOME)

  const [awayInvalid, setAwayInvalid] = useState(false)
  const [homeInvalid, setHomeInvalid] = useState(false)
  const [canSubmit, setCanSubmit] = useState(false)

  useEffect(() => {
    setCanSubmit(isLineupFull(awayLineup) && isLineupFull(homeLineup))
  }, [awayLineup, homeLineup])

  const submit = () => {
    setAwayInvalid(!isDefenseValid(awayDefense))
    setHomeInvalid(!isDefenseValid(homeDefense))

    if (!awayInvalid && !homeInvalid) {
      console.log('submitting!')
    }
  }

  return (
    <div className="flex-column center">
      <div className="flex-row">
        <TeamSetup invalid={awayInvalid} teamData={awayRest} />
        <TeamSetup isHome invalid={homeInvalid} teamData={homeRest} />
      </div>
      <button disabled={!canSubmit} className="submit-button" onClick={submit}>
        Submit
      </button>
    </div>
  )
}

export default InitGame

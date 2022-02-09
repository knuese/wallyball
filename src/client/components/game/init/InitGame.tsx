import { FC, useState } from 'react'
import { useTeam } from '../../../hooks'
import { Defense, Lineup, Side } from '../../../store/types/team'
import { TeamSetup } from '.'

export const InitGame: FC = () => {
  const { lineup: awayLineup, defense: awayDefense } = useTeam(Side.AWAY)
  const { lineup: homeLineup, defense: homeDefense } = useTeam(Side.HOME)
  const [awayInvalid, setAwayInvalid] = useState(false)
  const [homeInvalid, setHomeInvalid] = useState(false)

  const isFull = (lineup: Lineup) =>
    Object.values(lineup).filter((v) => v).length === 9
  const canSubmit = isFull(awayLineup) && isFull(homeLineup)

  const submit = () => {
    const isValidDefense = (defense: Defense) =>
      new Set(Object.values(defense)).size === 9
    setAwayInvalid(isValidDefense(awayDefense))
    setHomeInvalid(isValidDefense(homeDefense))

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

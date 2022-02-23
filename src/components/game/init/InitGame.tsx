import { FC, useEffect, useState } from 'react'
import { useTeam } from '../../../hooks'
import { Side } from '../../../model'
import { TeamSetup } from '.'

export const InitGame: FC = () => {
  const { isSet: isAwaySet, team: away } = useTeam(Side.AWAY)
  const { isSet: isHomeSet, team: home } = useTeam(Side.HOME)
  const [canSubmit, setCanSubmit] = useState(false)

  useEffect(() => {
    setCanSubmit(isAwaySet && isHomeSet)
  }, [isAwaySet, isHomeSet])

  const submit = () => {
    console.log('submitting!')
  }

  return (
    <div className="flex-column center">
      <div className="flex-row">
        <TeamSetup team={away} />
        <TeamSetup isHome team={home} />
      </div>
      <button disabled={!canSubmit} className="submit-button" onClick={submit}>
        Submit
      </button>
    </div>
  )
}

export default InitGame

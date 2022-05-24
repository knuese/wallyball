import { FC, useEffect, useState } from 'react'
import hash from 'object-hash'
import { IconContext } from 'react-icons'
import { MdSwapHoriz as SwapIcon } from 'react-icons/md'
import { TeamSelect, TeamSetup } from '.'
import { Team } from '../../../model'
import { getTeams } from '../../../config'

export const InitGame: FC = () => {
  const [availableTeams, setAvailableTeams] = useState<Team[]>(getTeams())
  const [away, setAway] = useState<Team>()
  const [home, setHome] = useState<Team>()
  const [canSubmit, setCanSubmit] = useState(false)

  useEffect(() => {
    setAvailableTeams(
      getTeams().filter((t) => ![away?.name, home?.name].includes(t.name))
    )
    setCanSubmit(Boolean(away?.isReady() && home?.isReady()))
  }, [hash(away || {}), hash(home || {})])

  const switchSides = () => {
    const tempAway = away
    setAway(home)
    setHome(tempAway)
  }

  const submit = () => {
    console.log('submitting!')
  }

  return (
    <div className="flex-column center">
      <div className="flex-row team-selects">
        <TeamSelect
          prompt="Select the away team..."
          teams={availableTeams}
          value={away}
          onSelect={(t: Team | undefined) => setAway(t)}
        />
        <IconContext.Provider
          value={{ className: 'switch-sides', size: '2em' }}
        >
          <SwapIcon onClick={switchSides} />
        </IconContext.Provider>
        <TeamSelect
          prompt="Select the home team..."
          teams={availableTeams}
          value={home}
          onSelect={(t: Team | undefined) => setHome(t)}
        />
      </div>
      <div className="flex-column center">
        <div className="flex-row">
          <TeamSetup team={away} />
          <TeamSetup isHome team={home} />
        </div>
        {away && home && (
          <button
            disabled={!canSubmit}
            className="submit-button"
            onClick={submit}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  )
}

export default InitGame

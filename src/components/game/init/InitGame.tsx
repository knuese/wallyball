import { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { IconContext } from 'react-icons'
import { MdSwapHoriz as SwapIcon } from 'react-icons/md'
import { TeamSelect, TeamSetup } from '.'
import { Team } from '../../../model'
import { RootState } from '../../../store/reducers'
import { setTeams } from '../../../store/actions/game'

export const InitGame: FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const teams = useSelector((state: RootState) => state.teams)

  const [availableTeams, setAvailableTeams] = useState<Team[]>([])
  const [away, setAway] = useState<Team>()
  const [home, setHome] = useState<Team>()

  useEffect(() => {
    setAvailableTeams(
      teams.filter((t) => ![away?.name, home?.name].includes(t.name))
    )
  }, [teams.length, away?.name, home?.name])

  const switchSides = () => {
    const tempAway = away
    setAway(home)
    setHome(tempAway)
  }

  const submit = () => {
    if (!away?.isReady() || !home?.isReady()) {
      alert('both teams must have valid lineups to start the game')
    } else {
      dispatch(setTeams(away, home) as any)
      navigate('/game/play', { replace: true })
    }
  }

  return (
    <div className="flex-column center">
      {!!teams.length && (
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
      )}
      {away && home && (
        <div className="flex-column center">
          <div className="flex-row">
            <TeamSetup team={away} />
            <TeamSetup team={home} />
          </div>
          <button className="submit-button" onClick={submit}>
            SUBMIT
          </button>
        </div>
      )}
    </div>
  )
}

export default InitGame

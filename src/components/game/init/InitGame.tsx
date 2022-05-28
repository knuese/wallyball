import { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { IconContext } from 'react-icons'
import hash from 'object-hash'
import { MdSwapHoriz as SwapIcon } from 'react-icons/md'
import { TeamSelect, TeamSetup } from '.'
import { Team } from '../../../model'
import { getTeams } from '../../../config'
import { RootState } from '../../../store/reducers'
import { loadStats } from '../../../store/actions/stats'
import { setTeams } from '../../../store/actions/game'

export const InitGame: FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const stats = useSelector((state: RootState) => state.stats)
  const [allTeams, setAllTeams] = useState<Team[]>([])
  const [availableTeams, setAvailableTeams] = useState<Team[]>([])
  const [away, setAway] = useState<Team>()
  const [home, setHome] = useState<Team>()

  useEffect(() => {
    dispatch(loadStats() as any)
  }, [])

  useEffect(() => {
    if (!allTeams.length && stats) {
      setAllTeams(getTeams(stats))
    }
  }, [hash(stats)])

  useEffect(() => {
    setAvailableTeams(
      allTeams.filter((t) => ![away?.name, home?.name].includes(t.name))
    )
  }, [hash(allTeams), hash(away || {}), hash(home || {})])

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
      {!!allTeams.length && (
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
            Submit
          </button>
        </div>
      )}
    </div>
  )
}

export default InitGame

import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import hash from 'object-hash'
import { BoxScore, Field, GameInfo } from '.'
import { useTeams } from '../../../hooks'

export const PlayGame: FC = () => {
  const teams = useTeams()
  const navigate = useNavigate()

  const teamsSet = () => teams.batting && teams.fielding

  useEffect(() => {
    if (!teamsSet()) {
      navigate('/game/init', { replace: true })
    }
  }, [hash(teams)])

  return (
    teamsSet() && (
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
  )
}

export default PlayGame

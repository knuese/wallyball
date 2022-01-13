import { FC } from 'react'
import { useSelector } from 'react-redux'
import { TeamSetup } from '../..'
import { RootState } from '../../../store/reducers'

export const InitGame: FC = () => {
  const { lineup: awayLineup, defense: awayDefense } = useSelector(
    (state: RootState) => state.teams.home
  )
  const { lineup: homeLineup, defense: homeDefense } = useSelector(
    (state: RootState) => state.teams.home
  )

  const awayLineupFull = Object.values(awayLineup).filter((v) => v).length === 9
  const homeLineupFull = Object.values(homeLineup).filter((v) => v).length === 9
  const canSubmit = awayLineupFull && homeLineupFull

  return (
    <div className="flex-column center">
      <div className="flex-row">
        <TeamSetup />
        <TeamSetup isHome />
      </div>
      <button disabled={!canSubmit} className="submit-button">
        Submit
      </button>
    </div>
  )
}

export default InitGame

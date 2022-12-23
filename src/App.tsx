import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isEmpty } from 'lodash'
import hash from 'object-hash'
import Routes from './routes'
import { loadStandings, loadStats } from './store/actions/stats'
import { RootState } from './store/reducers'
import { getTeams } from './config'
import { loadTeams } from './store/actions/teams'

const App = (): JSX.Element => {
  const dispatch = useDispatch()
  const { individual: playerStats } = useSelector(
    (state: RootState) => state.stats
  )

  useEffect(() => {
    dispatch(loadStats() as any)
    dispatch(loadStandings() as any)
  }, [])

  useEffect(() => {
    if (!isEmpty(playerStats)) {
      dispatch(loadTeams(getTeams(playerStats)) as any)
    }
  }, [hash(playerStats)])

  return <Routes />
}

export default App

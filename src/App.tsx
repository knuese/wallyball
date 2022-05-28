import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Routes from './routes'
import { loadStats } from './store/actions/stats'
import { RootState } from './store/reducers'
import { getTeams } from './config'
import { loadTeams } from './store/actions/teams'

const App = (): JSX.Element => {
  const dispatch = useDispatch()
  const stats = useSelector((state: RootState) => state.stats)

  useEffect(() => {
    dispatch(loadStats() as any)
  }, [])

  useEffect(() => {
    if (stats) {
      dispatch(loadTeams(getTeams(stats)) as any)
    }
  }, [stats])

  return <Routes />
}

export default App

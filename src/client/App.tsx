import { Provider } from 'react-redux'
import { hot } from 'react-hot-loader/root'
import store from './store'
import Routes from './routes'

const App = (): JSX.Element => (
  <Provider store={store}>
    <Routes />
  </Provider>
)

export default hot(App)

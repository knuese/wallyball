import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducers'

const store = createStore(
  rootReducer,
  undefined,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
)

export default store

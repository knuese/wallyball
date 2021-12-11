import { useDispatch } from 'react-redux'
import { ReduxDispatch } from '../types'

export const useReduxDispatch: ReduxDispatch = () =>
  useDispatch<ReduxDispatch>()

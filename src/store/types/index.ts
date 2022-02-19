import { Action, AnyAction } from 'redux'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { RootState } from '../reducers'

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

export type ReduxDispatch = ThunkDispatch<RootState, any, AnyAction>

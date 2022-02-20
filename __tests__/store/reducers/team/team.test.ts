import reducer, { initialState } from '../../../../src/store/reducers/team/team'
import {
  CLEAR_TEAM,
  LOAD_TEAM,
  SET_STARTERS_FAILURE,
  SET_STARTERS_SUCCESS
} from '../../../../src/store/types/team'
import { team } from '../../../../__test_data__'

describe('team reducer', () => {
  it('returns the initial state for an invalid action', () => {
    expect(reducer(undefined, {} as any)).toEqual(initialState)
  })

  it('handles LOAD_TEAM', () => {
    expect(reducer(undefined, { type: LOAD_TEAM, payload: team })).toEqual({
      ...initialState,
      team
    })
  })

  it('handles SET_STARTERS_SUCCESS', () => {
    expect(reducer(undefined, { type: SET_STARTERS_SUCCESS })).toEqual({
      ...initialState,
      isSet: true
    })
  })

  it('handles SET_STARTERS_FAILURE', () => {
    const error = new Error('invalid starters provided')
    expect(
      reducer(undefined, { type: SET_STARTERS_FAILURE, payload: error })
    ).toEqual({
      ...initialState,
      isSet: false,
      error
    })
  })

  it('handles CLEAR_TEAM', () => {
    expect(reducer({ team } as any, { type: CLEAR_TEAM })).toEqual(initialState)
  })
})

import reducer, {
  initialState
} from '../../../../../src/client/store/reducers/team/team'
import {
  CLEAR_TEAM,
  LOAD_TEAM,
  SET_TEAM
} from '../../../../../src/client/store/types/team'

describe('team reducer', () => {
  it('returns the initial state for an invalid action', () => {
    expect(reducer(undefined, {} as any)).toEqual(initialState)
  })

  it('handles LOAD_TEAM', () => {
    const payload = {
      name: 'Bears',
      primaryColor: 'red',
      secondaryColor: 'brown',
      players: [{ name: 'Bo Bo' }, { name: 'Cupcake' }]
    }

    expect(reducer(undefined, { type: LOAD_TEAM, payload })).toEqual({
      ...initialState,
      ...payload,
      players: payload.players.map((p) =>
        expect.objectContaining({ ...p, id: expect.any(String) })
      )
    })
  })

  it('handles SET_TEAM', () => {
    const payload = {
      lineup: ['Zoona', 'Chan', 'Guss'],
      defense: {
        'CF': 'Zoona',
        'LF': 'Chan',
        '3B': 'Guss'
      }
    }

    expect(reducer(undefined, { type: SET_TEAM, payload })).toEqual({
      ...initialState,
      ...payload
    })
  })

  it('handles CLEAR_TEAM', () => {
    const state = {
      name: 'Bears',
      primaryColor: 'red',
      secondaryColor: 'brown'
    }

    expect(reducer(state as any, { type: CLEAR_TEAM })).toEqual(initialState)
  })
})

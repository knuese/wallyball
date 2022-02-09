import { AnyAction } from 'redux'
import configureMockStore from 'redux-mock-store'
import thunk, { ThunkDispatch } from 'redux-thunk'
import {
  clearTeam,
  readTeamFile,
  setTeam
} from '../../../../../src/client/store/actions/team/team'
import {
  CLEAR_TEAM,
  LOAD_TEAM,
  SET_TEAM,
  Side,
  TeamState
} from '../../../../../src/client/store/types/team'
import { defense, lineup } from '../../../../../__test_data__/client'

const mockStore = configureMockStore<
  TeamState,
  ThunkDispatch<TeamState, void, AnyAction>
>([thunk])

describe('team actions', () => {
  describe('readTeamFile', () => {
    it.each([
      ['away', false, Side.AWAY],
      ['home', true, Side.HOME]
    ])(
      'loads %s team data from a file',
      async (_desc, isHome, expectedSide) => {
        const name = 'Turtles'
        const primaryColor = 'green'
        const secondaryColor = 'blue'
        const players = [{ name: 'Glen' }]
        const mockFile = {
          text: jest
            .fn()
            .mockResolvedValue(
              JSON.stringify({ name, primaryColor, secondaryColor, players })
            )
        } as any as File

        const store = mockStore()
        await store.dispatch(readTeamFile(mockFile, isHome))

        expect(store.getActions()).toEqual([
          {
            type: LOAD_TEAM,
            side: expectedSide,
            payload: {
              name,
              primaryColor,
              secondaryColor,
              players
            }
          }
        ])
      }
    )
  })

  describe('setTeam', () => {
    it.each([
      ['away', false, Side.AWAY],
      ['home', true, Side.HOME]
    ])('sets %s team data', (_desc, isHome, expectedSide) => {
      const store = mockStore()
      store.dispatch(setTeam(lineup, defense, isHome))
      expect(store.getActions()).toEqual([
        {
          type: SET_TEAM,
          side: expectedSide,
          payload: { lineup, defense }
        }
      ])
    })
  })

  describe('clearTeam', () => {
    it.each([
      ['away', false, Side.AWAY],
      ['home', true, Side.HOME]
    ])('clears the %s team data', (_desc, isHome, expectedSide) => {
      const store = mockStore()
      store.dispatch(clearTeam(isHome))
      expect(store.getActions()).toEqual([
        {
          type: CLEAR_TEAM,
          side: expectedSide,
          payload: {}
        }
      ])
    })
  })
})

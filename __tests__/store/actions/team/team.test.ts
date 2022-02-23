import { AnyAction } from 'redux'
import configureMockStore from 'redux-mock-store'
import thunk, { ThunkDispatch } from 'redux-thunk'
import { Side, Team } from '../../../../src/model'
import {
  clearTeam,
  readTeamFile,
  setTeam
} from '../../../../src/store/actions/team/team'
import { RootState } from '../../../../src/store/reducers'
import {
  CLEAR_TEAM,
  LOAD_TEAM,
  SET_STARTERS_SUCCESS,
  TeamState
} from '../../../../src/store/types/team'
import { defense, lineup, playersFromFile } from '../../../../__test_data__'

const mockStore = configureMockStore<
  RootState,
  ThunkDispatch<RootState, void, AnyAction>
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
        const mockFile = {
          text: jest.fn().mockResolvedValue(
            JSON.stringify({
              name,
              primaryColor,
              secondaryColor,
              players: playersFromFile
            })
          )
        } as any as File

        const store = mockStore()
        await store.dispatch(readTeamFile(mockFile, isHome))

        expect(store.getActions()).toEqual([
          {
            type: LOAD_TEAM,
            side: expectedSide,
            payload: expect.objectContaining({
              name,
              primaryColor,
              secondaryColor,
              players: expect.any(Object)
            })
          }
        ])
      }
    )
  })

  describe('setTeam', () => {
    const mockAway = { setStarters: jest.fn() } as any as Team
    const mockHome = { setStarters: jest.fn() } as any as Team

    it.each([
      ['away', false, Side.AWAY],
      ['home', true, Side.HOME]
    ])('sets %s team data', (_desc, isHome, expectedSide) => {
      const store = mockStore({
        teams: {
          away: { team: mockAway } as TeamState,
          home: { team: mockHome } as TeamState
        }
      })
      store.dispatch(setTeam(lineup, defense, isHome))
      expect(store.getActions()).toEqual([
        {
          type: SET_STARTERS_SUCCESS,
          side: expectedSide,
          payload: {}
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

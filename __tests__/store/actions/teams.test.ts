import { mockStore } from '__test_utils__'
import { away, home } from '__test_data__'
import { loadTeams } from '../../../src/store/actions/teams'
import { TeamActionTypes } from '../../../src/store/types/teams'

describe('team actions', () => {
  describe('loadTeams', () => {
    it('loads the teams', () => {
      const store = mockStore<TeamActionTypes>()
      store.dispatch(loadTeams([away, home]))
      expect(store.getActions()).toEqual([
        { type: 'LOAD_TEAMS', payload: [away, home] }
      ])
    })
  })
})

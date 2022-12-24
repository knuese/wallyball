import '@testing-library/jest-dom'
import { renderWithRouter as render, waitFor } from '__test_utils__'
import App from '../src/App'
import { getTeams } from '../src/config'
import { sampleBatting, samplePitching } from './__test_data__/stats'

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  HashRouter: jest.fn(({ children }) => <>{children}</>)
}))

jest.mock('../src/util/fs', () => ({
  readFile: () => JSON.stringify({})
}))

jest.mock('../src/config')

describe('<App />', () => {
  it('renders the component', () => {
    const { getByText } = render(<App />, { route: '/' })
    expect(getByText('Wally Ball')).toBeInTheDocument()
  })

  it('loads teams when there are stats', async () => {
    const individualStats = {
      player1: { batting: sampleBatting, pitching: samplePitching }
    }
    render(<App />, {
      state: {
        stats: { individual: individualStats }
      }
    })

    await waitFor(() => {
      expect(getTeams).toHaveBeenCalledWith(individualStats)
    })
  })
})

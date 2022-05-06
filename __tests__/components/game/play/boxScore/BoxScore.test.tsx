import '@testing-library/jest-dom'
import {
  fireEvent,
  renderWithState as render
} from '../../../../../__test_utils__'
import { BoxScore } from '../../../../../src/components/game'
import { away, home } from '../../../../../__test_data__'

describe('<BoxScore />', () => {
  it('renders the component', () => {
    const { getAllByText } = render(<BoxScore />)
    expect(getAllByText(away.name).length).toBeGreaterThanOrEqual(1)
    expect(getAllByText(home.name).length).toBeGreaterThanOrEqual(1)
  })

  it('toggles the stats', () => {
    const { getByTestId, getByText, getAllByText } = render(<BoxScore />)
    fireEvent.click(getByTestId('home-toggle'))

    const playerList = home.getRoster()
    const nonPitcher = playerList.filter((p) => !p.canPlay('P'))
    const pitcher = playerList.filter((p) => p.canPlay('P'))[0]

    nonPitcher.forEach(({ name }) => {
      expect(getByText(name)).toBeInTheDocument()
    })

    // pitcher appears in both the batting order and the pitching stats
    expect(getAllByText(pitcher.name)).toHaveLength(2)
  })
})

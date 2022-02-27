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
    const { getByTestId, getByText } = render(<BoxScore />)
    fireEvent.click(getByTestId('home-toggle'))

    Object.values(home.players).forEach(({ name }) => {
      expect(getByText(name)).toBeInTheDocument()
    })
  })
})

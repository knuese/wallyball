import '@testing-library/jest-dom'
import { fireEvent, renderWithRouter as render } from '../../../__test_utils__'
import { HomeScreen } from '../../../src/components'

const mockNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}))

describe('<HomeScreen />', () => {
  it('renders the component', () => {
    const { getByText } = render(<HomeScreen />)
    expect(getByText('Wally Ball')).toBeInTheDocument()
  })

  it('clicks the button for a new game', () => {
    const { getByText } = render(<HomeScreen />)
    fireEvent.click(getByText('New Game'))
    expect(mockNavigate).toHaveBeenCalledWith('/game/init')
  })
})

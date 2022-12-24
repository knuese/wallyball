import '@testing-library/jest-dom'
import { fireEvent, renderWithRouter as render } from '__test_utils__'
import { HomeScreen } from '../../../src/components'

const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockNavigate
}))

describe('<HomeScreen />', () => {
  it('renders the component', () => {
    const { getByText } = render(<HomeScreen />)
    expect(getByText('Wally Ball')).toBeInTheDocument()
  })

  it.each([
    ['New Game', '/game/init'],
    ['View Stats', '/stats']
  ])('clicks "%s"', (textToClick, expectedPath) => {
    const { getByText } = render(<HomeScreen />)
    fireEvent.click(getByText(textToClick))
    expect(mockNavigate).toHaveBeenCalledWith(expectedPath)
  })
})

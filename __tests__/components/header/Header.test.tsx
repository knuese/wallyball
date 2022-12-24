import '@testing-library/jest-dom'
import { fireEvent, renderWithRouter } from '__test_utils__'
import { Header } from '../../../src/components'

const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}))

describe('<Header />', () => {
  beforeEach(() => {
    mockNavigate.mockReset()
  })

  it('renders the component', () => {
    const { getByText } = renderWithRouter(<Header />)
    expect(getByText('WallyBall')).toBeInTheDocument()
  })

  it.each([
    ['WallyBall', ['/', { replace: true }]],
    ['New Game', ['/game/init', { replace: true }]],
    ['Stats', ['/stats', { replace: true }]]
  ])('clicks "%s"', (textToClick, navigatePayload) => {
    const { getByText } = renderWithRouter(<Header />)
    fireEvent.click(getByText(textToClick))
    expect(mockNavigate).toHaveBeenCalledTimes(1)
    expect(mockNavigate).toHaveBeenCalledWith(...navigatePayload)
  })
})

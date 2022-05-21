import '@testing-library/jest-dom'
import { renderWithRouter as render } from '../../../../__test_utils__'
import { PlayGame } from '../../../../src/components'
import { sampleState } from '../../../../__test_data__'

const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockNavigate
}))

describe('<PlayGame />', () => {
  it('renders the component', () => {
    const { container } = render(<PlayGame />, { route: '/game/play' })
    expect(container.querySelector('.field-container')).toBeInTheDocument()
    expect(container.querySelector('.box-score')).toBeInTheDocument()
  })

  it('redirects if the teams are not set', () => {
    render(<PlayGame />, {
      route: '/game/play',
      state: {
        ...sampleState,
        game: { ...sampleState.game, away: null, home: null }
      }
    })

    expect(mockNavigate).toHaveBeenCalledWith('/game/init', { replace: true })
  })
})

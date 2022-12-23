import '@testing-library/jest-dom'
import { fireEvent, renderWithRouter as render } from '__test_utils__'
import { InitGame } from '../../../../src/components/game/init'
import { away, home } from '__test_data__'
import { Team } from '../../../../src/model'

const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}))

describe('<InitGame />', () => {
  const mockTeam = (name: string, isReady = false): Team =>
    ({
      name,
      getRoster: () => [],
      getDefaultLineup: () => [],
      clearStarters: () => undefined,
      isReady: () => isReady
    } as any)

  it('renders the component', () => {
    const { getByText } = render(<InitGame />)
    expect(getByText('Select the away team...')).toBeInTheDocument()
    expect(getByText('Select the home team...')).toBeInTheDocument()
  })

  it('selects teams', () => {
    const { container, getAllByTestId } = render(<InitGame />)
    const [awaySelect, homeSelect] = getAllByTestId('team-select')

    fireEvent.change(awaySelect, { target: { value: away.name } })
    fireEvent.change(homeSelect, { target: { value: home.name } })

    const [awayTitle, homeTitle] = container.querySelectorAll('.team-title')
    expect(awayTitle).toHaveTextContent(away.name)
    expect(homeTitle).toHaveTextContent(home.name)

    // switch sides
    fireEvent.click(container.querySelector('.switch-sides') as Element)

    expect(awayTitle).toHaveTextContent(home.name)
    expect(homeTitle).toHaveTextContent(away.name)
  })

  it('submits', () => {
    const teamOne = mockTeam('teamOne', true)
    const teamTwo = mockTeam('teamTwo', true)

    const { getAllByTestId, getByText } = render(<InitGame />, {
      state: { teams: [teamOne, teamTwo] }
    })

    const [awaySelect, homeSelect] = getAllByTestId('team-select')
    fireEvent.change(awaySelect, { target: { value: teamOne.name } })
    fireEvent.change(homeSelect, { target: { value: teamTwo.name } })
    fireEvent.click(getByText('SUBMIT'))

    expect(mockNavigate).toHaveBeenCalledTimes(1)
    expect(mockNavigate).toHaveBeenCalledWith('/game/play', { replace: true })
  })

  it('clicks the submit button when the teams are not ready', () => {
    const teamOne = mockTeam('teamOne')
    const teamTwo = mockTeam('teamTwo')

    const alertSpy = jest
      .spyOn(window, 'alert')
      .mockImplementation(() => undefined)

    const { getAllByTestId, getByText } = render(<InitGame />, {
      state: { teams: [teamOne, teamTwo] }
    })
    const [awaySelect, homeSelect] = getAllByTestId('team-select')

    fireEvent.change(awaySelect, { target: { value: teamOne.name } })
    fireEvent.change(homeSelect, { target: { value: teamTwo.name } })
    fireEvent.click(getByText('SUBMIT'))

    expect(alertSpy).toHaveBeenCalledWith(
      'both teams must have valid lineups to start the game'
    )
  })
})

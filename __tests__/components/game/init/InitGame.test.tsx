import '@testing-library/jest-dom'
import {
  fireEvent,
  renderWithState as render
} from '../../../../__test_utils__'
import { InitGame } from '../../../../src/components/game/init'
import { getTeams } from '../../../../src/config'
import { away, home } from '../../../../__test_data__'

jest.mock('../../../../src/config')

describe('<InitGame />', () => {
  const mockTeam = (name: string, isReady = false) => ({
    name,
    getRoster: () => [],
    clearStarters: () => undefined,
    isReady: () => isReady
  })

  beforeEach(() => {
    ;(getTeams as jest.Mock).mockReturnValue([away, home])
  })

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
    fireEvent.click(container.querySelector('.switch-sides'))

    expect(awayTitle).toHaveTextContent(home.name)
    expect(homeTitle).toHaveTextContent(away.name)
  })

  it('submits', () => {
    const teamOne = mockTeam('teamOne', true)
    const teamTwo = mockTeam('teamTwo', true)
    ;(getTeams as jest.Mock).mockReturnValue([teamOne, teamTwo])

    const { getAllByTestId, getByText } = render(<InitGame />)
    const [awaySelect, homeSelect] = getAllByTestId('team-select')

    fireEvent.change(awaySelect, { target: { value: teamOne.name } })
    fireEvent.change(homeSelect, { target: { value: teamTwo.name } })
    fireEvent.click(getByText('Submit'))
  })

  it('clicks the submit button when the teams are not ready', () => {
    const teamOne = mockTeam('teamOne')
    const teamTwo = mockTeam('teamTwo')
    ;(getTeams as jest.Mock).mockReturnValue([teamOne, teamTwo])

    const alertSpy = jest
      .spyOn(window, 'alert')
      .mockImplementation(() => undefined)

    const { getAllByTestId, getByText } = render(<InitGame />)
    const [awaySelect, homeSelect] = getAllByTestId('team-select')

    fireEvent.change(awaySelect, { target: { value: teamOne.name } })
    fireEvent.change(homeSelect, { target: { value: teamTwo.name } })
    fireEvent.click(getByText('Submit'))

    expect(alertSpy).toHaveBeenCalledWith(
      'both teams must have valid lineups to start the game'
    )
  })
})

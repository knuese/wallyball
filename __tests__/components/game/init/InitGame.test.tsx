import '@testing-library/jest-dom'
import {
  fireEvent,
  renderWithState as render
} from '../../../../__test_utils__'
import { InitGame } from '../../../../src/components/game/init'
import { teams } from '../../../../src/config'

describe('<InitGame />', () => {
  it('renders the component', () => {
    const { getByText } = render(<InitGame />)
    expect(getByText('Select the away team...')).toBeInTheDocument()
    expect(getByText('Select the home team...')).toBeInTheDocument()
  })

  it('selects teams', () => {
    const [teamOne, teamTwo] = teams
    const { container, getAllByTestId } = render(<InitGame />)
    const [awaySelect, homeSelect] = getAllByTestId('team-select')

    fireEvent.change(awaySelect, { target: { value: teamOne.name } })
    fireEvent.change(homeSelect, { target: { value: teamTwo.name } })

    const [awayTitle, homeTitle] = container.querySelectorAll('.team-title')
    expect(awayTitle).toHaveTextContent(teamOne.name)
    expect(homeTitle).toHaveTextContent(teamTwo.name)

    // switch sides
    fireEvent.click(container.querySelector('.switch-sides'))

    expect(awayTitle).toHaveTextContent(teamTwo.name)
    expect(homeTitle).toHaveTextContent(teamOne.name)
  })
})

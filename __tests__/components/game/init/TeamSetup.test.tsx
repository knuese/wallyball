import '@testing-library/jest-dom'
import { renderWithState as render } from '../../../../__test_utils__'
import { TeamSetup } from '../../../../src/components/game/init'
import { away } from '../../../../__test_data__'

describe('<TeamSetup />', () => {
  it('renders the component', () => {
    const { getByText } = render(<TeamSetup team={away} />)
    expect(getByText(away.name)).toBeInTheDocument()
  })

  it('does not display anything when no team is provided', () => {
    const { container } = render(<TeamSetup team={undefined} />)
    expect(container.querySelector('.team-title')).not.toBeInTheDocument()
  })

  it('displays the warning when there is an invalid team', () => {
    const { getByText } = render(<TeamSetup team={away} invalid />)
    expect(
      getByText(
        'Please ensure all positions are filled before starting the game!'
      )
    ).toBeInTheDocument()
  })
})

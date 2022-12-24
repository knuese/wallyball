import '@testing-library/jest-dom'
import { fireEvent, renderWithState as render } from '__test_utils__'
import { Stats } from '../../../src/components'

describe('<Stats />', () => {
  it('renders the component with standings by default', () => {
    const { getByText, getByTestId, container } = render(<Stats />)
    expect(getByText('Standings')).toBeInTheDocument()
    expect(getByText('Individual')).toBeInTheDocument()

    // "Team" is also a column in the standings table so need to check differently"
    expect(getByTestId('Team-link')).toBeInTheDocument()

    // by default the standings are displayed
    expect(container.querySelector('.standings-table')).toBeInTheDocument()
  })

  it('switches to individual stats', () => {
    const { container, getByText } = render(<Stats />)
    fireEvent.click(getByText('Individual'))
    expect(container.querySelector('.individual-table')).toBeInTheDocument()
  })

  it('switches to team stats', () => {
    const { container, getByTestId } = render(<Stats />)
    fireEvent.click(getByTestId('Team-link'))
    expect(container.querySelector('.team-table')).toBeInTheDocument()
  })
})

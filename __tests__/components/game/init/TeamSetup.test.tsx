import '@testing-library/jest-dom'
import { renderWithState as render } from '__test_utils__'
import { away, defense, lineup } from '__test_data__'

// mock the <StarterTable /> so we don't have to select all the starters
const mockLineupChange = jest.fn(() => [{}, {}])
jest.mock(
  '../../../../src/components/game/init/setup/StarterTable',
  () =>
    ({ onLineupChanged }: { onLineupChanged: (...args: any[]) => any[] }) => {
      onLineupChanged(...mockLineupChange())
      return <p>Mock Starter Table</p>
    }
)

/* eslint-disable-next-line */
import { TeamSetup } from '../../../../src/components/game/init'

describe('<TeamSetup />', () => {
  it('renders the component', () => {
    const { getByText } = render(<TeamSetup team={away} />)
    expect(getByText(away.name)).toBeInTheDocument()
  })

  it('calls clearStarters if a valid lineup is not provided', () => {
    const mockTeam = {
      clearStarters: jest.fn(),
      getRoster: () => [],
      getDefaultLineup: () => []
    }
    render(<TeamSetup team={mockTeam as any} />)
    expect(mockTeam.clearStarters).toHaveBeenCalled()
  })

  it('calls setStarters with a valid lineup', () => {
    mockLineupChange.mockReturnValueOnce([lineup, defense])
    const mockTeam = {
      setStarters: jest.fn(),
      getRoster: () => [],
      getDefaultLineup: () => []
    }
    render(<TeamSetup team={mockTeam as any} />)
    expect(mockTeam.setStarters).toHaveBeenCalled()
  })
})

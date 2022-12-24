import '@testing-library/jest-dom'
import { renderWithState as render } from '__test_utils__'
import { TeamTable } from '../../../../src/components/stats'
import { getTeamColumns } from '../../../../src/components/stats/tables/columns'
import { sampleBatting, samplePitching } from '../../../__test_data__/stats'

describe('<TeamTable />', () => {
  it('renders the table with data', () => {
    const turtle1 = {
      name: 'Chan',
      team: 'Turtles',
      games: 3,
      batting: sampleBatting,
      pitching: samplePitching
    }

    const turtle2 = {
      name: 'Glen',
      team: 'Turtles',
      games: 3,
      batting: sampleBatting,
      pitching: samplePitching
    }

    const bear1 = {
      name: 'Tush',
      team: 'Bears',
      games: 3,
      batting: sampleBatting,
      pitching: samplePitching
    }

    const { getByText } = render(<TeamTable />, {
      stats: {
        individual: { turtle1, turtle2, bear1 }
      }
    })

    for (const col of getTeamColumns()) {
      expect(getByText(col.header)).toBeInTheDocument()
    }

    expect(getByText(turtle1.team)).toBeInTheDocument()
    expect(getByText(bear1.team)).toBeInTheDocument()
  })
})

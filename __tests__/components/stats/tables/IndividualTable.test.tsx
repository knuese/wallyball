import '@testing-library/jest-dom'
import { renderWithState } from '__test_utils__'
import { IndividualTable } from '../../../../src/components/stats'
import { getIndividualColumns } from '../../../../src/components/stats/tables/columns'
import { sampleBatting, samplePitching } from '../../../__test_data__/stats'

describe('<IndividualTable />', () => {
  it('renders the table', () => {
    const player1 = {
      name: 'Chan',
      team: 'Turtles',
      games: 1,
      batting: sampleBatting,
      pitching: samplePitching
    }

    const player2 = {
      name: 'Bo Bo',
      team: 'Bears',
      games: 3,
      batting: sampleBatting,
      pitching: samplePitching
    }

    const { getByText } = renderWithState(<IndividualTable />, {
      stats: { individual: { player1, player2 } }
    })

    // filter out columns without a header (i.e. the column with the player name)
    for (const col of getIndividualColumns().filter((c) => c.header)) {
      expect(getByText(col.header)).toBeInTheDocument()
    }

    expect(getByText(player1.name)).toBeInTheDocument()
    expect(getByText(player1.team)).toBeInTheDocument()
    expect(getByText(player2.name)).toBeInTheDocument()
    expect(getByText(player2.team)).toBeInTheDocument()
  })
})

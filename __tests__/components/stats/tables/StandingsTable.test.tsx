import '@testing-library/jest-dom'
import { renderWithState as render } from '__test_utils__'
import { StandingsTable } from '../../../../src/components/stats'
import { getStandingsColumns } from '../../../../src/components/stats/tables/columns'

describe('<StandingsTable />', () => {
  it('renders the table', () => {
    const team1 = { wins: 2, losses: 0 }
    const team2 = { wins: 0, losses: 2 }
    const team3 = { wins: 1, losses: 1 }

    const { getByText, container } = render(<StandingsTable />, {
      stats: { standings: { team1, team2, team3 } }
    })

    for (const col of getStandingsColumns()) {
      expect(getByText(col.header)).toBeInTheDocument()
    }

    const rows = Array.from(container.querySelectorAll('tbody tr'))
    expect(rows).toHaveLength(3)

    // ensure the teams were sorted in the correct order
    const hasTdWithText = (row: Element, text: string) =>
      Array.from(row.querySelectorAll('td')).some(
        (td) => td.textContent === text
      )

    expect(hasTdWithText(rows[0], 'team1')).toBe(true)
    expect(hasTdWithText(rows[1], 'team3')).toBe(true)
    expect(hasTdWithText(rows[2], 'team2')).toBe(true)
  })
})

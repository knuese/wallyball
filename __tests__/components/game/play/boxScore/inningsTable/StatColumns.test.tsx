import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { StatColumns } from '../../../../../../src/components/game'

describe('<StatColumns />', () => {
  it('renders the columns', () => {
    // use letters for ease of testing
    const awayStats = {
      runs: 'A',
      hits: 'B',
      errors: 'C'
    }
    const homeStats = {
      runs: 'X',
      hits: 'Y',
      errors: 'Z'
    }

    const { getByText } = render(
      <StatColumns away={awayStats as any} home={homeStats as any} />
    )

    // inning headers
    ;['R', 'H', 'E'].forEach((h) => expect(getByText(h)).toBeInTheDocument())
    Object.values(awayStats).forEach((s) =>
      expect(getByText(s)).toBeInTheDocument()
    )
    Object.values(homeStats).forEach((s) =>
      expect(getByText(s)).toBeInTheDocument()
    )
  })
})

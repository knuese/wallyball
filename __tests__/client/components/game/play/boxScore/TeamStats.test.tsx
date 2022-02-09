import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { TeamStats } from '../../../../../../src/client/components/game'
import { turtlesWithStats } from '../../../../../../__test_data__/client'

describe('<TeamStats />', () => {
  it('renders the component', () => {
    const { getAllByText } = render(<TeamStats {...turtlesWithStats} />)

    // a player may also have pitched so check they appear at least once
    turtlesWithStats.batting.forEach(([name]) =>
      expect(getAllByText(name).length).toBeGreaterThanOrEqual(1)
    )
  })

  it.each([
    ['doubles', { doubles: ['Chan'] }, '2B:'],
    ['triples', { triples: ['Chan'] }, '3B:'],
    ['home runs', { homeRuns: ['Chan'] }, 'HR:']
  ])('extra stats - %s', (_desc, battingExtra, expected) => {
    const { getByText } = render(
      <TeamStats {...{ ...turtlesWithStats, battingExtra }} />
    )
    expect(getByText(new RegExp(`^${expected}`))).toBeInTheDocument()
  })
})

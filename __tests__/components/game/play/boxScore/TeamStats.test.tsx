import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { TeamStats } from '../../../../../src/components/game'
import { turtles } from '../../../../__test_data__'

describe('<TeamStats />', () => {
  it('renders the component', () => {
    const { getAllByText } = render(<TeamStats {...turtles} />)

    // a player may also have pitched so check they appear at least once
    turtles.batting.forEach(([name]) =>
      expect(getAllByText(name).length).toBeGreaterThanOrEqual(1)
    )
  })

  it.each([
    ['doubles', { doubles: ['Chan'] }, '2B:'],
    ['triples', { triples: ['Chan'] }, '3B:'],
    ['home runs', { homeRuns: ['Chan'] }, 'HR:']
  ])('extra stats - %s', (_desc, battingExtra, expected) => {
    const { getByText } = render(
      <TeamStats {...{ ...turtles, battingExtra }} />
    )
    expect(getByText(new RegExp(`^${expected}`))).toBeInTheDocument()
  })
})

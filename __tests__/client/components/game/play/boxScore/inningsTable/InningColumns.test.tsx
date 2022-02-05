import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { InningColumns } from '../../../../../../../src/client/components/game'

describe('<InningColumns />', () => {
  it('renders the columns', () => {
    // use letters for ease of testing
    const awayScores = ['A', 'B', 'C', 'D'] as any[]
    const homeScores = ['E', 'F', 'G', 'H'] as any[]

    const { getByText } = render(
      <InningColumns awayScores={awayScores} homeScores={homeScores} />
    )

    // inning headers
    ;[...new Array(9).keys()].forEach((i) =>
      expect(getByText(i + 1)).toBeInTheDocument()
    )
    awayScores.forEach((s) => expect(getByText(s)).toBeInTheDocument())
    homeScores.forEach((s) => expect(getByText(s)).toBeInTheDocument())
  })
})

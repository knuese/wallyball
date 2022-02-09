import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { Innings } from '../../../../../../src/client/components/game'
import {
  bearsWithStats,
  turtlesWithStats
} from '../../../../../../__test_data__/client'

describe('<Innings />', () => {
  const away = { ...bearsWithStats }
  const home = { ...turtlesWithStats }

  it('renders the component', () => {
    const { getByText } = render(<Innings away={away} home={home} />)
    expect(getByText(away.name)).toBeInTheDocument()
    expect(getByText(home.name)).toBeInTheDocument()
  })
})

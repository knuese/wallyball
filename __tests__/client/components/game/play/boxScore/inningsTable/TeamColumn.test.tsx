import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { TeamColumn } from '../../../../../../../src/client/components/game'

describe('<TeamColumn />', () => {
  it('renders the column', () => {
    const away = {
      name: 'Bears',
      color: '#AAA',
      background: '#BBB'
    }
    const home = {
      name: 'Turtles',
      color: '#CCC',
      background: '#DDD'
    }

    const { getByText } = render(<TeamColumn away={away} home={home} />)

    expect(getByText(away.name)).toBeInTheDocument()
    expect(getByText(home.name)).toBeInTheDocument()
  })
})

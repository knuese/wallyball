import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { CurrentPlayer } from '../../../../../../src/client/components/game'

describe('<CurrentPlayer />', () => {
  const props = {
    name: 'Jerryd',
    color: 'blue',
    background: 'cyan',
    stats: {
      today: '1-4, RBI',
      season: {
        H: '21',
        HR: '3',
        RBI: '10',
        AVG: '0.312'
      }
    }
  }

  it('renders the component', () => {
    const { getByText } = render(<CurrentPlayer {...props} />)
    expect(getByText(props.name)).toBeInTheDocument()
  })

  it.each([
    ['batter', true, 'BATTER'],
    ['pitcher', false, 'PITCHER']
  ])('renders a %s', (_desc, isBatting, expected) => {
    const { getByText } = render(
      <CurrentPlayer {...props} isBatting={isBatting} />
    )
    expect(getByText(`CURRENT ${expected}`)).toBeInTheDocument()
  })
})

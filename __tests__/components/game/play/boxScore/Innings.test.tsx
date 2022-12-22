import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { Innings } from '../../../../../src/components/game'
import { bears, turtles } from '../../../../__test_data__'

describe('<Innings />', () => {
  it('renders the component', () => {
    const { getByText } = render(<Innings away={bears} home={turtles} />)
    expect(getByText(bears.name)).toBeInTheDocument()
    expect(getByText(turtles.name)).toBeInTheDocument()
  })
})

import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { PlayHistory } from '../../../../../src/components/game'

describe('<PlayHistory />', () => {
  it('renders the component', () => {
    const plays = ['Guss homered. Chan scored.', 'Browny struck out.']
    const { getByText } = render(<PlayHistory plays={plays} />)

    plays.forEach((play) => expect(getByText(play)).toBeInTheDocument())
  })
})

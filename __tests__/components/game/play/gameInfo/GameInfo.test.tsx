import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { GameInfo } from '../../../../../src/components/game'

describe('<GameInfo />', () => {
  it('renders the component', () => {
    const { getByText } = render(<GameInfo />)
    expect(getByText('CURRENT BATTER')).toBeInTheDocument()
    expect(getByText('CURRENT PITCHER')).toBeInTheDocument()
    expect(getByText('LAST PLAY')).toBeInTheDocument()
    expect(getByText('CONTROLS')).toBeInTheDocument()
  })
})

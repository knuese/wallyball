import '@testing-library/jest-dom'
import { renderWithState as render } from '../../../../../__test_utils__'
import { GameInfo } from '../../../../../src/components/game'

describe('<GameInfo />', () => {
  it('renders the component', () => {
    const { getByText } = render(<GameInfo />)
    expect(getByText('CURRENT BATTER')).toBeInTheDocument()
    expect(getByText('CURRENT PITCHER')).toBeInTheDocument()
    expect(getByText('PLAY HISTORY')).toBeInTheDocument()
    expect(getByText('CONTROLS')).toBeInTheDocument()
  })
})

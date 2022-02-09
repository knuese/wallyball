import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import { BoxScore } from '../../../../../../src/client/components/game'

describe('<BoxScore />', () => {
  it('renders the component', () => {
    const { getAllByText } = render(<BoxScore />)
    expect(getAllByText('Bears').length).toBeGreaterThanOrEqual(1)
    expect(getAllByText('Turtles').length).toBeGreaterThanOrEqual(1)
  })

  it('toggles the stats', () => {
    const { getByTestId, getByText } = render(<BoxScore />)
    fireEvent.click(getByTestId('home-toggle'))
    expect(getByText('Chan')).toBeInTheDocument()
  })
})

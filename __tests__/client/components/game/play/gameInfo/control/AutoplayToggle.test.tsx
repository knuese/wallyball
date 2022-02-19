import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import { AutoplayToggle } from '../../../../../../../src/client/components/game'

describe('<AutoplayToggle />', () => {
  it('renders the component', () => {
    const { getByText } = render(<AutoplayToggle onChange={jest.fn()} />)
    expect(getByText('Autoplay')).toBeInTheDocument()
  })

  it('handles changes', () => {
    const onChange = jest.fn()
    const { getByTestId } = render(<AutoplayToggle onChange={onChange} />)

    fireEvent.click(getByTestId('autoplay-toggle'))

    expect(onChange).toHaveBeenCalledWith(true)
  })
})

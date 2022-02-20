import '@testing-library/jest-dom'
import { act, fireEvent, render } from '@testing-library/react'
import { Controls } from '../../../../../src/components/game'

describe('<Controls />', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('renders the component', () => {
    const { getByText } = render(<Controls />)
    expect(getByText('CONTROLS')).toBeInTheDocument()
  })

  it('toggles autoplay', async () => {
    const { getByTestId } = render(<Controls />)

    const toggle = getByTestId('autoplay-toggle')

    // turn autoplay on
    fireEvent.click(toggle)
    expect(setTimeout).toHaveBeenCalledTimes(1)

    // advance timers
    await act(async () => {
      jest.runOnlyPendingTimers()
    })

    // turn autoplay off
    fireEvent.click(toggle)
    expect(clearTimeout).toHaveBeenCalledTimes(1)
  })
})

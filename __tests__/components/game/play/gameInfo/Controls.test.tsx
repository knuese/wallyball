import '@testing-library/jest-dom'
import { act, fireEvent, renderWithState as render } from '__test_utils__'
import { Controls } from '../../../../../src/components/game'

describe('<Controls />', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('renders the component', () => {
    const { getByText } = render(<Controls outs={0} />)
    expect(getByText('CONTROLS')).toBeInTheDocument()
  })

  it('toggles autoplay', async () => {
    const setTimeoutSpy = jest.spyOn(global, 'setTimeout')
    const clearTimeoutSpy = jest.spyOn(global, 'clearTimeout')

    const { getByTestId } = render(<Controls outs={0} />)
    const toggle = getByTestId('autoplay-toggle')

    // turn autoplay on
    fireEvent.click(toggle)
    expect(setTimeoutSpy).toHaveBeenCalledTimes(1)

    // advance timers
    await act(async () => {
      jest.runOnlyPendingTimers()
    })

    // turn autoplay off
    fireEvent.click(toggle)
    expect(clearTimeoutSpy).toHaveBeenCalledTimes(1)
  })
})

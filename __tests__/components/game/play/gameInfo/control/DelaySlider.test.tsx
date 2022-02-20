import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import { DelaySlider } from '../../../../../../src/components/game'

describe('<DelaySlider />', () => {
  it('renders the component', () => {
    const { getByText } = render(<DelaySlider onChange={jest.fn()} />)
    expect(getByText('Delay')).toBeInTheDocument()
  })

  it('renders the component as disabled', () => {
    const { getByTestId } = render(
      <DelaySlider onChange={jest.fn()} disabled />
    )

    const thumb = getByTestId('delay-slider-thumb')
    expect(thumb.style.backgroundColor).toEqual('rgb(204, 204, 204)')
  })

  it('slides the slider', () => {
    const onChange = jest.fn()
    const { getByTestId, getByText } = render(
      <DelaySlider onChange={onChange} />
    )

    const thumb = getByTestId('delay-slider-thumb')
    fireEvent.keyDown(thumb, { key: 'ArrowLeft' })
    fireEvent.keyUp(thumb)

    expect(onChange).toHaveBeenCalledWith(4)
    expect(getByText('4s')).toBeInTheDocument()
  })
})

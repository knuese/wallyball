import '@testing-library/jest-dom'
import { renderWithRouter as render } from '__test_utils__'
import { withHeader } from '../../../src/components'

describe('withHeader', () => {
  it('renders the UI with the header', () => {
    const text = 'Here is the UI'
    const { getByText } = render(withHeader(<p>{text}</p>))
    expect(getByText('WallyBall')).toBeInTheDocument()
    expect(getByText(text)).toBeInTheDocument()
  })
})

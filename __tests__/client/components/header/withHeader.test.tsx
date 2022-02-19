import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { withHeader } from '../../../../src/client/components'

describe('withHeader', () => {
  it('renders the UI with the header', () => {
    const text = 'Here is the UI'
    const { getByText } = render(withHeader(<p>{text}</p>))
    expect(getByText('WallyBall')).toBeInTheDocument()
    expect(getByText(text)).toBeInTheDocument()
  })
})

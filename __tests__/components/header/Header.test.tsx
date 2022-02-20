import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { Header } from '../../../src/components'

describe('<Header />', () => {
  it('renders the component', () => {
    const { getByText } = render(<Header />)
    expect(getByText('WallyBall')).toBeInTheDocument()
  })
})

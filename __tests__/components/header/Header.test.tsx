import '@testing-library/jest-dom'
import { renderWithRouter } from '__test_utils__'
import { Header } from '../../../src/components'

describe('<Header />', () => {
  it('renders the component', () => {
    const { getByText } = renderWithRouter(<Header />)
    expect(getByText('WallyBall')).toBeInTheDocument()
  })
})

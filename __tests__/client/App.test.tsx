import '@testing-library/jest-dom'

import App from '../../src/client/App'
import { renderWithRouter as render } from '../../__test_utils__'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  BrowserRouter: jest.fn(({ children }) => <>{children}</>)
}))

describe('<App />', () => {
  it('renders the component', () => {
    const { getByText } = render(<App />, { route: '/' })
    expect(getByText('Wally Ball')).toBeInTheDocument()
  })
})

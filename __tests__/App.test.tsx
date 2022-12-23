import '@testing-library/jest-dom'
import App from '../src/App'
import { renderWithRouter as render } from '__test_utils__'

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  HashRouter: jest.fn(({ children }) => <>{children}</>)
}))

jest.mock('../src/util/fs', () => ({
  readFile: () => JSON.stringify({})
}))

describe('<App />', () => {
  it('renders the component', () => {
    const { getByText } = render(<App />, { route: '/' })
    expect(getByText('Wally Ball')).toBeInTheDocument()
  })
})

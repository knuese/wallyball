import '@testing-library/jest-dom'
import { renderWithState as render } from '../../../../__test_utils__'
import { Field } from '../../../../src/components/game'

describe('<Field />', () => {
  it('renders the component', () => {
    const { getByAltText } = render(<Field />)
    expect(getByAltText('field')).toBeInTheDocument()
  })
})

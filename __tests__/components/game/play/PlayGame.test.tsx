import '@testing-library/jest-dom'
import { renderWithState as render } from '../../../../__test_utils__'
import { PlayGame } from '../../../../src/components'

describe('<PlayGame />', () => {
  it('renders the component', () => {
    const { container } = render(<PlayGame />)
    expect(container.querySelector('.field-container')).toBeInTheDocument()
    expect(container.querySelector('.box-score')).toBeInTheDocument()
  })
})

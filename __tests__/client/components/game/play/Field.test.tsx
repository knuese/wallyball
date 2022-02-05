import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { Field } from '../../../../../src/client/components/game'

describe('<Field />', () => {
  it('renders the component', () => {
    const { getByAltText } = render(<Field />)
    expect(getByAltText('field')).toBeInTheDocument()
  })
})

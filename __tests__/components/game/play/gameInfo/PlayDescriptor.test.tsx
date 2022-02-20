import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { PlayDescriptor } from '../../../../../src/components/game'

describe('<PlayDescriptor />', () => {
  it('renders the component', () => {
    const text = 'Guss homered. Chan scored.'
    const { getByText } = render(<PlayDescriptor text={text} />)
    expect(getByText(text)).toBeInTheDocument()
  })
})

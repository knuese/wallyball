import '@testing-library/jest-dom'
import { renderWithState as render } from '../../../../__test_utils__'
import { Bases } from '../../../../src/model'
import { Field } from '../../../../src/components/game'
import { away, home } from '../../../../__test_data__'

describe('<Field />', () => {
  it('renders the component', () => {
    const { getByAltText } = render(<Field />)
    expect(getByAltText('field')).toBeInTheDocument()
  })

  it('registers bases as occupied', () => {
    const [first, second, third] = Object.values(away.players).slice(0, 3)

    const { container } = render(<Field />, {
      game: {
        away,
        home,
        isBottom: false,
        bases: new Bases({
          first: { id: first.id },
          second: { id: second.id },
          third: { id: third.id }
        })
      } as any
    })

    expect(container.querySelector('#first-base')).toHaveClass('occupied')
    expect(container.querySelector('#second-base')).toHaveClass('occupied')
    expect(container.querySelector('#third-base')).toHaveClass('occupied')
  })
})

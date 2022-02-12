import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { Roster } from '../../../../../../src/client/components/game/init'

describe('<Roster />', () => {
  it('renders the component', () => {
    const players = [{ name: 'Gary' }, { name: 'George' }]
    const { getByText } = render(<Roster players={players as any} />)
    expect(getByText('Roster')).toBeInTheDocument()
    players.forEach(({ name }) => expect(getByText(name)).toBeInTheDocument())
  })
})

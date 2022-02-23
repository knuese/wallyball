import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import { TeamToggles } from '../../../../../src/components/game'
import { Side } from '../../../../../src/model'

describe('<TeamToggles />', () => {
  const away = { name: 'Bears', color: 'red', background: 'brown' }
  const home = { name: 'Turtles', color: 'lime', background: 'green' }

  it('renders the component', () => {
    const { getByText, getByTestId } = render(
      <TeamToggles
        activeSide={Side.AWAY}
        setActiveSide={jest.fn()}
        away={away}
        home={home}
      />
    )

    expect(getByText(away.name)).toBeInTheDocument()
    expect(getByText(home.name)).toBeInTheDocument()
    expect(getByTestId('away-toggle').classList).toContainEqual(
      'team-toggle-active'
    )
  })

  it.each([
    ['home', Side.AWAY, Side.HOME],
    ['away', Side.HOME, Side.AWAY]
  ])('toggles to %s', (sideStr, initialSide, expected) => {
    const setActiveSide = jest.fn()
    const { getByTestId } = render(
      <TeamToggles
        activeSide={initialSide}
        setActiveSide={setActiveSide}
        away={away}
        home={home}
      />
    )

    fireEvent.click(getByTestId(`${sideStr}-toggle`))
    expect(setActiveSide).toHaveBeenCalledWith(expected)
  })
})

import '@testing-library/jest-dom'
import { act, render, fireEvent } from '@testing-library/react'
import { Starter } from '../../../../../src/components/game/init'
import { Player } from '../../../../../src/model'

describe('<Starter />', () => {
  const positions = ['P', 'C']
  const player = new Player('Player to Select', positions, {} as any)

  // get around DOM nesting violations
  const renderInTable = (starter: JSX.Element) =>
    render(
      <table>
        <tbody>{starter}</tbody>
      </table>
    )

  it('renders the component', () => {
    const { container } = renderInTable(
      <Starter
        index={0}
        players={[player]}
        selectPlayer={jest.fn()}
        selectPosition={jest.fn()}
      />
    )

    expect(container.querySelector('.use-bootstrap')).toBeInTheDocument()
    expect(container.querySelector('.select-position')).toBeDisabled()
  })

  it('clicks a player and selects a position', async () => {
    const positions = ['P', 'C']
    const player = new Player('Player to Select', positions, {} as any)
    const selectPlayer = jest.fn()
    const selectPosition = jest.fn()

    const { container, getByText } = renderInTable(
      <Starter
        index={0}
        players={[player]}
        selectPlayer={selectPlayer}
        selectPosition={selectPosition}
      />
    )

    // .rbt-input-main is the CSS class for the HTML input in the <Typeahead />
    const typeahead = container.querySelector('.rbt-input-main') as Element
    fireEvent.focus(typeahead)

    await act(async () => {
      fireEvent.click(getByText(player.name))
    })

    expect(selectPlayer).toHaveBeenCalledWith(player.id)

    // choose a position for the player that was selected
    const positionSelect = container.querySelector('.select-position')
    expect(positionSelect).not.toBeDisabled()

    // select the other position
    fireEvent.change(positionSelect as Element, {
      target: { value: positions[1] }
    })

    // should auto-select the first position in the list, then chosen the other
    expect(selectPosition).toHaveBeenCalledTimes(2)
    expect(selectPosition).toHaveBeenNthCalledWith(1, player.id, positions[0])
    expect(selectPosition).toHaveBeenNthCalledWith(2, player.id, positions[1])
  })

  it('handles clearing a player out', async () => {
    const selectPlayer = jest.fn()
    const selectPosition = jest.fn()

    const { container, getByText, getByDisplayValue } = renderInTable(
      <Starter
        index={0}
        players={[player]}
        selectPlayer={selectPlayer}
        selectPosition={selectPosition}
      />
    )

    // first need to have a player/position selected so that it can be cleared later
    fireEvent.focus(container.querySelector('.rbt-input-main') as Element)

    await act(async () => {
      fireEvent.click(getByText(player.name))
    })

    // now, enter some non-existent value
    await act(async () => {
      fireEvent.change(getByDisplayValue(player.name), {
        target: { value: 'foo' }
      })
    })

    expect(selectPlayer).toHaveBeenLastCalledWith(undefined)
  })
})

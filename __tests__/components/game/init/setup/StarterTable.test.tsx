import '@testing-library/jest-dom'
import {
  act,
  fireEvent,
  renderWithState as render
} from '../../../../__test_utils__'
import { StarterTable } from '../../../../../src/components/game/init'
import { players } from '../../../../__test_data__'

describe('<StarterTable />', () => {
  it('renders the component', () => {
    const { getByText } = render(
      <StarterTable players={players} onLineupChanged={jest.fn()} />
    )

    expect(getByText('#')).toBeInTheDocument()
    expect(getByText('Player')).toBeInTheDocument()
    expect(getByText('Pos.')).toBeInTheDocument()
  })

  it('selects a player and position', async () => {
    const onLineupChange = jest.fn()
    const player = players[2]
    const position = player.eligiblePositions[0]

    const { container, getByText, getByDisplayValue } = render(
      <StarterTable players={players} onLineupChanged={onLineupChange} />
    )

    // .rbt-input-main is the CSS class for the HTML input in the <Typeahead />
    const typeahead = container.querySelector('.rbt-input-main') as Element
    fireEvent.focus(typeahead)

    // select player
    await act(async () => {
      fireEvent.click(getByText(player.name))
    })

    // choose a position for the player that was selected
    const positionSelect = container.querySelector('.select-position')
    fireEvent.select(positionSelect as Element, { value: position })

    expect(getByDisplayValue(player.name)).toBeInTheDocument()
    expect(getByText(position)).toBeInTheDocument()
    expect(onLineupChange).toHaveBeenCalledWith(
      { '0': player.id },
      { [player.id]: position }
    )
  })

  it('handles a player being cleared', async () => {
    const { name } = players[0]
    const { container, getByText, queryByDisplayValue } = render(
      <StarterTable players={players} onLineupChanged={jest.fn()} />
    )

    // first need to have a player/position selected so that it can be cleared later
    fireEvent.focus(container.querySelector('.rbt-input-main') as Element)

    await act(async () => {
      fireEvent.click(getByText(name))
    })

    // player should be in the document
    expect(queryByDisplayValue(name)).toBeInTheDocument()

    // now, enter some non-existent value
    await act(async () => {
      fireEvent.change(queryByDisplayValue(name) as Element, {
        target: { value: 'foo' }
      })
    })

    // player should have been removed
    expect(queryByDisplayValue(name)).not.toBeInTheDocument()
  })
})

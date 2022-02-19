import '@testing-library/jest-dom'
import {
  act,
  createStoreWithMockDispatch,
  fireEvent,
  renderWithState as render
} from '../../../../../../__test_utils__'
import { StarterTable } from '../../../../../../src/client/components/game/init'
import { playerConfigs } from '../../../../../../__test_data__/client'

describe('<StarterTable />', () => {
  it('renders the component', () => {
    const { getByText } = render(
      <StarterTable players={Object.values(playerConfigs)} />
    )

    expect(getByText('#')).toBeInTheDocument()
    expect(getByText('Player')).toBeInTheDocument()
    expect(getByText('Pos.')).toBeInTheDocument()
  })

  it('selects a player and position', async () => {
    const player = playerConfigs.shortstop
    const position = player.positions[0]
    const store = createStoreWithMockDispatch()

    const { container, getByText, getByDisplayValue } = render(
      <StarterTable players={Object.values(playerConfigs)} />,
      {},
      store
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

    expect(store.dispatch).toHaveBeenCalledTimes(2)
    expect(getByDisplayValue(player.name)).toBeInTheDocument()
    expect(getByText(position)).toBeInTheDocument()
  })

  it('handles a player being cleared', async () => {
    const { name } = playerConfigs.pitcher
    const { container, getByText, queryByDisplayValue } = render(
      <StarterTable players={Object.values(playerConfigs)} />
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

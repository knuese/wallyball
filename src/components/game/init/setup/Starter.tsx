import { FC, useEffect, useState } from 'react'
import { Typeahead } from 'react-bootstrap-typeahead'
import hash from 'object-hash'
import { Player } from '../../../../model'

type TypeaheadOption = Record<string, any> | string

export type StarterProps = {
  index: number
  players: Player[]
  value: { playerId: string; position: string } | '' | undefined
  selectPlayer: (playerId?: string) => void
  selectPosition: (playerId: string, position: string) => void
}

export const Starter: FC<StarterProps> = ({
  index,
  players,
  value,
  selectPlayer,
  selectPosition
}) => {
  const [selectedOption, setSelectedOption] = useState<TypeaheadOption>()
  const [selectedPlayer, setSelectedPlayer] = useState<Player | undefined>()
  const [positionOptions, setPositionOptions] = useState<Array<string>>([])
  const [selectedPosition, setSelectedPosition] = useState<string>()

  const playerItems = players.map(({ id, name }) => ({
    label: name,
    value: id
  }))

  useEffect(() => {
    if (value) {
      setSelectedOption(
        playerItems.find((item) => item.value === value.playerId)
      )
      setPositionOptions([value.position])
      setSelectedPosition(value.position)
    } else {
      setSelectedOption(undefined)
      setPositionOptions([])
      setSelectedPosition(undefined)
    }
  }, [hash(value || null)])

  // auto-select the first position since no event is fired
  // when the <select /> first becomes enabled
  useEffect(() => {
    if (selectedPlayer) {
      setPositionOptions([...selectedPlayer.eligiblePositions])
      selectPosition(selectedPlayer.id, selectedPlayer.eligiblePositions[0])
    }
  }, [selectedPlayer])

  return (
    <tr>
      <td>{`${index + 1}`}</td>
      <td className="use-bootstrap">
        <Typeahead
          id={`typeahead-${index}`}
          options={playerItems}
          size="sm"
          selected={selectedOption ? [selectedOption] : []}
          onChange={([option]: Array<TypeaheadOption>) => {
            setSelectedOption(option)

            if (option) {
              const playerId =
                typeof option === 'string' ? option : option.value
              setSelectedPlayer(players.find(({ id }) => id === playerId))
              selectPlayer(playerId)
            } else {
              setSelectedPlayer(undefined)
              selectPlayer(undefined)
            }
          }}
        />
      </td>
      <td>
        <select
          disabled={!selectedOption && !selectedPlayer}
          className="select-position"
          value={selectedPosition}
          onChange={({ target: { value } }) => {
            // selectedPlayer always defined if here
            setSelectedPosition(value)
            selectPosition((selectedPlayer as Player).id, value)
          }}
        >
          {positionOptions.map((pos) => (
            <option key={`player${index}-${pos}`} value={pos}>
              {pos}
            </option>
          ))}
        </select>
      </td>
    </tr>
  )
}

export default Starter

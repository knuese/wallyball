import { FC, useEffect, useState } from 'react'
import { Typeahead } from 'react-bootstrap-typeahead'
import hash from 'object-hash'
import { Player } from '../../../../model'

type TypeaheadOption = {
  label: string
  value: string
}

export type StarterProps = {
  index: number
  players: Player[]
  typeaheadValue: TypeaheadOption | undefined
  positionValue: string | undefined
  selectPlayer: (playerId?: string) => void
  selectPosition: (playerId: string, position: string) => void
}

export const Starter: FC<StarterProps> = ({
  index,
  players,
  typeaheadValue,
  positionValue,
  selectPlayer,
  selectPosition
}) => {
  const [selectedOption, setSelectedOption] = useState<TypeaheadOption>()
  const [selectedPlayer, setSelectedPlayer] = useState<Player | undefined>()
  const [positionOptions, setPositionOptions] = useState<Array<string>>([])
  const [selectedPosition, setSelectedPosition] = useState<string>()

  useEffect(() => {
    if (typeaheadValue) {
      setSelectedOption(typeaheadValue as TypeaheadOption)
    } else {
      setSelectedOption(undefined)
    }
  }, [typeaheadValue && hash(typeaheadValue)])

  useEffect(() => {
    if (positionValue) {
      setPositionOptions([positionValue])
      setSelectedPosition(positionValue)
    } else {
      setPositionOptions([])
      setSelectedPosition('')
    }
  }, [positionValue])

  // auto-select the first position since no event is fired
  // when the <select /> first becomes enabled
  useEffect(() => {
    if (selectedPlayer) {
      setPositionOptions([...selectedPlayer.eligiblePositions])
      selectPosition(selectedPlayer.id, selectedPlayer.eligiblePositions[0])
    }
  }, [selectedPlayer && hash(selectedPlayer)])

  const playerItems = players.map(({ id, name }) => ({
    label: name,
    value: id
  }))

  return (
    <tr>
      <td>{`${index + 1}`}</td>
      <td className="use-bootstrap">
        <Typeahead
          id={`typeahead-${index}`}
          options={playerItems}
          size="sm"
          selected={selectedOption ? [selectedOption] : []}
          onChange={([option]: Array<any>) => {
            setSelectedOption(option)

            if (option) {
              const playerId = option.value
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

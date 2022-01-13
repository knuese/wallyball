import { FC, useEffect, useState } from 'react'
import { Typeahead } from 'react-bootstrap-typeahead'
import { Player } from '../../../store/types/team'

type TypeaheadOption = Record<string, any> | string

export type StarterProps = {
  index: number
  players: Player[]
  selectPlayer: (playerId?: string) => void
  selectPosition: (playerId: string, position: string) => void
}

export const Starter: FC<StarterProps> = ({
  index,
  players,
  selectPlayer,
  selectPosition
}) => {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | undefined>(
    undefined
  )
  const playerItems = players?.map(({ id, name }) => ({
    label: name,
    value: id
  }))

  // auto-select the first position since no event is fired
  // when the <select /> first becomes enabled
  useEffect(() => {
    if (selectedPlayer) {
      selectPosition(selectedPlayer.id, selectedPlayer.positions[0])
    }
  }, [selectedPlayer, selectPosition])

  return (
    <tr>
      <td>{`${index + 1}`}</td>
      <td className="use-bootstrap">
        <Typeahead
          id={`typeahead-${index}`}
          options={playerItems}
          size="small"
          onChange={([option]: Array<TypeaheadOption>) => {
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
          disabled={!selectedPlayer}
          className="select-position"
          onChange={({ target: { value } }) => {
            if (selectedPlayer) {
              selectPosition(selectedPlayer.id, value)
            }
          }}
        >
          {selectedPlayer?.positions.map((pos) => (
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

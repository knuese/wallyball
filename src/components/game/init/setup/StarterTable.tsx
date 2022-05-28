import { FC, useEffect, useState } from 'react'
import hash from 'object-hash'
import { Starter } from '.'
import { Defense, Lineup, Player, Position } from '../../../../model'

export type StarterTableProps = {
  players: Player[]
  defaultLineup?: Record<string, string>
  onLineupChanged: (lineup: Lineup, defense: Defense) => void
}

export const StarterTable: FC<StarterTableProps> = ({
  players,
  defaultLineup,
  onLineupChanged
}) => {
  const [unassignedPlayers, setUnassignedPlayers] = useState(players)
  const [lineup, setLineup] = useState<Lineup>({})
  const [defense, setDefense] = useState<Defense>({})

  useEffect(() => {
    setUnassignedPlayers(
      players.filter(
        ({ id }) => !Object.values(lineup).find((playerId) => playerId === id)
      )
    )
  }, [lineup, players])

  useEffect(() => {
    onLineupChanged(lineup, defense)
  }, [hash(defense)])

  const useDefault = () => {
    if (defaultLineup) {
      setUnassignedPlayers(players)

      setLineup(
        Object.keys(defaultLineup).reduce(
          (acc, playerId, i) => ({
            ...acc,
            [i]: playerId
          }),
          {}
        )
      )

      setDefense(defaultLineup as Defense)
    }
  }

  const clear = () => {
    setUnassignedPlayers(players)
    setLineup({})
    setDefense({})
  }

  const starters = [...new Array(9).keys()].map((_, i) => (
    <Starter
      key={`starter:${i}`}
      index={i}
      value={lineup[i] && { playerId: lineup[i], position: defense[lineup[i]] }}
      players={unassignedPlayers}
      selectPlayer={(playerId?: string) =>
        setLineup({
          ...lineup,
          [i]: playerId || undefined
        })
      }
      selectPosition={(playerId: string, position: string) =>
        setDefense({
          ...defense,
          [playerId]: position as Position
        })
      }
    />
  ))

  return (
    <div className='starter-table'>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Player</th>
            <th>Pos.</th>
          </tr>
        </thead>
        <tbody>{starters}</tbody>
      </table>
      <a className='margin-right-full' onClick={useDefault}>
        Use Default
      </a>
      <a onClick={clear}>Clear</a>
    </div>
  )
}

export default StarterTable

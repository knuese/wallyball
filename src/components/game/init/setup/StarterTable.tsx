import { FC, useEffect, useState } from 'react'
import hash from 'object-hash'
import { Starter } from '.'
import { Defense, Lineup, Player, Position } from '../../../../model'

export type StarterTableProps = {
  players: Player[]
  onLineupChanged: (lineup: Lineup, defense: Defense) => void
}

export const StarterTable: FC<StarterTableProps> = ({
  players,
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

  const starters = [...new Array(9).keys()].map((_, i) => (
    <Starter
      key={`starter:${i}`}
      index={i}
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
    <table className="starter-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Player</th>
          <th>Pos.</th>
        </tr>
      </thead>
      <tbody>{starters}</tbody>
    </table>
  )
}

export default StarterTable

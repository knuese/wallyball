import { FC, useEffect, useState } from 'react'
import { Starter } from '.'
import { Player } from '../../../store/types/team'

type Lineup = Record<string, Player>
type Defense = Record<string, string>

export type StarterTableProps = {
  players: Player[]
}

export const StarterTable: FC<StarterTableProps> = ({ players }) => {
  const [unassignedPlayers, setUnassignedPlayers] = useState(players)
  const [lineup, setLineup] = useState<Lineup>({})
  const [defense, setDefense] = useState<Defense>({})

  useEffect(() => {
    setUnassignedPlayers(
      players.filter(
        ({ id }) => !Object.values(lineup).find((player) => player?.id === id)
      )
    )
  }, [lineup, players])

  const starters = [...new Array(9).keys()].map((_, i) => (
    <Starter
      key={i}
      index={i}
      players={unassignedPlayers}
      selectPlayer={(playerId?: string) => {
        setLineup({
          ...lineup,
          [i]: playerId ? players.find(({ id }) => id === playerId) : undefined
        })
      }}
      selectPosition={(playerId: string, position: string) => {
        setDefense({
          ...defense,
          [playerId]: position
        })
      }}
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

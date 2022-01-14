import { FC, useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Starter } from '.'
import { setTeam } from '../../../store/actions/team/team'
import { Defense, Lineup, Player } from '../../../store/types/team'

export type StarterTableProps = {
  players: Player[]
  isHome?: boolean
}

export const StarterTable: FC<StarterTableProps> = ({ players, isHome }) => {
  const dispatch = useDispatch()
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

  const selectPlayer = (i: number) => (playerId?: string) => {
    const newLineup = {
      ...lineup,
      [i]: playerId ? players.find(({ id }) => id === playerId) : undefined
    }
    dispatch(setTeam(newLineup, defense, isHome))
    setLineup(newLineup)
  }

  const selectPosition = (playerId: string, position: string) => {
    const newDefense = {
      ...defense,
      [playerId]: position
    }
    dispatch(setTeam(lineup, newDefense, isHome))
    setDefense(newDefense)
  }

  const starters = [...new Array(9).keys()].map((_, i) => (
    <Starter
      key={i}
      index={i}
      players={unassignedPlayers}
      selectPlayer={selectPlayer(i)}
      selectPosition={selectPosition}
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

import { FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Starter } from '.'
import { Player, Position } from '../../../../model'
import { setTeam } from '../../../../store/actions/team/team'
import { Defense, Lineup } from '../../../../store/types/team'

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
        ({ id }) => !Object.values(lineup).find((playerId) => playerId === id)
      )
    )
  }, [lineup, players])

  const selectPlayer = (i: number) => (playerId?: string) => {
    const newLineup = {
      ...lineup,
      [i]: playerId || undefined
    }
    setLineup(newLineup)

    if (
      Object.values(lineup).filter((l) => l).length === 9 &&
      Object.values(defense).filter((d) => d).length === 9
    ) {
      dispatch(setTeam(newLineup, defense, isHome))
    }
  }

  const selectPosition = (playerId: string, position: string) => {
    const newDefense = {
      ...defense,
      [playerId]: position as Position
    }

    setDefense(newDefense)

    if (
      Object.values(lineup).filter((l) => l).length === 9 &&
      Object.values(defense).filter((d) => d).length === 9
    ) {
      dispatch(setTeam(lineup, newDefense, isHome))
    }
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

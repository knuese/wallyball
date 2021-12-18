import { FC, useState, useCallback, useEffect } from 'react'
import { PlayerCard } from './PlayerCard'
import update from 'immutability-helper'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const style = {
  width: 400,
}

interface PlayerItem {
  id: number
  name: string
}

export type PlayerContainerProps = {
  players: PlayerItem[]
}

export const PlayerContainer: FC<PlayerContainerProps> = ({ players: unordered }) => {
  {
    const [players, setPlayers] = useState<PlayerItem[]>([])

    useEffect(() => {
      setPlayers(unordered)
    }, [unordered])

    const moveCard = useCallback(
      (dragIndex: number, hoverIndex: number) => {
        const dragCard = players[dragIndex]
        setPlayers(
          update(players, {
            $splice: [
              [dragIndex, 1],
              [hoverIndex, 0, dragCard],
            ],
          }),
        )
      },
      [players],
    )

    const renderPlayer = ({ id, name }: PlayerItem, index: number) => (
      <PlayerCard
        id={id}
        key={id}
        index={index}
        text={name}
        moveCard={moveCard}
      />
    )

    return (
      <>
        <DndProvider backend={HTML5Backend}>
          <div style={style}>
            {players.map(renderPlayer)}
          </div>
        </DndProvider>
        <button onClick={() => console.log(players)}>Submit</button>
      </>
    )
  }
}

export default PlayerContainer

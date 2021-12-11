import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

export const HomeScreen: FC = () => {
  const navigate = useNavigate()

  const newGame = () => {
    navigate('/game/init')
  }

  return (
    <div>
      <h1>Wally Ball</h1>
      <button onClick={newGame}>New Game</button>
    </div>
  )
}

export default HomeScreen

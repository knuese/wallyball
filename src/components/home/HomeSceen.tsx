import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

export const HomeScreen: FC = () => {
  const navigate = useNavigate()

  return (
    <div>
      <h1>Wally Ball</h1>
      <button
        className="margin-right-full"
        onClick={() => navigate('/game/init')}
      >
        New Game
      </button>
      <button onClick={() => navigate('/stats')}>View Stats</button>
    </div>
  )
}

export default HomeScreen

import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

export const Header: FC = () => {
  const navigate = useNavigate()

  return (
    <div className="header">
      <b
        className="margin-left-half margin-right-full"
        onClick={() => navigate('/', { replace: true })}
      >
        WallyBall
      </b>
      <a onClick={() => navigate('/game/init', { replace: true })}>New Game</a>
      <a onClick={() => navigate('/stats', { replace: true })}>Stats</a>
    </div>
  )
}

export default Header

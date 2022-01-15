import { FC } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { GameScreen, HomeScreen, InitGame, PlayGame } from './components'

export const AppRouter: FC = () => (
  <BrowserRouter basename="/wb">
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/game" element={<GameScreen />} />
      <Route path="/game/init" element={<InitGame />} />
      <Route path="/game/play" element={<PlayGame />} />
    </Routes>
  </BrowserRouter>
)

export default AppRouter

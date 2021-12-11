import { FC } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { GameScreen, HomeScreen, InitGame } from './components'

export const AppRouter: FC = () => (
  <BrowserRouter basename="/wb">
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/game" element={<GameScreen />} />
      <Route path="/game/init" element={<InitGame />} />
    </Routes>
  </BrowserRouter>
)

export default AppRouter

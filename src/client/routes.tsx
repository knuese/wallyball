import { FC } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import {
  GameScreen,
  HomeScreen,
  InitGame,
  PlayGame,
  withHeader
} from './components'

export const AppRouter: FC = () => (
  <BrowserRouter basename="/wb">
    <Routes>
      <Route path="/" element={withHeader(<HomeScreen />)} />
      <Route path="/game" element={withHeader(<GameScreen />)} />
      <Route path="/game/init" element={withHeader(<InitGame />)} />
      <Route path="/game/play" element={withHeader(<PlayGame />)} />
    </Routes>
  </BrowserRouter>
)

export default AppRouter

import { FC } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { HomeScreen, InitGame, PlayGame, Stats, withHeader } from './components'

export const AppRouter: FC = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={withHeader(<HomeScreen />)} />
      <Route path="/game/init" element={withHeader(<InitGame />)} />
      <Route path="/game/play" element={withHeader(<PlayGame />)} />
      <Route path="/stats" element={withHeader(<Stats />)} />
    </Routes>
  </HashRouter>
)

export default AppRouter

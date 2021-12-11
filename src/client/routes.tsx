import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { GameScreen, HomeScreen, InitGame } from './components'

export default () => (
  <BrowserRouter basename='/wb'>
    <Routes>
      <Route path='/' element={<HomeScreen />} />
      <Route path='/game' element={<GameScreen />} />
      <Route path='/game/init' element={<InitGame />} />
    </Routes>
  </BrowserRouter>
)

import React from 'react'
import { hot } from 'react-hot-loader/root'

const App = (): JSX.Element => {
  return (
    <div className="App">
      <header className="App-header">
        <p>Hello, world!</p>
        <a href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  )
}

export default hot(App)

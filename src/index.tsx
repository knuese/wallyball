import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

import './styles/index.scss'
import 'react-bootstrap-typeahead/css/Typeahead.css'

const root = document.getElementById('root')

if (!root) {
  throw new Error('no root element found')
}

createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

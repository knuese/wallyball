import '@testing-library/jest-dom'

import React from 'react'
import { render } from '@testing-library/react'
import App from '../../src/client/App'

test('renders learn react link', () => {
  const { getByText } = render(<App />)
  expect(getByText('Learn React')).toBeInTheDocument()
})

import '@testing-library/jest-dom'

import { render, RenderResult } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

type RenderProps = {
  route: string
}

export const renderWithRouter = (
  ui: JSX.Element,
  { route }: RenderProps = { route: '/' }
): RenderResult =>
  render(<MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>)

export * from '@testing-library/react'

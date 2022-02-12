import '@testing-library/jest-dom'
import {
  fireEvent,
  renderWithState as render
} from '../../../../../__test_utils__'
import { InitGame } from '../../../../../src/client/components/game/init'
import { defense, lineup } from '../../../../../__test_data__/client'

describe('<InitGame />', () => {
  it('renders the component - invalid teams', () => {
    const { getByText } = render(<InitGame />)
    expect(getByText('Submit')).toBeDisabled()
  })

  it('clicks the submit button', () => {
    const { getByText } = render(<InitGame />, {
      teams: {
        away: { lineup, defense },
        home: { lineup, defense }
      }
    })

    expect(getByText('Submit')).not.toBeDisabled()
    fireEvent.click(getByText('Submit'))
  })
})

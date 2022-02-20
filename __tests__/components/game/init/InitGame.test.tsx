import '@testing-library/jest-dom'
import {
  fireEvent,
  renderWithState as render
} from '../../../../__test_utils__'
import { InitGame } from '../../../../src/components/game/init'

describe('<InitGame />', () => {
  it('renders the component - teams not set', () => {
    const { getByText } = render(<InitGame />, {
      teams: {
        away: { isSet: false },
        home: { isSet: false }
      }
    })
    expect(getByText('Submit')).toBeDisabled()
  })

  it('clicks the submit button when the teams are set', () => {
    const { getByText } = render(<InitGame />, {
      teams: {
        away: { isSet: true },
        home: { isSet: true }
      }
    })

    expect(getByText('Submit')).not.toBeDisabled()
    fireEvent.click(getByText('Submit'))
  })
})

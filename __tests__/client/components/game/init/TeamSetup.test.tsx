import '@testing-library/jest-dom'
import {
  createStoreWithMockDispatch,
  fireEvent,
  renderWithState as render
} from '../../../../../__test_utils__'
import { away, home } from '../../../../../__test_data__/client'

const mockUseDropzone = jest.fn()
jest.mock('react-dropzone', () => ({
  useDropzone: mockUseDropzone
}))

/* eslint-disable-next-line */
import { TeamSetup } from '../../../../../src/client/components/game/init'

describe('<TeamSetup />', () => {
  beforeEach(() => {
    mockUseDropzone.mockImplementation(({ onDrop }) => ({
      getRootProps: jest.fn(() => ({
        onClick: jest.fn(() => {
          onDrop([{ name: 'test.json' }])
        })
      })),
      getInputProps: jest.fn()
    }))
  })

  it.each([
    ['Home', true, home],
    ['Away', false, away]
  ])('renders the component - %s', (teamText, isHome, teamData) => {
    const { getByText, getByTestId } = render(
      <TeamSetup isHome={isHome} teamData={teamData} />
    )
    expect(getByText(/^Select a file/)).toBeInTheDocument()
    expect(getByTestId('upload-team').textContent).toEqual(teamText)
  })

  it('displays the warning when there is an invalid team', () => {
    const { getByText } = render(<TeamSetup invalid teamData={away} />)
    expect(
      getByText(
        'Please ensure all positions are filled before starting the game!'
      )
    ).toBeInTheDocument()
  })

  it('uploads and removes a file', () => {
    const store = createStoreWithMockDispatch()
    const { getByText, container } = render(<TeamSetup />, undefined, store)

    // upload
    fireEvent.click(getByText(/^Select a file/))
    expect(store.dispatch).toHaveBeenCalledTimes(1)

    // remove
    fireEvent.click(container.querySelector('.dropzone-icon') as Element)
    expect(store.dispatch).toHaveBeenCalledTimes(2)
  })

  it('displays the roster when there are players', () => {
    const { getByText } = render(
      <TeamSetup teamData={{ players: [{ name: 'Guss' }] } as any} />
    )
    expect(getByText('Roster')).toBeInTheDocument()
  })
})

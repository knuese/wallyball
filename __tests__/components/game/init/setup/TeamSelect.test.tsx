import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import { TeamSelect } from '../../../../../src/components/game/init'
import { away, home } from '../../../../../__test_data__'

describe('<TeamSelect />', () => {
  const prompt = 'Select a team'

  it('renders the component', () => {
    const { getByText } = render(
      <TeamSelect
        prompt={prompt}
        teams={[away, home]}
        value={undefined}
        onSelect={jest.fn()}
      />
    )

    expect(getByText(prompt)).toBeInTheDocument()
    expect(getByText(away.name)).toBeInTheDocument()
    expect(getByText(home.name)).toBeInTheDocument()
  })

  it('selects a team', () => {
    const onSelect = jest.fn()
    const { getByTestId } = render(
      <TeamSelect
        prompt={prompt}
        teams={[away, home]}
        value={undefined}
        onSelect={onSelect}
      />
    )

    fireEvent.change(getByTestId('team-select'), {
      target: { value: away.name }
    })

    expect(onSelect).toHaveBeenCalledWith(away)
  })

  it('selects the prompt when a team is selected', () => {
    const onSelect = jest.fn()
    const { getByTestId } = render(
      <TeamSelect
        prompt={prompt}
        teams={[away]}
        value={home}
        onSelect={onSelect}
      />
    )

    fireEvent.change(getByTestId('team-select'), {
      target: { value: 'prompt' }
    })

    expect(onSelect).toHaveBeenCalledWith(undefined)
  })
})

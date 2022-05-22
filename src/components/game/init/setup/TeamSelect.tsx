import { FC } from 'react'
import { uniqBy } from 'lodash'
import { Team } from '../../../../model'

export type TeamSelectProps = {
  prompt: string
  teams: Team[]
  value: Team | undefined
  onSelect: (team: Team | undefined) => void
}

const PROMPT_VALUE = 'prompt'

export const TeamSelect: FC<TeamSelectProps> = ({
  prompt,
  teams,
  value,
  onSelect
}) => {
  const allOptions = uniqBy([...teams, ...(value ? [value] : [])], 'name').sort(
    (one, two) => one.name.localeCompare(two.name)
  )

  const options = [
    <option key="prompt" value={PROMPT_VALUE}>
      {prompt}
    </option>
  ].concat(
    allOptions
      .filter((t) => t)
      .map(({ name }) => (
        <option key={name} value={name}>
          {name}
        </option>
      ))
  )

  return (
    <select
      data-testid="team-select"
      className="team-select"
      value={value?.name || PROMPT_VALUE}
      onChange={({ target: { value } }) =>
        onSelect(
          value === PROMPT_VALUE
            ? undefined
            : (teams.find((t) => t.name === value) as Team)
        )
      }
    >
      {options}
    </select>
  )
}

export default TeamSelect

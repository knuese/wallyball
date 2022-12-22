import { FC } from 'react'

export type TeamColumnProps = {
  away: {
    name: string
    color: string
    background: string
  }
  home: {
    name: string
    color: string
    background: string
  }
}

export const TeamColumn: FC<TeamColumnProps> = ({ away, home }) => {
  const rows = [away, home].map(({ name, color, background }) => (
    <tr key={name}>
      <td
        className="border-right"
        style={{
          color,
          backgroundColor: background
        }}
      >
        <b>{name}</b>
      </td>
    </tr>
  ))

  return (
    <table className="innings-table border-right">
      <thead>
        <tr>
          <th style={{ color: 'black' }}>_</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  )
}

export default TeamColumn

import { FC } from 'react'

export type StatColumnProps = {
  away: {
    runs: number
    hits: number
    errors: number
  }
  home: {
    runs: number
    hits: number
    errors: number
  }
}

export const StatColumns: FC<StatColumnProps> = ({ away, home }) => {
  const headers = ['R', 'H', 'E'].map((h) => <th>{h}</th>)
  const rows = [away, home].map(({ runs, hits, errors }) => (
    <tr>
      <td>{runs}</td>
      <td>{hits}</td>
      <td>{errors}</td>
    </tr>
  ))

  return (
    <table className="innings-table">
      <thead>{headers}</thead>
      <tbody>{rows}</tbody>
    </table>
  )
}

export default StatColumns

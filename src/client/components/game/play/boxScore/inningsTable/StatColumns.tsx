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
  const headers = ['R', 'H', 'E'].map((h) => <th key={h}>{h}</th>)
  const rows = [away, home].map(({ runs, hits, errors }, i) => (
    <tr key={`stats:${i}`}>
      <td>{runs}</td>
      <td>{hits}</td>
      <td>{errors}</td>
    </tr>
  ))

  return (
    <table className="innings-table">
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  )
}

export default StatColumns

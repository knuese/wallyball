import { FC } from 'react'

export type InningColumnProps = {
  awayScores: number[]
  homeScores: number[]
}

export const InningColumns: FC<InningColumnProps> = ({
  awayScores,
  homeScores
}) => {
  const headers = [...new Array(9).keys()].map((i) => (
    <th key={`inning:${i}`}>{i + 1}</th>
  ))
  console.log('INNINGS!!!', awayScores, homeScores)
  const rows = [awayScores, homeScores].map((scores, i) => (
    <tr key={`scores:${i}`}>
      {Array.from({ ...scores, length: 9 }).map((score, j) => (
        // if there isn't a score, add a hidden underscore so that the cell renders
        <td
          key={`scores:${i}:${j}`}
          style={{ color: score != null ? 'black' : 'white' }}
        >
          {score != null ? score : '_'}
        </td>
      ))}
    </tr>
  ))

  return (
    <div className="innings border-right">
      <table className="innings-table">
        <thead>
          <tr>{headers}</tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  )
}

export default InningColumns

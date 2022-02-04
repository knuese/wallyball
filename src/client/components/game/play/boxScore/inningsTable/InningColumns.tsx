import { FC } from 'react'

export type InningColumnProps = {
  awayScores: number[]
  homeScores: number[]
}

export const InningColumns: FC<InningColumnProps> = ({
  awayScores,
  homeScores
}) => {
  const headers = [...new Array(9).keys()].map((i) => <th>{i + 1}</th>)
  const rows = [awayScores, homeScores].map((scores) => (
    <tr>
      {scores.map((score) => (
        <td>{score}</td>
      ))}
    </tr>
  ))

  return (
    <div className="innings border-right">
      <table className="innings-table">
        <thead>{headers}</thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  )
}

export default InningColumns

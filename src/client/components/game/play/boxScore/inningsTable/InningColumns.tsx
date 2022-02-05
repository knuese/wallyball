import { FC } from 'react'
import { v4 as uuidv4 } from 'uuid'

export type InningColumnProps = {
  awayScores: number[]
  homeScores: number[]
}

export const InningColumns: FC<InningColumnProps> = ({
  awayScores,
  homeScores
}) => {
  const headers = [...new Array(11).keys()].map((i) => (
    <th key={`inning:${i}`}>{i + 1}</th>
  ))
  const rows = [awayScores, homeScores].map((scores, i) => (
    <tr key={`scores:${i}`}>
      {scores.map((score, j) => (
        <td key={`scores:${i}:${j}`}>{score}</td>
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

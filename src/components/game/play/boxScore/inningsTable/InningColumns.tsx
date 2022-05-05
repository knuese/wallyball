import { FC } from 'react'
import classNames from 'classnames'

export type InningColumnProps = {
  currentInning: number
  isBottom: boolean
  awayScores: number[]
  homeScores: number[]
}

export const InningColumns: FC<InningColumnProps> = ({
  currentInning,
  isBottom,
  awayScores,
  homeScores
}) => {
  const arrLength = currentInning <= 9 ? 9 : currentInning

  const headers = [...new Array(arrLength).keys()].map((i) => (
    <th key={`inning:${i}`}>{i + 1}</th>
  ))
  const rows = [awayScores, homeScores].map((scores, i) => (
    <tr key={`scores:${i}`}>
      {Array.from({ ...scores, length: arrLength }).map((score, j) => {
        const isCurrentInningCell = i === Number(isBottom) && j + 1 === currentInning
        const cellHasScore = score != null
        return (
          // if there isn't a score, add a hidden underscore so that the cell renders
          <td
            key={`scores:${i}:${j}`}
            className={classNames({
              'current-inning': isCurrentInningCell,
              'with-score': cellHasScore,
              'without-score': !cellHasScore && !isCurrentInningCell
            })}
          >
            {score ?? '_'}
          </td>
      )})}
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

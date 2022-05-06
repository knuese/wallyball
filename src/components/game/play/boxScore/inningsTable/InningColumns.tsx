import { FC, useEffect, useRef } from 'react'
import classNames from 'classnames'
import { ScoreArray } from '../../../../../store/types/game'

export type InningColumnProps = {
  currentInning: number
  isBottom: boolean
  isOver: boolean
  awayScores: ScoreArray
  homeScores: ScoreArray
}

export const InningColumns: FC<InningColumnProps> = ({
  currentInning,
  isBottom,
  isOver,
  awayScores,
  homeScores
}) => {
  const inningsRef = useRef(null)

  useEffect(() => {
    if (inningsRef.current) {
      (inningsRef.current as any).scrollLeft += 100
    }
  }, [currentInning])

  const arrLength = currentInning <= 9 ? 9 : currentInning

  const headers = [...new Array(arrLength).keys()].map((i) => (
    <th key={`inning:${i}`}>{i + 1}</th>
  ))
  const rows = [awayScores, homeScores].map((scores, i) => (
    <tr key={`scores:${i}`}>
      {Array.from({ ...scores, length: arrLength }).map((score, j) => {
        const isCurrentInningCell =
          !isOver && i === Number(isBottom) && j + 1 === currentInning
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
        )
      })}
    </tr>
  ))

  return (
    <div ref={inningsRef} className="innings border-right">
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

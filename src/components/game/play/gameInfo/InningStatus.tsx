import { FC } from 'react'
import { getOrdinal } from '../../../../util'

export type InningStatusProps = {
  inning: number
  isBottom: boolean
  outs: number
}

export const InningStatus: FC<InningStatusProps> = ({
  inning,
  isBottom,
  outs
}) => {
  const topBottom = isBottom ? 'Bottom' : 'Top'
  const inningText = `${inning}${getOrdinal(inning)}`
  const outText = `${outs} out${outs === 1 ? '' : 's'}`

  return (
    <div className="inning-status flex-row center">
      <span className="margin-right-75">{`${topBottom} ${inningText}`}</span>
      <span className="margin-right-75">|</span>
      <span>{`${outText}`}</span>
    </div>
  )
}

export default InningStatus

import { FC } from 'react'
import { useSelector } from 'react-redux'
import { Tooltip } from 'react-tooltip'
import classnames from 'classnames'
import { RootState } from '../../../store/reducers'
import { Position } from '../../../model'
import { useTeams } from '../../../hooks'
import field from '../../../assets/field.png'
import 'react-tooltip/dist/react-tooltip.css'

export const Field: FC = () => {
  const { bases } = useSelector((state: RootState) => state.game)
  const { batting, fielding } = useTeams()

  const { first, second, third } = bases.getBases()
  const runnerFirst = first?.id && batting.getPlayer(first.id).name
  const runnerSecond = second?.id && batting.getPlayer(second.id).name
  const runnerThird = third?.id && batting.getPlayer(third.id).name

  return (
    <div className="field-container">
      <img id="field-img" src={field} alt="field" />
      <Tooltip anchorId="test" content="BAR" />
      <span
        id="first-base"
        className={classnames('base', { occupied: runnerFirst })}
      />
      <Tooltip anchorId="first-base" content={runnerFirst} />
      <span
        id="second-base"
        className={classnames('base', { occupied: runnerSecond })}
      />
      <Tooltip anchorId="second-base" content={runnerSecond} />
      <span
        id="third-base"
        className={classnames('base', { occupied: runnerThird })}
      />
      <Tooltip anchorId="third-base" content={runnerThird} />
      <span className="fielder" id="p">
        {fielding.defenderAt(Position.PITCHER).name}
      </span>
      <span className="fielder" id="c">
        {fielding.defenderAt(Position.CATCHER).name}
      </span>
      <span className="fielder" id="first">
        {fielding.defenderAt(Position.FIRST_BASE).name}
      </span>
      <span className="fielder" id="second">
        {fielding.defenderAt(Position.SECOND_BASE).name}
      </span>
      <span className="fielder" id="ss">
        {fielding.defenderAt(Position.SHORTSTOP).name}
      </span>
      <span className="fielder" id="third">
        {fielding.defenderAt(Position.THIRD_BASE).name}
      </span>
      <span className="fielder" id="lf">
        {fielding.defenderAt(Position.LEFT_FIELD).name}
      </span>
      <span className="fielder" id="cf">
        {fielding.defenderAt(Position.CENTER_FIELD).name}
      </span>
      <span className="fielder" id="rf">
        {fielding.defenderAt(Position.RIGHT_FIELD).name}
      </span>
    </div>
  )
}

export default Field

import { FC } from 'react'
import { useSelector } from 'react-redux'
import classnames from 'classnames'
import ReactTooltip from 'react-tooltip'
import field from '../../../assets/field.png'
import { RootState } from '../../../store/reducers'
import { Position } from '../../../model'

export const Field: FC = () => {
  const { away, home, isBottom } = useSelector((state: RootState) => state.game)
  const teamToUse = isBottom ? away : home

  if (!teamToUse) {
    throw new Error()
  }

  const tooltips = {
    first: 'Tush',
    second: 'Bo Bo',
    third: 'Cupcake'
  }

  return (
    <div className="field-container">
      <ReactTooltip effect="solid" />
      <img id="field-img" src={field} alt="field" />
      <span
        className={classnames('base', { occupied: false })}
        id="first-base"
        data-tip={tooltips.first}
      />
      <span
        className={classnames('base', { occupied: true })}
        id="second-base"
        data-tip={tooltips.second}
      />
      <span
        className={classnames('base', { occupied: false })}
        id="third-base"
        data-tip={tooltips.third}
      />
      <span className="fielder" id="p">
        {teamToUse.defenderAt(Position.PITCHER).name}
      </span>
      <span className="fielder" id="c">
        {teamToUse.defenderAt(Position.CATCHER).name}
      </span>
      <span className="fielder" id="first">
        {teamToUse.defenderAt(Position.FIRST_BASE).name}
      </span>
      <span className="fielder" id="second">
      {teamToUse.defenderAt(Position.SECOND_BASE).name}
      </span>
      <span className="fielder" id="ss">
        {teamToUse.defenderAt(Position.SHORTSTOP).name}
      </span>
      <span className="fielder" id="third">
        {teamToUse.defenderAt(Position.THIRD_BASE).name}
      </span>
      <span className="fielder" id="lf">
        {teamToUse.defenderAt(Position.LEFT_FIELD).name}
      </span>
      <span className="fielder" id="cf">
        {teamToUse.defenderAt(Position.CENTER_FIELD).name}
      </span>
      <span className="fielder" id="rf">
        {teamToUse.defenderAt(Position.RIGHT_FIELD).name}
      </span>
    </div>
  )
}

export default Field

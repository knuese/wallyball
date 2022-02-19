import { FC } from 'react'
import classnames from 'classnames'
import ReactTooltip from 'react-tooltip'
import field from '../../../assets/field.png'

export const Field: FC = () => {
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
        Gary
      </span>
      <span className="fielder" id="c">
        Shells
      </span>
      <span className="fielder" id="first">
        Browny
      </span>
      <span className="fielder" id="second">
        Glen
      </span>
      <span className="fielder" id="ss">
        George
      </span>
      <span className="fielder" id="third">
        Guss
      </span>
      <span className="fielder" id="lf">
        Chan
      </span>
      <span className="fielder" id="cf">
        Zoona
      </span>
      <span className="fielder" id="rf">
        Cookie
      </span>
    </div>
  )
}

export default Field

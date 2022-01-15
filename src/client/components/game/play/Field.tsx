import { FC } from 'react'
import field from '../../../assets/field.png'

export const Field: FC = () => {
  return (
    <div className="field-container">
      <img id="field-img" src={field} alt="field" />
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

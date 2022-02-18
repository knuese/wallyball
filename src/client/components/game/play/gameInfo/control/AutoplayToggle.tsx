import React, { FC } from 'react'

export type AutoplayToggleProps = {
  checked?: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const AutoplayToggle: FC<AutoplayToggleProps> = ({
  checked,
  onChange
}) => (
  <div className="flex-row center control-item">
    <span className="switch-label">Autoplay</span>
    <label className="switch">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className="slider round" />
    </label>
  </div>
)

export default AutoplayToggle

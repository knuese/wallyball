import React, { FC } from 'react'

export type AutoplayToggleProps = {
  checked?: boolean
  onChange: (checked: boolean) => void
}

export const AutoplayToggle: FC<AutoplayToggleProps> = ({
  checked,
  onChange
}) => (
  <div className="flex-row center control-item">
    <span className="switch-label">Autoplay</span>
    <label className="switch">
      <input
        type="checkbox"
        checked={checked}
        onChange={({
          target: { checked }
        }: React.ChangeEvent<HTMLInputElement>) => onChange(checked)}
      />
      <span className="slider round" />
    </label>
  </div>
)

export default AutoplayToggle

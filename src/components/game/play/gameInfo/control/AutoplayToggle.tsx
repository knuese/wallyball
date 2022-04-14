import React, { FC } from 'react'

export type AutoplayToggleProps = {
  checked?: boolean
  disabled?: boolean
  onChange: (checked: boolean) => void
}

export const AutoplayToggle: FC<AutoplayToggleProps> = ({
  checked,
  disabled,
  onChange
}) => (
  <div className="flex-row center control-item">
    <span className="switch-label">Autoplay</span>
    <label className="switch">
      <input
        data-testid="autoplay-toggle"
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={({
          target: { checked }
        }: React.ChangeEvent<HTMLInputElement>) => onChange(checked)}
      />
      <span className="slider round" />
    </label>
  </div>
)

export default AutoplayToggle

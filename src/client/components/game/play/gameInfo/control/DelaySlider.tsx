import { FC } from 'react'
import { Range, getTrackBackground } from 'react-range'

const ACTIVE_BLUE = '#2196F3'
const INACTIVE_GRAY = '#CCC'

export type DelaySliderProps = {
  value: number
  disabled?: boolean
  onChange: ([newValue]: number[]) => void
}

export const DelaySlider: FC<DelaySliderProps> = ({
  disabled,
  value,
  onChange
}) => (
  <div className="flex-row center control-item">
    <span className="switch-label">Delay</span>
    <div className="flex-column center" style={{ width: '40%' }}>
      <Range
        disabled={disabled}
        step={1}
        min={1}
        max={5}
        values={[value]}
        onChange={onChange}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '6px',
              width: '100%',
              background: disabled
                ? INACTIVE_GRAY
                : getTrackBackground({
                    values: [value],
                    colors: [ACTIVE_BLUE, INACTIVE_GRAY],
                    min: 1,
                    max: 5
                  })
            }}
          >
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '12px',
              width: '12px',
              backgroundColor: disabled ? INACTIVE_GRAY : '#FFF',
              border: '1px solid',
              borderRadius: '16px',
              borderColor: disabled ? '#AAA' : ACTIVE_BLUE
            }}
          />
        )}
      />
      <output style={{ marginTop: '5px' }}>{value}s</output>
    </div>
  </div>
)

export default DelaySlider

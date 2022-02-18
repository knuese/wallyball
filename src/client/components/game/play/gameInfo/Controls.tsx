import React, { FC, useState } from 'react'
import { AutoplayToggle, DelaySlider } from './control'

export const Controls: FC = () => {
  const [autoplay, setAutoplay] = useState(false)
  const [delay, setDelay] = useState(5)

  const onAutoplayChange = ({
    target: { checked }
  }: React.ChangeEvent<HTMLInputElement>) => {
    setAutoplay(checked)
  }

  const onDelayChange = ([newDelay]: number[]) => {
    console.log(newDelay)
    setDelay(newDelay)
  }

  return (
    <div className="flex-column border-all control-panel">
      <div className="center game-info-title">CONTROLS</div>
      <div className="center">
        <br />
        <AutoplayToggle checked={autoplay} onChange={onAutoplayChange} />
        <DelaySlider
          value={delay}
          disabled={!autoplay}
          onChange={onDelayChange}
        />
        <div className="control-item">
          <button>Substitute</button>
        </div>
      </div>
    </div>
  )
}

export default Controls

import { FC, useEffect, useState } from 'react'
import { AutoplayToggle, DelaySlider } from './control'

export const Controls: FC = () => {
  const [intervalRef, setIntervalRef] = useState<NodeJS.Timeout>()
  const [autoplay, setAutoplay] = useState(false)
  const [delay, setDelay] = useState(5)

  const onInterval = (timeout: number) => {
    console.log('hi')
    setIntervalRef(setTimeout(() => onInterval(timeout), timeout))
  }

  useEffect(() => {
    if (intervalRef) {
      clearTimeout(intervalRef)
    }

    if (autoplay) {
      onInterval(delay * 1000)
    }
  }, [autoplay, delay])

  return (
    <div className="flex-column border-all control-panel">
      <div className="center game-info-title">CONTROLS</div>
      <div className="center">
        <br />
        <AutoplayToggle checked={autoplay} onChange={setAutoplay} />
        <DelaySlider disabled={!autoplay} onChange={setDelay} />
        <div className="flex-row center control-item">
          <button disabled={autoplay} style={{ marginRight: '1rem' }}>
            Simulate At Bat
          </button>
          <button disabled={autoplay}>Substitute</button>
        </div>
      </div>
    </div>
  )
}

export default Controls

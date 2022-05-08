import { FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { requestSimulation } from '../../../../store/actions/game'
import { AutoplayToggle, DelaySlider } from './control'

export type ControlsProps = {
  outs: number
  isOver?: boolean
}

export const Controls: FC<ControlsProps> = ({ outs, isOver }) => {
  const dispatch = useDispatch()
  const [intervalRef, setIntervalRef] = useState<NodeJS.Timeout>()
  const [autoplay, setAutoplay] = useState(false)
  const [delay, setDelay] = useState(5)

  const simulate = () => {
    dispatch(requestSimulation() as any)
  }

  const onInterval = (timeout: number) => {
    simulate()
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
        <AutoplayToggle
          checked={autoplay && !isOver}
          disabled={isOver}
          onChange={setAutoplay}
        />
        <DelaySlider disabled={!autoplay || isOver} onChange={setDelay} />
        <div className="flex-row center control-item">
          <button
            onClick={simulate}
            disabled={autoplay || isOver}
            style={{ marginRight: '1rem' }}
          >
            {outs === 3 ? 'Switch Sides' : 'Simulate At Bat'}
          </button>
          <button disabled={autoplay || isOver}>Substitute</button>
        </div>
      </div>
    </div>
  )
}

export default Controls

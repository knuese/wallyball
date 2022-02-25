import { FC } from 'react'

export type PlayHistoryProps = {
  plays: string[]
}

export const PlayHistory: FC<PlayHistoryProps> = ({ plays }) => (
  <div className="flex-column play-history border-all">
    <div className="center game-info-title absolute-center-horizontal">
      PLAY HISTORY
    </div>
    <div className="flex-column play-history-list">
      {plays.reduce(
        (acc, cur, i) => [
          ...acc,
          <span
            key={cur}
            style={{ backgroundColor: i % 2 === 0 ? '#FFF' : '#DDD' }}
          >
            {cur}
          </span>
        ],
        [] as JSX.Element[]
      )}
    </div>
  </div>
)

export default PlayHistory

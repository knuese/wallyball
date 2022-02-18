import { FC } from 'react'

export type PlayDescriptorProps = {
  text: string
}

export const PlayDescriptor: FC<PlayDescriptorProps> = ({ text }) => (
  <div className="flex-column play-descriptor border-all">
    <div className="center game-info-title">LAST PLAY</div>
    <p>{text}</p>
  </div>
)

export default PlayDescriptor

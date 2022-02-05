import { FC } from 'react'

export type PlayDescriptorProps = {
  text: string
}

export const PlayDescriptor: FC<PlayDescriptorProps> = ({ text }) => (
  <div className="play-descriptor border-all margin-top-half">{text}</div>
)

export default PlayDescriptor

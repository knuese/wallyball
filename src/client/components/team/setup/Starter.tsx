import { FC } from 'react'

export type StarterProps = {
  index: number
}

export const Starter: FC<StarterProps> = ({ index }) => {
  return (
    <div>
      <span>{`${index + 1}.`}</span>
      <input />
      <select />
    </div>
  )
}

export default Starter

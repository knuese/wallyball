import { FC, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

export type DropzoneProps = {
  instructionMessage?: string | JSX.Element
}

export const Dropzone: FC<DropzoneProps> = ({
  instructionMessage = 'Select a file to upload.'
}) => {
  const onDrop = useCallback((files) => {}, [])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'application/json'
  })

  const msg =
    typeof instructionMessage === 'string' ? (
      <p>{instructionMessage}</p>
    ) : (
      instructionMessage
    )

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {msg}
    </div>
  )
}

export default Dropzone

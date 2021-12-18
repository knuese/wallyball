import { FC, useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'

export type DropzoneProps = {
  instructionMessage?: string | JSX.Element
  onFileLoaded: (file: File) => void
}

export const Dropzone: FC<DropzoneProps> = ({
  instructionMessage = 'Select a file to upload.',
  onFileLoaded
}) => {
  const [file, setFile] = useState<File | null>(null)

  const onDrop = useCallback(
    ([file]: File[]) => {
      setFile(file)
      onFileLoaded(file)
    },
    [onFileLoaded]
  )

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'application/json'
  })

  let msg

  if (file) {
    msg = (
      <p>
        Uploaded: <b>{file.name}</b>
      </p>
    )
  } else {
    msg =
      typeof instructionMessage === 'string' ? (
        <p>{instructionMessage}</p>
      ) : (
        instructionMessage
      )
  }

  return (
    <div {...getRootProps()} style={{ margin: '1rem' }}>
      <input {...getInputProps()} />
      {msg}
    </div>
  )
}

export default Dropzone

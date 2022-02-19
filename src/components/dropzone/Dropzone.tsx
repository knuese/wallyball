import React, { FC, useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { IconContext } from 'react-icons'
import {
  MdCancel as RemoveFileIcon,
  MdUpload as UploadIcon
} from 'react-icons/md'
import classnames from 'classnames'

export type DropzoneProps = {
  instructionMessage?: string | JSX.Element
  onFileLoaded: (file: File) => void
  onFileRemoved: () => void
}

export const Dropzone: FC<DropzoneProps> = ({
  instructionMessage = 'Select a file to upload.',
  onFileLoaded,
  onFileRemoved
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

  const icon = (
    <IconContext.Provider
      value={{ color: file ? 'red' : 'black', size: '1.25em' }}
    >
      {file ? <RemoveFileIcon /> : <UploadIcon />}
    </IconContext.Provider>
  )

  const onIconClick = (e: React.MouseEvent) => {
    if (file) {
      e.preventDefault()
      setFile(null)
      onFileRemoved()
    }
  }

  const { onClick: onDropzoneClick, ...rootProps } = getRootProps()
  const dropzoneClickHandler = (e: React.MouseEvent) => {
    if (!e.defaultPrevented && !file) {
      onDropzoneClick(e)
    }
  }

  return (
    <div
      {...rootProps}
      onClick={dropzoneClickHandler}
      className={classnames('dropzone', 'flex-row', 'center', {
        'with-file': file
      })}
    >
      <span className="dropzone-icon" onClick={onIconClick}>
        {icon}
      </span>
      <input {...getInputProps()} />
      {msg}
    </div>
  )
}

export default Dropzone

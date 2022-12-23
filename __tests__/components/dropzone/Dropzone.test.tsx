import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import { useDropzone } from 'react-dropzone'
import { Dropzone } from '../../../src/components'

jest.mock('react-dropzone')

describe('<Dropzone />', () => {
  const defaultMessage = 'Select a file to upload.'
  const mockFile = { name: 'mock.json' }

  beforeEach(() => {
    ;(useDropzone as jest.Mock<any>).mockImplementation(
      ({ onDrop }: { onDrop: (files: any[]) => void }) => ({
        getRootProps: jest.fn(() => ({
          onClick: jest.fn(() => {
            onDrop([mockFile])
          })
        })),
        getInputProps: jest.fn()
      })
    )
  })

  it.each([
    ['default message', undefined, defaultMessage],
    ['custom message', 'Please upload a file.', 'Please upload a file.'],
    ['JSX message', <p>Upload here.</p>, 'Upload here.']
  ])('renders the component - %s', (_desc, instruction, expected) => {
    const { getByText } = render(
      <Dropzone
        instructionMessage={instruction}
        onFileLoaded={jest.fn()}
        onFileRemoved={jest.fn()}
      />
    )
    expect(getByText(expected)).toBeInTheDocument()
  })

  it('clicks the dropzone', () => {
    const mockOnFileLoaded = jest.fn()
    const { getByText } = render(
      <Dropzone onFileLoaded={mockOnFileLoaded} onFileRemoved={jest.fn()} />
    )

    fireEvent.click(getByText(defaultMessage))

    expect(getByText('Uploaded:')).toBeInTheDocument()
    expect(getByText(mockFile.name)).toBeInTheDocument()
    expect(mockOnFileLoaded).toHaveBeenCalledWith(mockFile)
  })

  it('removes an uploaded file', () => {
    const mockOnFileRemoved = jest.fn()
    const { getByText, container } = render(
      <Dropzone onFileLoaded={jest.fn()} onFileRemoved={mockOnFileRemoved} />
    )

    fireEvent.click(getByText(defaultMessage))
    fireEvent.click(container.querySelector('.dropzone-icon') as Element)

    expect(mockOnFileRemoved).toHaveBeenCalledTimes(1)
  })
})

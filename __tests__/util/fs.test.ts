import { fs } from '../../src/util'
import mockFsModule from 'fs'

jest.mock('fs')

describe('fs', () => {
  const path = 'test-path'
  const data = '{ "foo": "bar" }'

  describe('readFile', () => {
    it('returns the data from the file', async () => {
      ;(mockFsModule.existsSync as jest.Mock).mockReturnValue(true)
      mockFsModule.promises = {
        readFile: (p: string) => {
          if (p === path) return data
          else throw new Error('wrong path')
        }
      } as any

      const actual = await fs.readFile(path)
      expect(actual).toEqual(data)
    })

    it('throws if the path does not exist', async () => {
      ;(mockFsModule.existsSync as jest.Mock).mockReturnValue(false)

      try {
        await fs.readFile(path)
        throw new Error('should have thrown but did not')
      } catch (e) {
        expect(e).toEqual(new Error('file not found!'))
      }
    })
  })

  describe('writeFile', () => {
    it('writes the data', async () => {
      // make sure the callback is called (no error -> success)
      ;(mockFsModule.writeFile as any as jest.Mock).mockImplementation(
        (_path, _data, cb) => cb()
      )

      await fs.writeFile(path, data)
      expect(mockFsModule.writeFile).toHaveBeenCalledWith(
        path,
        data,
        expect.any(Function)
      )
    })

    it('handles an error', async () => {
      const e = new Error('failed to write file')
      ;(mockFsModule.writeFile as any as jest.Mock).mockImplementation(
        (_path, _data, cb) => cb(e)
      )

      const alertSpy = jest
        .spyOn(window, 'alert')
        .mockImplementation(() => undefined)

      await fs.writeFile(path, data)
      expect(alertSpy).toHaveBeenCalledWith(
        'failed to save stats, see console for details'
      )
    })
  })
})

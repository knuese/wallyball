const fs = window.require('fs')

export const readFile = async (path: string): Promise<string> => {
  let data

  if (fs.existsSync(path)) {
    data = await fs.promises.readFile(path, 'utf8')
  }

  return data || '{}'
}

export const writeFile = async (path: string, data: string): Promise<void> => {
  fs.writeFile(path, data, (err: any) => {
    if (err) {
      alert('failed to save stats, see console for details')
      console.log(err)
    }
  })
}

export const readFile = async (path: string): Promise<string> => {
  let data

  if (window.fs?.existsSync(path)) {
    data = await window.fs.promises.readFile(path, 'utf8')
  }

  return data || '{}'
}

export const writeFile = async (path: string, data: string): Promise<void> => {
  if (window.fs) {
    window.fs.writeFile(path, data, (err: any) => {
      if (err) {
        alert('failed to save stats, see console for details')
        console.log(err)
      }
    })
  }
}

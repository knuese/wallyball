import { app, BrowserWindow } from 'electron'
import path from 'path'

const createWindow = () => {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  if (!!process.env.IS_DEV) {
    // load index.html from the vite server
    win.loadURL('http://localhost:5173')
    win.webContents.openDevTools()
  } else {
    // load index.html from the dist folder
    win.loadURL(`file://${path.join(__dirname, '..', 'dist', 'index.html')}`)
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  app.quit()
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

const { contextBridge } = require('electron')
const fs = require('fs')

contextBridge.exposeInMainWorld('fs', fs)

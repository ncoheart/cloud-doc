const { app, BrowserWindow } = require('electron')
const isDev = require("electron-is-dev")
let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 1024,
        height: 680,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: true
        }
    })
    const urlLocation = isDev ? 'http://localhost:3000' : 'http://baidu.com'
    mainWindow.loadURL(urlLocation)
    mainWindow.webContents.openDevTools()
})
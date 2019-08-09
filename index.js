const { app, BrowserWindow, clipboard, Menu } = require('electron')
const path = require('path')

let mainWindow = null

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // let views = path.join(__dirname, '../../views')
  global.web = mainWindow.webContents
  mainWindow.loadURL(`file://${path.join(__dirname, 'index.html')}`)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  global.web.on('dom-ready', e => {
    mainWindow.webContents.openDevTools()
    mainWindow && mainWindow.show()
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

let template = [
  {
    label: 'Edit',
    submenu: [{ label: 'Paste', click: () => pasteImage() }]
  }
]

let menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)

function pasteImage() {
  let img = clipboard.readImage()
  console.log('send paste message')
  mainWindow && mainWindow.webContents.send('paste-image', img.toBitmap(), img.getSize())
}
const { app, BrowserWindow, Menu, Tray, globalShortcut } = require('electron')
const path = require("path")

let tray
let mainWindow

const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) app.exit()
else {
    function createWindow() {
        Menu.setApplicationMenu(null) // 隐藏菜单栏
        mainWindow = new BrowserWindow({
            webPreferences: {
                nodeIntegrationInWorker: true
            },
            fullscreen: false, // 全屏模式
            icon: path.join(__dirname, 'favicon.png')
        })

        mainWindow.loadURL('') // 装载的URL地址

        // mainWindow.loadFile('./ng-cc/index.html') // 将本地文件打包
        mainWindow.maximize(); // 打开时最大化

        mainWindow.on('close', e => {
            e.preventDefault();
            mainWindow.hide();
        })
    }

    app.on('ready',() => {
        globalShortcut.register('Ctrl+Shift+I', function () {
            mainWindow.webContents.openDevTools();
        })
        createWindow();
    })

    app.on('activate', () => {
        if (mainWindow === null) {
            createWindow()
        }
    })

    app.whenReady().then(() => {
        tray = new Tray(path.join(__dirname, 'favicon.png'))
        const contextMenu = Menu.buildFromTemplate([
            { label: '显示', click: () => { mainWindow.show() } },
            { label: '退出', click: () => { app.exit() } }
        ])
        tray.setToolTip('ESS')
        tray.setContextMenu(contextMenu)
    })

}
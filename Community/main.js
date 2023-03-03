const { app, BrowserWindow, Menu, Tray, dialog } = require('electron')
const path = require("path")

let tray
let mainWindow

const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) app.quit()
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
    }
    
    app.on('close', (e) => {
        e.preventDefault();
        mainWindow.hide();
        mainWindow.setSkipTaskbar(true);
    })

    app.on('closed', () => {
        mainWindow = null;//移除相应窗口的引用对象，避免再次使用它.
    })

    app.on('ready', createWindow)
    app.on('activate', () => {
        if (mainWindow === null) {
            createWindow()
        }
    })

    app.on('window-all-closed', (e) => {
        createWindow();
        dialog.showMessageBox({
            type: 'info',
            title: '提示',
            message: '确认退出？',
            buttons: ['直接退出', '退到系统托盘'],
            cancelId: 1,
        }).then(idx => {
            if (idx.response == 1) {
                e.preventDefault();
                mainWindow.hide();
            } else {

                app.exit();
            }
        }).catch(err => { })
    })

    app.whenReady().then(() => {
        tray = new Tray(path.join(__dirname, 'favicon.png'))
        const contextMenu = Menu.buildFromTemplate([
            { label: '显示', click: () => { mainWindow.show() } },
            { label: '退出', click: () => { app.quit() } }
        ])
        tray.setToolTip('Community')
        tray.setContextMenu(contextMenu)
    })

}
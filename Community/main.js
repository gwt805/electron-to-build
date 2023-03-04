const { app, BrowserWindow, Menu, Tray, Notification, globalShortcut } = require('electron');
const qIsOnline = require('qiao-is-online');
const path = require("path");

let tray, mainWindow, cron
let cron_flag = true
const URL = ""
const Tip_Tit = ""

const netDect = async () => {
    const isOnline = await qIsOnline.isOnline();
    const option = {
        title: Tip_Tit + " 网络提示",
        body_successful: "您的网络已经断开!",
        body_error: "您的网络已连接!",
        icon: './favicon.png'
   };
    if (isOnline == "online" && cron_flag == false) {
        cron_flag = true;
        new Notification({title:option.title, body:option.body_error, icon: option.icon}).show();
    }
    if (isOnline == 'offline' && cron_flag == true) {
        cron_flag = false;
        new Notification({title: option.title, body: option.body_successful, icon: option.icon}).show();
    }
};

function createWindow() {
    Menu.setApplicationMenu(null) // 隐藏菜单栏
    mainWindow = new BrowserWindow({
        webPreferences: { nodeIntegrationInWorker: true },
        fullscreen: false, // 全屏模式
        icon: path.join(__dirname, 'favicon.png')
    })
    mainWindow.loadURL(URL) // 装载的URL地址
    mainWindow.maximize(); // 打开时最大化
    mainWindow.on('close', e => {
        e.preventDefault();
        mainWindow.hide();
    })
}

const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) { app.exit() }
else {
    app.on('ready',() => {
        globalShortcut.register('Ctrl+Shift+I', () => { mainWindow.webContents.openDevTools(); });
        globalShortcut.register('F5', () => { mainWindow.reload() });
        createWindow();
    })
    app.on('activate', () => {
        if (mainWindow === null) { createWindow() }
    })
    app.whenReady().then(() => {
        tray = new Tray(path.join(__dirname, 'favicon.png'))
        const contextMenu = Menu.buildFromTemplate([
            { label: '显示', click: () => { mainWindow.show() } },
            { label: '退出', click: () => { clearInterval(cron); app.exit() } }
        ]);
        tray.setToolTip(Tip_Tit);
        tray.setContextMenu(contextMenu);
    }).then(() => { cron = setInterval(netDect, 1000);})
}
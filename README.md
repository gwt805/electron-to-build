<div align='center'>
    <img src='./favicon.png' width="32px">
</div>

# 已有功能
- 点击关闭，提示退出，还是缩小至托盘
- 托盘菜单：退出，显示


# 各平台打包 icon 

| Winodws     | MacOS       | Linux     |
| ----------- | ----------- | --------- |
| .ico        | .icns       |.png       |

# packages.json
```
description: 即 打包后鼠标放在任务栏图标上显示的文字

打包时，需要将 dependencies 中的内容清空，把本文件挪走，不然会连这个文件一起打包进去的
```

# 打包教程
- 安装 node
  - 设置镜像
    - npm config set registry https://registry.npm.taobao.org
    - npm config get registry
  - 安装 electron 及打包工具
    - export ELECTRON_MIRROR=https://npm.taobao.org/mirrors/electron/
    - npm install -S electron
    - npm install -S electron-builder
  
- 打开终端
    - 设置 electron 的镜像
        - export ELECTRON_MIRROR=https://npm.taobao.org/mirrors/electron/
    - 安装依赖
        - npm install
    - 修改 main.js 中的 mainWindow.loadURL 参数 (line:20)
    - 开始打包
        - windows
            - npm run dist-win
        - linux
            - npm run dist-linux
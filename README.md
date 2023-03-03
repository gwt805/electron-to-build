<div align='center'>
    <img src='./Community/favicon.png' width="32px">
</div>

# 已有功能
- 点击关闭，提示退出，还是缩小至托盘
- 托盘菜单：退出，显示


# 注意事项
- 各平台打包 icon 
    - | Winodws     | MacOS       | Linux     |
      | ----------- | ----------- | --------- |
      | .ico        | .icns       |.png       |



- main.js
    - tray.setToolTip('xxx') 这里要修改成 你想要的提示，即鼠表放在任务栏图标上的提示，不过好像没生效？具体可实验，生效的可能是 package.json 中的 description

- package.json
    - name: 即 APP 的名字

    - build 中 的 productName 也是 APP 的 名字

    - description: 即 打包后鼠标放在任务栏图标上显示的文字

    - 打包时，需要将 dependencies 中的内容清空，把本文件挪走，不然会连这个文件一起打包进去的

    - Linux 打包时，需要对 author 中gwt 后面添加 邮箱：Inc <xxx@xx.com>

    - windows 打包时，author 中 只保留 gwt 即可，另 author 和 build 中的appID 的 com.example.xx xx 同名

    - 每次 打包时，都需要清空 dist文件夹里的内容，或者直接删除 dist 文件夹


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

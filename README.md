<div align='center'>
    <img src='./Community/favicon.png' width="32px">
</div>


# 已有功能
- 点击关闭 直接 缩小至托盘
- 托盘菜单：退出，显示
- 网络断开/连接 后 消息通知
- 打开开发者工具: Ctrl + Shift + I
- 刷新: F5


# 环境
```JSON
"electron": "^23.1.2",
"electron-builder": "^23.6.0",
"qiao-is-online": "^1.0.6"
```


# 注意事项
- 每次打包的时候都需要删除前一次的 Cache
    - Windows
        - 删除 C:\Users\xx\AppData\Local\electron-builder\Cache\ 下的所有内容
        - 删除 C:\Users\gs\AppData\Local\electron\Cache\ 下的所有内容
    - Linux
        - 删除 ~/.cache/electron/*
        - 删除 ~/.cache/electron-builder/*

- 每次 打包时，都需要清空 dist文件夹里的内容，或者直接删除 dist 文件夹

- 各平台打包 icon 
    - | Winodws     | MacOS       | Linux     |
      | ----------- | ----------- | --------- |
      | .ico        | .icns       |.png       |

- 特别注意的是 各个平台的 icon/icns/png 都必须是 256x256 像素
- main.js
    - 修改 URL 参数; 即服务访问地址

    - 修改 Tip_Tit 参数; 即鼠表放在任务栏图标上的提示，需和 packag.json 中的 description 内容一致

- package.json
    - name: 即 APP 的名字

    - build 中 的 productName 也是 APP 的 名字

    - description: 即 打包后鼠标放在任务栏图标上显示的文字

    - 打包时，需要将 dependencies 中的内容清空, 仅保留 `qiao-is-online`

    - Linux 打包时，需要对 author 中gwt 后面添加 邮箱：Inc <xxx@xx.com>

    - windows 打包时，author 中 只保留 gwt 即可，另 author 和 build 中的appID 的 com.example.xx xx 同名


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
    - 开始打包
        - windows
            - npm run dist-win
        - linux
            - npm run dist-linux

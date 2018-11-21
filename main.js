// const electron = require('electron');
const fs = require('fs');
const path = require('path');
const { ipcMain, app, BrowserWindow, globalShortcut, Menu, Tray } = require('electron');

const winWidth = 800;
const winHeightUnit = 56;

function createWindow () {
  // 创建浏览器窗口
  win = new BrowserWindow({
    // width: 1440,
    width: winWidth,
    // height: 876,
    height: winHeightUnit,
    // file: './index.html'
    // webPreferences: {
    //   webSecurity: false
    // },
    frame: false,
    resizable: false
  });

  // 然后加载应用的 index.html。
  win.loadFile('./dist/index.html');

  // =========================
  // Tray 文件盒；托盘；隔底匣；（无线电的）发射箱
  const iconName = 'iconTemplate.png' // process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png'
  console.log(path.join(__dirname, 'public/img'));
  const iconPath = path.join(path.join(__dirname, 'public/img'), iconName)
  appIcon = new Tray(iconPath)

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Event',
      click: () => {
        // event.sender.send('tray-removed')

        // const notification = {
        //   title: 'Notification with image',
        //   body: 'Short message plus a custom image',
        //   // icon: path.join(__dirname, './public/img/programming.png')
        // };
        // const myNotification = new window.Notification(notification.title, notification);
        console.log('Oh! Event!~');
      }
    },
    {
      label: 'Exit',
      click: () => {
        console.log('Oh! Exit!~');
      }
    }
  ])

  appIcon.setToolTip('Electron Demo in the tray.');
  appIcon.setContextMenu(contextMenu);
  // =========================

  // console.log(window);
  // async method
  // window.webContents.send('test-event', 'whoooooooh!');

  // console.log(global);


  fs.readFile('./result.json', (err, data) => {
    if (err) throw err;
    let tmp = JSON.parse(data);
    global.sharedObject = {
      originData: tmp
    };
  });
  ipcMain.on('reply-test', (event, arg) => {
    console.log(arg);
    // const notification = {
    //   title: 'Notification with image',
    //   body: 'Short message plus a custom image' + arg,
    //   // icon: path.join(__dirname, './public/img/programming.png')
    // };
    // const myNotification = new window.Notification(notification.title, notification);
  });
  ipcMain.on('change-win', (event, arg) => {
    // console.log(arg);
    // console.log(arg.listHeight);
    // console.log(typeof arg.listHeight);
    win.setSize(winWidth, winHeightUnit * (arg.listHeight + 1));
  });

  // 打开开发者工具
  win.webContents.openDevTools();

  globalShortcut.register('CmdOrCtrl+Y', () => {
    // Do stuff when Y and either Command/Control is pressed.
    console.log('CmdOrCtrl+Y');
  });
  globalShortcut.register('Ctrl+Y', () => {
    // Do stuff when Y and Ctrl is pressed.
    console.log('Ctrl+Y');
  })
}

app.on('ready', createWindow)
// const electron = require('electron');
const fs = require('fs');
const path = require('path');
const { ipcMain, app, BrowserWindow, globalShortcut, Menu, Tray } = require('electron');

const winWidth = 800;
const winHeightUnit = 56;
let win = null;
let winFlag = true;

const hideOrShowWin = ifShow => {
  if (ifShow) {
    win.show();
    winFlag = true;
  } else {
    win.hide();
    winFlag = false;
  }
}

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
        console.log('Oh! Event!~');
        hideOrShowWin(true);
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
  });
  ipcMain.on('change-win', (event, arg) => {
    // console.log(arg);
    // console.log(arg.listHeight);
    // console.log(typeof arg.listHeight);
    win.setSize(winWidth, winHeightUnit * (arg.listHeight + 1));
  });

  // 打开开发者工具
  win.webContents.openDevTools();
  win.on('close', e => {
    console.log('app.quitting? ', app.quitting);
    if (app.quitting) {
      win = null;
    } else {
      e.preventDefault();
      hideOrShowWin(false);
    }
  });


  globalShortcut.register('Alt+Space', () => {
    console.log('Alt+Space');
    if (winFlag) {
      hideOrShowWin(false);
    } else {
      hideOrShowWin(true);
    }
  });

  globalShortcut.register('CmdOrCtrl+Y', () => {
    // Do stuff when Y and either Command/Control is pressed.
    console.log('CmdOrCtrl+Y');
  });
  globalShortcut.register('Ctrl+M', () => {
    win.webContents.send('mode-change');
  });
}

app.on('ready', createWindow);

setTimeout(() => {
  app.dock.hide();
}, 600);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => { hideOrShowWin(true) });

app.on('before-quit', () => app.quitting = true);

const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const express = require('express');

//TODO: Maybe get rid of express?
let router = express();
let win;

function createWindow(){
  win = new BrowserWindow({width: 800, height: 600});
  const winPath = path.join('file://', __dirname, 'index.html');

  win.loadURL(winPath);

  win.webContents.openDevTools();

  win.on('closed', () => {
    win = null;
  })
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if(process.platform !== 'darwin'){
    app.quit();
  }
})

app.on('activate', () => {
  if(win === null){
    createWindow();
  }
})

ipcMain.on('test-message', (event, arg) => {
  console.log(arg);
  event.returnValue = 'you bet it is!';
})
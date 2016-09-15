const {app, BrowserWindow} = require('electron');
const path = require('path');

let win;

function createWindow(){
  win = new BrowserWindow({width: 800, height: 600});
  const winPath = path.join('file://', __dirname, 'index.html');

  win.loadURL(winPath);

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
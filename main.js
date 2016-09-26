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

ipcMain.on('test-delivery', (event, arg) => {
  console.log(arg);
  let itemCount = arg.itemPriceArray.length;
  let itemPriceArray = arg.itemPriceArray;
  // let total;

  // for(let i=0; i<itemPriceArray.length; i++){
  //   total += parseFloat(itemPriceArray[i]);
  // }

  //need to split costs of delivery and tip. Tax is then added as a percentage of original order?
  //TODO: assumes one item per person. fix this
  let splitDeliveryFee = parseFloat(arg.orderMainDeliveryFee)/itemCount;
  let splitTipFee = parseFloat(arg.orderTip)/itemCount;

  let totalTaxAmount = 0;

  for(let i=0; i<itemCount; i++){
    totalTaxAmount += parseFloat(itemPriceArray[i]) * .06;
  }

  let extraFeeAmount = parseFloat(arg.orderTaxAndFees) - totalTaxAmount;
  let splitExtraFee = extraFeeAmount/itemCount;
  let totalItemPrice = [];

  for(let i=0; i<itemCount; i++){
    //console.log(i);
    console.log(parseFloat(itemPriceArray[i]) + splitDeliveryFee + splitTipFee + splitExtraFee);
    console.log(parseFloat(itemPriceArray[i]));
    console.log(splitDeliveryFee);
    console.log(splitTipFee);
    console.log(splitExtraFee);
    totalItemPrice[i] = parseFloat(itemPriceArray[i]) + splitDeliveryFee + splitTipFee + splitExtraFee;
  }

  event.returnValue = totalItemPrice;
})
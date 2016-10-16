const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');

let win;

function createWindow(){
  win = new BrowserWindow({width: 800, height: 600});
  const winPath = path.join('file://', __dirname, 'index.html');

  win.loadURL(winPath);

  //to open console on application load
  win.webContents.openDevTools();

  win.on('closed', () => {
    win = null;
  })
}

function GeneralException(message){
  this.message = message;
  this.name = "GeneralException"
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

//TODO: Validate user input (e.g. input tax amount is less than valid tax amount)
ipcMain.on('test-delivery', (event, arg) => {
  console.log(arg);
  let itemCount = arg.itemPriceArray.length;
  let itemPriceArray = arg.itemPriceArray;

  //need to split costs of delivery and tip. Tax is then added as a percentage of original order?
  //TODO: assumes one item per person. fix this
  let splitDeliveryFee = parseFloat(arg.orderMainDeliveryFee)/itemCount;
  let splitTipFee = parseFloat(arg.orderTip)/itemCount;

  let totalTaxAmount = 0;

  for(let i=0; i<itemCount; i++){
    totalTaxAmount += parseFloat(itemPriceArray[i]) * .06;
  }

  if(orderTip < totalTaxAmount){
    throw new GeneralException('Invalid Tax amount');
  }

  let extraFeeAmount = parseFloat(arg.orderTaxAndFees) - totalTaxAmount;
  let splitExtraFee = extraFeeAmount/itemCount;
  let totalItemPrice = [];

  for(let i=0; i<itemCount; i++){
    console.log('Base item price: ' + parseFloat(itemPriceArray[i]));
    console.log('Per person delivery fee: ' + splitDeliveryFee);
    console.log('Per person tip fee: ' + splitTipFee);
    console.log('Per person \'extra fee\': ' + splitExtraFee);
    console.log('Per person total: ' + (parseFloat(itemPriceArray[i]) + splitDeliveryFee + splitTipFee + splitExtraFee));
    totalItemPrice[i] = parseFloat(itemPriceArray[i]) + splitDeliveryFee + splitTipFee + splitExtraFee;
    console.log('===================================================================');
  }

  event.returnValue = totalItemPrice;
})
const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
const MenuItem = electron.MenuItem;
const path = require("path");
const isDev = require("electron-is-dev");
const ipcMain = electron.ipcMain;



let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 900,
        height: 680,
        icon: path.join(__dirname, '/logo/images.png'),
        webPreferences: {
            nodeIntegration: true,
            webSecurity: false
        }
    });

    //on minimize small window pop up
    mainWindow.once('focus', () => mainWindow.flashFrame(false))
    mainWindow.flashFrame(true)

    // menu item
    const template = [{
        label: '',
        submenu: []
    }]
    // menu 
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu)


    mainWindow.loadURL(
        isDev ?
            "http://localhost:3000" :
            `file://${path.join(__dirname, "../build/index.html")}`
    );
    //dev tools
    mainWindow.webContents.openDevTools()
    mainWindow.on("closed", () => (mainWindow = null));
}
app.on("ready", createWindow);
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
app.on("activate", () => {
    if (mainWindow === null) {
        createWindow();
    }
});

ipcMain.on('OpenFile', (event, arg) => {

    // const {dialog} = require('electron')
    // const fs = require('fs')
    // dialog.showOpenDialog(function (fileNames) {

    //    // fileNames is an array that contains all the selected
    //    if(fileNames === undefined)
    //       console.log("No file selected")
    //    else
    //       readFile(fileNames[0])
    // })

    // function readFile(filepath){
    //    fs.readFile(filepath, 'utf-8', (err, data) => {
    //       if(err){
    //          alert("An error ocurred reading the file :" + err.message)
    //          return
    //       }

    //       // handle the file content
    //       event.sender.send('fileData', data)
    //    })
    // }
});

function openModal() {
    const { BrowserWindow } = require('electron');
    let modal = new BrowserWindow({ parent: mainWindow, modal: true, show: false })
    modal.loadURL('https://www.sitepoint.com')
    modal.once('ready-to-show', () => {
        modal.show()
    })
}





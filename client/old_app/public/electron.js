// import * as Sentry from '@sentry/electron';

const { app, BrowserWindow, ipcMain, electron } = require("electron");
// const app = electron.app;
// const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const isDev = require("electron-is-dev");
const { autoUpdater } = require('electron-updater');

let mainWindow;
function createWindow() {
  // Sentry.init({dsn: 'https://392fb7161b364e3d969d03302d121a99@sentry.io/4267263'});
    
  mainWindow = new BrowserWindow({
    width: 900,
    height: 680,
    icon: path.join(__dirname, "/icon_4.png"),
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false
    }
    
  });
  mainWindow.setMenuBarVisibility(false);
  mainWindow.loadURL(
    isDev
      ? "http://localhost:4040"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  mainWindow.once('ready-to-show', () => {
    autoUpdater.checkForUpdatesAndNotify();
  });
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

ipcMain.on('app_version', (event) => {

  console.log("app version " + app.getVersion());
  event.sender.send('app_version', { version: app.getVersion() });
});
ipcMain.on('restart_app', () => {
  app.relaunch()
  app.exit()
});
ipcMain.on('restart_app_install_update', () => {
  autoUpdater.quitAndInstall();

});


autoUpdater.on('update-available', () => {
  mainWindow.webContents.send('update_available');
});

autoUpdater.on('update-downloaded', () => {
  mainWindow.webContents.send('update_downloaded');
});
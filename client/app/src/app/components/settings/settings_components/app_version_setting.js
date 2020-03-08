import React, { Component } from "react";
import style from "./app_version_settings.css";


class AppVersion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      version: "",
      isElectronApp: false,
    };
  }

  closeNotification = event => {

  };
  restartApp = event => {
    var userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.indexOf(' electron/') > -1) {
      // Electron-specific code
      const { ipcRenderer } = window.require("electron");
      ipcRenderer.send("restart_app_install_update");
    };
  }


  componentDidMount() {

    var userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.indexOf(' electron/') > -1) {
      this.setState({ isElectronApp: true });
      const { ipcRenderer } = window.require("electron");
      ipcRenderer.send("app_version");
      ipcRenderer.on("app_version", (event, arg) => {
        ipcRenderer.removeAllListeners("app_version");

        this.setState({
          version: "Version " + arg.version
        });
      });

      ipcRenderer.on("update_available", () => {
        ipcRenderer.removeAllListeners("update_available");
        //message.innerText = 'A new update is available. Downloading now...';
        //notification.classList.remove('hidden');
        alert("A new update is available. Downloading now...");
      });

      ipcRenderer.on("update_downloaded", () => {
        ipcRenderer.removeAllListeners("update_downloaded");
        // message.innerText = 'Update Downloaded. It will be installed on restart. Restart now?';
        //restartButton.classList.remove('hidden');
        //notification.classList.remove('hidden');

        var r = window.confirm(
          "Update Downloaded. It will be installed on restart. Restart now?"
        );
        if (r == true) {
          alert("Okay updating!");
        } else {
          alert("You can continue!");
        }
      });
    } else {
      this.setState({ isElectronApp: false });
    }

  }
  render() {
    return (
      <div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Araizen Aurora App</li>
          <li className="list-group-item">Build : Prelease </li>
          <li className="list-group-item"> You app is {this.state.version}</li>
          <li className="list-group-item">
            <div className="form-check">
              <label className="form-check-label">
                <input type="checkbox" defaultChecked className="form-check-input" />
                <i className="input-helper"></i>
                Do not Get notified of minor versions
            </label>
            </div>
          </li>

          <li className="list-group-item">
            <div className="form-check">
              <label className="form-check-label">
                <input type="checkbox" defaultChecked className="form-check-input" />
                <i className="input-helper"></i>
                Report anonymous statistics
            </label>
            </div></li>
        </ul>

        {this.state.isElectronApp == true ?
          <div className="align-content-lg-end">
            <div id={style.notification} className={style.hidden}>
              <p id="message"></p>
              <button
                className="btn btn-success btn-md"
                onClick={this.restartApp}
              >
                Restart
            </button>
              &nbsp;
            <button
                className="btn btn-warning btn-md"
                onClick={this.closeNotification}
              >
                Close
            </button>
            </div>
          </div>
          : <div></div>
        }


      </div>
    );
  }
}

export default AppVersion;

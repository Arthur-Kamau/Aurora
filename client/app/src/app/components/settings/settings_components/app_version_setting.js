import React, { Component } from "react";
import style from "./app_version_settings.css";
// const { ipcRenderer } = window.require("electron");

class AppVersion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      version: ""
    };
  }

  closeNotification = event => { };
  restartApp = event => {
    // ipcRenderer.send("restart_app");
  };

  componentDidMount() {
    // ipcRenderer.send("app_version");
    // ipcRenderer.on("app_version", (event, arg) => {
    //   ipcRenderer.removeAllListeners("app_version");

    //   this.setState({
    //     version: "Version " + arg.version
    //   });
    // });

    // ipcRenderer.on("update_available", () => {
    //   ipcRenderer.removeAllListeners("update_available");
    //   //message.innerText = 'A new update is available. Downloading now...';
    //   //notification.classList.remove('hidden');
    //   alert("A new update is available. Downloading now...");
    // });

    // ipcRenderer.on("update_downloaded", () => {
    //   ipcRenderer.removeAllListeners("update_downloaded");
    //   // message.innerText = 'Update Downloaded. It will be installed on restart. Restart now?';
    //   //restartButton.classList.remove('hidden');
    //   //notification.classList.remove('hidden');

    //   var r = window.confirm(
    //     "Update Downloaded. It will be installed on restart. Restart now?"
    //   );
    //   if (r == true) {
    //     alert("Okay updating!");
    //   } else {
    //     alert("You can continue!");
    //   }
    // });

    
  }
  render() {
    return (
      <div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Araizen Aurora App</li>
          <li class="list-group-item">Build : Prelease </li>
          <li class="list-group-item"> You app is {this.state.version}</li>
          <li class="list-group-item">    
            <div className="form-check">
                     <label className="form-check-label">
              <input type="checkbox" defaultChecked className="form-check-input" />
              <i className="input-helper"></i>
              Do not Get notified of minor versions
            </label>
          </div></li>
        </ul>

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
      </div>
    );
  }
}

export default AppVersion;

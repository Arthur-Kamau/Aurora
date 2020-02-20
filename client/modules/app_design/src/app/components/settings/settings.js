import React, { Component } from 'react'
import AppVersion from "./settings_components/app_version_setting";
import AccountSettings from "./settings_components/account_settings";
import UserBilling from "./settings_components/billing_setting";
import ThemeSettingsPage from "./settings_components/theme_settings";
import BlackSettingsPage from "./settings_components/blank_settings";

export class SettingsPage extends Component {
  constructor(props) {
    super(props);
    this.state = { pageActive: "" }
  }

  changePageToAccount = (event) => {
    this.setState({
      pageActive: "account"
    });
  }

  changePageToVersion = (event) => {
    this.setState({
      pageActive: "version"
    });
  }

  changePageToBilling = (event) => {
    this.setState({
      pageActive: "billing"
    });
  }
  changePageToTheme = (event) => {
    this.setState({
      pageActive: "theme"
    });
  }
  render() {

    return (

      <div className="row">

        <div className="col-md-4 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">App Settings</h2>
              {/* <p className="card-description"> Add faded secondary text to headings </p> */}
              <hr></hr>
              <div className="template-demo">
                <div className="btn btn-light btn-lg" onClick={this.changePageToVersion} >            <i className="mdi mdi-compass icon-sm text-warning"></i> &emsp; App Version  </div>
                <div className="btn btn-light btn-lg" onClick={this.changePageToAccount}>  <i className="mdi mdi-account icon-sm text-success"></i> &emsp; User Account  </div>
                <div className="btn btn-light btn-lg" onClick={this.changePageToBilling}>  <i className="mdi  mdi-credit-card icon-sm text-info"></i> &emsp; User Billing  </div>
                <div className="btn btn-light btn-lg" onClick={this.changePageToTheme}>  <i className="mdi  mdi-invert-colors icon-sm text-primary"></i> &emsp; App Theme  </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-8 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              {this.state.pageActive === "account" ?
                <AccountSettings></AccountSettings>
                : this.state.pageActive === "version" ?
                  <AppVersion></AppVersion> : 
                  this.state.pageActive == "billing" ?
                  <UserBilling></UserBilling> : this.state.pageActive == "theme" ? <ThemeSettingsPage></ThemeSettingsPage> : <BlackSettingsPage></BlackSettingsPage>}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SettingsPage

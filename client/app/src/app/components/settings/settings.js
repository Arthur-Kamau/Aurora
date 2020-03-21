import React, { Component } from 'react'
import AppVersion from "./settings_components/app_version_setting";
import AccountSettings from "./settings_components/account_settings";
import UserBilling from "./settings_components/billing_setting";
import ThemeSettingsPage from "./settings_components/theme_settings";
import SharePageComponent from "./settings_components/share_page";
import BlackSettingsPage from "./settings_components/blank_settings";
import DocumentationPageInSettings from "./settings_components/documentation";
import FeedBackPage from "./settings_components/feedback_page";
import { connect } from 'react-redux';
export class SettingsPage extends Component {
  constructor(props) {
    super(props);
    this.state = { pageActive: "" }
  }

  openSharePage = (event) => {
    this.setState({
      pageActive: "share"
    });
  }
  openDocumentationTab = (event) => {
    this.setState({
      pageActive: "docementation"
    });
    var userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.indexOf(' electron/') > -1) {
      //  window.require("shell").openExternal("http://www.google.com")
      const shell = window.require('electron').shell;
      shell.openExternal("http://www.google.com");
    } else {
      var win = window.open("http://www.google.com", '_blank');
      win.focus();
    }
  }
  openLoginPage = (event) => {
    window.location = "/login";
  }
  changePageToFeedBackPage = (event) => {
    this.setState({
      pageActive: "feedback"
    });
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

        <div className="col-lg-3 col-md-4 grid-margin stretch-card ml-4">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">App Settings  </h2>
              {/* <p className="card-description"> Add faded secondary text to headings </p> */}
              <hr></hr>

              {
                this.props.authToken == null || this.props.authToken.length == 0 ?
                  <div className="template-demo">

                    <div className="btn btn-light btn-lg" onClick={this.changePageToFeedBackPage}>  <i className="mdi  mdi-email icon-sm text-secondary"></i> &emsp;Feedback &emsp;   </div>
                    <div className="btn btn-light btn-lg" onClick={this.openDocumentationTab}>  <i className="mdi  mdi-book icon-sm text-dark"></i> &emsp;Docoumentation &emsp;   </div>
                    <div className="btn btn-light btn-lg" onClick={this.openLoginPage}>  <i className="mdi  mdi-lock icon-sm text-dark"></i> &emsp;Login &emsp;   </div>

                  </div>
                  :

                  <div className="template-demo">
                    <div className="btn btn-light btn-lg" onClick={this.changePageToVersion} >            <i className="mdi mdi-compass icon-sm text-warning"></i> &emsp; App  Version  </div>
                    <div className="btn btn-light btn-lg" onClick={this.changePageToAccount}>  <i className="mdi mdi-account icon-sm text-success"></i> &emsp; User Account  </div>
                    <div className="btn btn-light btn-lg" onClick={this.changePageToBilling}>  <i className="mdi  mdi-credit-card icon-sm text-info"></i> &emsp; User Billing &emsp;  </div>
                    <div className="btn btn-light btn-lg" onClick={this.changePageToTheme}>  <i className="mdi  mdi-invert-colors icon-sm text-primary"></i> &emsp; App Theme &emsp;  </div>
                    <div className="btn btn-light btn-lg" onClick={this.changePageToFeedBackPage}>  <i className="mdi  mdi-email icon-sm text-secondary"></i> &emsp;Feedback &emsp;   </div>
                    {
                      navigator.userAgent.toLowerCase().indexOf(' electron/') > -1 ?

                        <div className="btn btn-light btn-lg" onClick={this.openSharePage}>  <i className="mdi  mdi-share-variant icon-sm text-dark"></i> &emsp;share &emsp;   </div>

                        :
                        <div></div>

                    }

                    <div className="btn btn-light btn-lg" onClick={this.openDocumentationTab}>  <i className="mdi  mdi-book icon-sm text-dark"></i> &emsp;Documentation &emsp;   </div>
                  </div>


              }


            </div>
          </div>
        </div>
        <div className="col-lg-8 col-md-8 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              {this.state.pageActive === "account" ?
                <AccountSettings></AccountSettings>
                : this.state.pageActive === "version" ?
                  <AppVersion></AppVersion> :
                  this.state.pageActive == "billing" ?
                    <UserBilling></UserBilling>
                    : this.state.pageActive == "theme" ?
                      <ThemeSettingsPage></ThemeSettingsPage>
                      : this.state.pageActive == "feedback" ?
                        <FeedBackPage></FeedBackPage>
                        : this.state.pageActive == "docementation" ?
                          <DocumentationPageInSettings ></DocumentationPageInSettings>
                          : this.state.pageActive == "share" ?
                            <SharePageComponent ></SharePageComponent>
                            : <BlackSettingsPage authToken={this.props.authToken}></BlackSettingsPage>}
            </div>
          </div>
        </div>
        <div className="col-lg-1">
        </div>

      </div>
    )
  }
}

const mapStateToProps = state => ({
  authToken: state.authtoken
});

const mapActionsToProps = {
  // onUpdateUser : updateUser
};


export default connect(mapStateToProps)(SettingsPage);

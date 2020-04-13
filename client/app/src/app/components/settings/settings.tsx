import React, { Component } from 'react'
import AppVersion from "./settings_components/app_version_setting";
import AccountSettings from "./settings_components/account_settings";
import UserBilling from "./settings_components/billing_setting";
import ThemeSettingsPage from "./settings_components/theme_settings_auth";
import ThemeSettingsPageAppUnAuth from "./settings_components/theme_settings_unauth";
import SharePageComponent from "./settings_components/share_page";
import BlackSettingsPage from "./settings_components/blank_settings";
import DocumentationPageInSettings from "./settings_components/documentation";
import FeedBackPage from "./settings_components/feedback_page";
import {UserProfile} from ".././../../models/profile";
import {UserSettings} from ".././../../models/settings";
import auroraAppStore from "../../../store/AuroraStore";

export interface SettingsPageProps {
    
}
 
export interface SettingsPageState {
    pageActive: string,
      prof: UserProfile,
      sett: UserSettings,
      authToken? : string
}
 
class SettingsPage extends React.Component<SettingsPageProps, SettingsPageState> {
    constructor(props: SettingsPageProps) {
        super(props);

        this.state = { 
            pageActive :  "",
prof : {
    name: "",
    userId: "",
    phoneNumber: 0,
    email: "",
    country: "",
    userAvatar: "",
},
sett : {
    userId: "",
    theme: "",
    stats : "",
    notify: "",
} ,
authToken:""
        };
    }
   
componentWillMount(){
  //token
    let authToken: string  | null = auroraAppStore.getUserToken() ;
    this.setState({ authToken : authToken! });

    //settings
    let settingsData = auroraAppStore.getUserSettings();
    this.setState({ sett: settingsData! });

    //profile
    let prof = auroraAppStore.getUserProfile();
    this.setState({ prof: prof! });

}

  openSharePage = (event : any) => {
    this.setState({
      pageActive: "share"
    });
  }

  openDocumentationTab = (event : any) => {
    this.setState({
      pageActive: "documentation "
    });
    var userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.indexOf(' electron/') > -1) {
      //  window.require("shell").openExternal("http://www.google.com")
      const shell = window.require('electron').shell;
      shell.openExternal("http://www.google.com");
    } else {
      var win = window.open("http://www.google.com", '_blank');
      win!.focus();
    }
  }
  openLoginPage = (event : any) => {
    window.location.href = "/login";
  }
  changePageToFeedBackPage = (event : any) => {
    this.setState({
      pageActive: "feedback"
    });
  }
  changePageToAccount = (event: any) => {
    this.setState({
      pageActive: "account"
    });
  }

  changePageToVersion = (event: any) => {
    this.setState({
      pageActive: "version"
    });
  }

  changePageToBilling = (event : any) => {
    this.setState({
      pageActive: "billing"
    });
  }
  changePageToThemeUnAuth = (event : any) => {
    this.setState({
      pageActive: "themeUnAuth"
    });

  }

  changePageToTheme = (event : any) => {
    this.setState({
      pageActive: "theme"
    });
  }





  render() {

    return (

      <div className="row">

        <div className="col-lg-3 col-md-5  col-sm-5 col-xs-6 grid-margin stretch-card ml-4">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">App Settings  </h2>
              {/* <p className="card-description"> Add faded secondary text to headings </p> */}
              <hr></hr>

              {
                this.state.authToken == null || this.state.authToken.length == 0 ?
                  <div className="template-demo">
                    <div className="btn btn-light btn-lg" onClick={this.changePageToVersion} >            <i className="mdi mdi-compass icon-sm text-warning"></i> &emsp; App  Version  </div>


                    <div className="btn btn-light btn-lg" onClick={this.changePageToThemeUnAuth}>  <i className="mdi  mdi-invert-colors icon-sm text-primary"></i> &emsp; App Theme &emsp;  </div>


                    <div className="btn btn-light btn-lg" onClick={this.changePageToFeedBackPage}>  <i className="mdi  mdi-email icon-sm text-secondary"></i> &emsp;Feedback &emsp;   </div>
                    <div className="btn btn-light btn-lg" onClick={this.openDocumentationTab}>  <i className="mdi  mdi-book icon-sm text-dark"></i> &emsp;Docs &emsp;   </div>
                    <div className="btn btn-light btn-lg" onClick={this.openLoginPage}>  <i className="mdi  mdi-lock icon-sm text-dark"></i> &emsp;Login &emsp;   </div>

                  </div>
                  :

                  <div className="template-demo">
                    <div className="btn btn-light btn-lg" onClick={this.changePageToVersion} >            <i className="mdi mdi-compass icon-sm text-warning"></i> &emsp; App  Version  </div>
                    <div className="btn btn-light btn-lg" onClick={this.changePageToAccount}>  <i className="mdi mdi-account icon-sm text-success"></i> &emsp; User Account  </div>
                    <div className="btn btn-light btn-lg" onClick={this.changePageToBilling}>  <i className="mdi  mdi-credit-card icon-sm text-info"></i> &emsp; User Billing &emsp;  </div>
                    <div className="btn btn-light btn-lg" onClick={this.changePageToTheme}>  <i className="mdi  mdi-invert-colors icon-sm text-primary"></i> &emsp; App Theme &emsp;  </div>
                    <div className="btn btn-light btn-lg" onClick={this.changePageToFeedBackPage}>  <i className="mdi  mdi-email icon-sm text-secondary"></i> &emsp;Feedback &emsp;   </div>
                    {/* {
                      navigator.userAgent.toLowerCase().indexOf(' electron/') > -1 ?

                        <div className="btn btn-light btn-lg" onClick={this.openSharePage}>  <i className="mdi  mdi-share-variant icon-sm text-dark"></i> &emsp;share &emsp;   </div>

                        :
                        <div></div>

                    } */}

                    <div className="btn btn-light btn-lg" onClick={this.openDocumentationTab}>  <i className="mdi  mdi-book icon-sm text-dark"></i> &emsp;Docs &emsp;   </div>
                  </div>


              }


            </div>
          </div>
        </div>
        <div className="col-lg-8 col-md-8 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              {this.state.pageActive === "account" ?
                <AccountSettings   ></AccountSettings>
                : this.state.pageActive === "version" ?
                  <AppVersion  ></AppVersion> :
                  this.state.pageActive == "billing" ?
                    <UserBilling></UserBilling>
                    : this.state.pageActive == "theme" ?
                      <ThemeSettingsPage ></ThemeSettingsPage>
                      : this.state.pageActive == "themeUnAuth" ?
                        <ThemeSettingsPageAppUnAuth></ThemeSettingsPageAppUnAuth>
                        : this.state.pageActive == "feedback" ?
                          <FeedBackPage></FeedBackPage>
                          : this.state.pageActive == "documentation " ?
                            <DocumentationPageInSettings ></DocumentationPageInSettings>
                            : this.state.pageActive == "share" ?
                              <SharePageComponent ></SharePageComponent>
                              : <BlackSettingsPage ></BlackSettingsPage>}
            </div>
          </div>
        </div>
        <div className="col-lg-1">
        </div>

      </div>
    )
  }
}
 
export default SettingsPage;
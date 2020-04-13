import React, { Component } from 'react'

import { UserSettings } from '../../../../models/settings';
import auroraAppStore from '../../../../store/AuroraStore';
const theme = { borderStyle: `solid`, borderColor: `red`, backgroundColor: `lightgrey`, padding: `10px` };


export interface ThemeSettingsPageProps {
    
}
 
export interface ThemeSettingsPageState {
    settings?: UserSettings
}
 
class ThemeSettingsPage extends React.Component<ThemeSettingsPageProps, ThemeSettingsPageState> {
    constructor(props: ThemeSettingsPageProps) {
        super(props);
        this.state = {   settings: {
            userId: "",
            theme: "",
            stats: "",
            notify: "",
        }  };
    }
    componentDidMount() {
        let settings = auroraAppStore.getUserSettings();
        this.setState({ settings: settings! });


     }
     changeThemeToLight = (e : any) => {
 
 
         //local storage
        //  var set = this.state.settings;
        //  set.theme = "light"
        //  this.setState({ sett: set });
        //  window.localStorage.setItem("sett", JSON.stringify(this.state.settings));
        //  console.log("p e "+window.localStorage.getItem('sett'))
 
 // for (var key of Object.keys(window.localStorage.getItem('sett'))) {
 //     console.log("--> "+key + " -> " + window.localStorage.getItem('sett')[key])
 // }
         //redux
        //  let profile = this.props.userSettings;
        //  profile.theme = "light";
        //  this.props.onChangeAppTheme(profile)
 
        //  window.location.reload(true);
     }
 
     changeThemeToDark = (e : any) => {
 
 
 
         //local storage
        //  var set = this.state.settings;
        //  set.theme = "dark"
        //  this.setState({ sett: set });
        //  window.localStorage.setItem("sett", this.state.settings);
        //  //redux
        //  let profile = this.props.userSettings;
        //  profile.theme = "dark";
        //  this.props.onChangeAppTheme(profile);
 
        //  window.location.reload(true);
     }
 
     render() {
 
         const selectedStyle = { backgroundColor: 'lightgrey', borderColor: `blue`, borderStyle: `solid`, padding: `5px` }
         const normalStyle = { backgroundColor: 'white', padding: `5px` }
         const lightTheme = this.state.settings!.theme == 'light' ? selectedStyle : normalStyle;
         const darkTheme = this.state.settings!.theme == 'dark' ? selectedStyle : normalStyle;
 
         return (<div>
 
             <h1>Theme settings  </h1>
             <div className="d-flex align-items-center text-center error-page  pt-5 pb-4 h-100">
                 <div className="row flex-grow">
                     <div className="col-lg-6 col-md-8 col-sm-12 col-xs-12 mx-auto " style={lightTheme} onClick={this.changeThemeToLight}>
 
                         <div  >
                             <div ><img className=" img-thumbnail " src={require("../../../../assets/images/theme/light_theme.png")} alt="light theme" />
                                 <h4>Light theme</h4></div>
                         </div>
                     </div>
                 </div>
                 <div className="row flex-grow">
                     <div className="col-lg-6 col-md-8 col-sm-12 col-xs-12" style={darkTheme} onClick={this.changeThemeToDark}>
 
                         <img className=" img-thumbnail" src={require("../../../../assets/images/theme/dark_theme.png")} alt="dark theme" />
                         <h4>Dark theme</h4>
                     </div>
                 </div>
             </div>
         </div>
         );
     }
}
 
export default ThemeSettingsPage;
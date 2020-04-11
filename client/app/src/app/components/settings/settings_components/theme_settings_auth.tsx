import React, { Component } from 'react'

import userProfileAction from '../../../../actions/user_profile_action';
const theme = { borderStyle: `solid`, borderColor: `red`, backgroundColor: `lightgrey`, padding: `10px` };


export interface ThemeSettingsPageProps {
    
}
 
export interface ThemeSettingsPageState {
 sett :''   
}
 
class ThemeSettingsPage extends React.Component<ThemeSettingsPageProps, ThemeSettingsPageState> {
    constructor(props: ThemeSettingsPageProps) {
        super(props);
        this.state = { sett: ''  };
    }
    componentDidMount() {
        try{
         var sett = JSON.parse(window.localStorage.getItem('sett'));
 
         this.setState({ sett: sett });
 
         console.error("sett " + sett);
        } catch (objError) { 
         this.setState({ sett: this.props.userSettings });
     }
     }
     changeThemeToLight = (newTheme) => {
 
 
         //local storage
         var set = this.state.sett;
         set.theme = "light"
         this.setState({ sett: set });
         window.localStorage.setItem("sett", JSON.stringify(this.state.sett));
         console.log("p e "+window.localStorage.getItem('sett'))
 
 // for (var key of Object.keys(window.localStorage.getItem('sett'))) {
 //     console.log("--> "+key + " -> " + window.localStorage.getItem('sett')[key])
 // }
         //redux
         let profile = this.props.userSettings;
         profile.theme = "light";
         this.props.onChangeAppTheme(profile)
 
         window.location.reload(true);
     }
 
     changeThemeToDark = (newTheme) => {
 
 
 
         //local storage
         var set = this.state.sett;
         set.theme = "dark"
         this.setState({ sett: set });
         window.localStorage.setItem("sett", this.state.sett);
         //redux
         let profile = this.props.userSettings;
         profile.theme = "dark";
         this.props.onChangeAppTheme(profile);
 
         window.location.reload(true);
     }
 
     render() {
 
         const selectedStyle = { backgroundColor: 'lightgrey', borderColor: `blue`, borderStyle: `solid`, padding: `5px` }
         const normalStyle = { backgroundColor: 'white', padding: `5px` }
         const lightTheme = this.state.sett.theme == 'light' ? selectedStyle : normalStyle;
         const darkTheme = this.state.sett.theme == 'dark' ? selectedStyle : normalStyle;
 
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
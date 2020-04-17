import React, { Component } from 'react'
import auroraAppStore from "../../../../store/AuroraStore";
import { UserSettings } from '../../../../models/settings';
import { changeAppThemeAction } from '../../../../actions/change_app_theme';
export interface ThemeSettingsPageAppUnAuthProps {

}

export interface ThemeSettingsPageAppUnAuthState {
    settings?: UserSettings
}

class ThemeSettingsPageAppUnAuth extends React.Component<ThemeSettingsPageAppUnAuthProps, ThemeSettingsPageAppUnAuthState> {
    constructor(props: ThemeSettingsPageAppUnAuthProps) {
        super(props);
        this.state = {
            settings: {
                userId: "",
                theme: "",
                stats: "",
                notify: "",
            }
        };
    }
    componentDidMount() {

        let settings = auroraAppStore.getUserSettings();
        this.setState({ settings: settings! });

        auroraAppStore.on("changeTheme", this.changeTheme);
    }
    changeTheme = () => {
        var sett = auroraAppStore.getUserSettings();
        this.setState({ settings: sett! });
    }

    changeThemeToLight = (newTheme: React.MouseEvent<HTMLElement>) => {


        let prevState = this.state.settings!;

        if (prevState.theme == "light") {
            // store.addNotification({
            //     title: "Already in Light theme",
            //     message: "Theme not changed",
            //     type: "success",
            //     insert: "bottom",
            //     container: "top-right",
            //     animationIn: ["animated", "fadeIn"],
            //     animationOut: ["animated", "fadeOut"],
            //     dismiss: {
            //       duration: 5000,
            //       onScreen: true
            //     }
            //   });
        } else {
            prevState.theme = "light";
            this.setState({ settings: prevState });

            changeAppThemeAction(prevState);
            

            //redux
            // let profile = this.props.userSettings;
            // profile.theme = "light";
            // this.props.onChangeAppTheme(profile)
            // console.error("chanhge theme light " + JSON.stringify(profile));
            // window.location.reload(true);
        }
    }

    changeThemeToDark = (e: any) => {

        let prevState = this.state.settings!;
        if (prevState.theme == "dark") {
        // store.addNotification({
        //     title: "Already in Dark theme",
        //     message: "Theme not changed",
        //     type: "success",
        //     insert: "top",
        //     container: "top-right",
        //     animationIn: ["animated", "fadeIn"],
        //     animationOut: ["animated", "fadeOut"],
        //     dismiss: {
        //       duration: 5000,
        //       onScreen: true
        //     }
        //   });
        } else {

        //     //local storage
        //     this.setState({ theme: "" });
        //     window.localStorage.setItem("theme_unauth", "dark");


        prevState.theme = "dark";
        this.setState({ settings: prevState });

        changeAppThemeAction(prevState);

        //     //redux
        //     let profile = this.props.userSettings;
        //     profile.theme = "dark";
        //     this.props.onChangeAppTheme(profile);
        //     console.error("chanhge theme dark" + JSON.stringify(profile));
        //     window.location.reload(true);
        }
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
                            <div ><img className=" img-thumbnail " src={require("../assets/light-theme.png")} alt="light theme" />
                                <h4>Light theme</h4></div>
                        </div>
                    </div>
                </div>
                <div className="row flex-grow">
                    <div className="col-lg-6 col-md-8 col-sm-12 col-xs-12" style={darkTheme} onClick={this.changeThemeToDark}>

                        <img className=" img-thumbnail" src={require("../assets/dark-theme.png")} alt="dark theme" />
                        <h4>Dark theme</h4>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

export default ThemeSettingsPageAppUnAuth;
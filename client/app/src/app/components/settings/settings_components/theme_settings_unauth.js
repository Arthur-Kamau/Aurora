import React, { Component } from 'react';
import { connect } from 'react-redux';
import userProfileAction from '../../../../actions/user_profile_action';
const theme = { borderStyle: `solid`, borderColor: `red`, backgroundColor: `lightgrey`, padding: `10px` };

class ThemeSettingsPageAppUnAuth extends Component {


    constructor(props) {
        super(props);
        this.state = {
            theme: ''
        };
    }
    componentDidMount() {
        try {
            var theme = window.localStorage.getItem('theme_unauth');

            this.setState({ theme: theme });

            console.error("theme " + theme);
        } catch (objError) {
            this.setState({ theme: this.props.userSettings.theme });
        }
    }
    changeThemeToLight = (newTheme) => {


        //local storage
        // var set = this.state.theme;
        // set.theme = "light"
        this.setState({ theme: "light" });
        window.localStorage.setItem("theme_unauth", "light");

        //redux
        let profile = this.props.userSettings;
        profile.theme = "light";
        this.props.onChangeAppTheme(profile)
        console.error("chanhge theme light " + JSON.stringify(profile));
        window.location.reload(true);
    }

    changeThemeToDark = (newTheme) => {



        //local storage
        this.setState({ theme: "dark" });
        window.localStorage.setItem("theme_unauth", "dark");
        //redux
        let profile = this.props.userSettings;
        profile.theme = "dark";
        this.props.onChangeAppTheme(profile);
        console.error("chanhge theme dark" + JSON.stringify(profile));
        window.location.reload(true);
    }

    render() {

        const selectedStyle = { backgroundColor: 'lightgrey', borderColor: `blue`, borderStyle: `solid`, padding: `5px` }
        const normalStyle = { backgroundColor: 'white', padding: `5px` }
        const lightTheme = this.state.theme == 'light' ? selectedStyle : normalStyle;
        const darkTheme = this.state.theme == 'dark' ? selectedStyle : normalStyle;

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

// export default ;

const mapStateToProps = state => ({
    userSettings: state.userSettings,
});

const mapActionsToProps = {
    onChangeAppTheme: userProfileAction,
};


export default connect(mapStateToProps, mapActionsToProps)(ThemeSettingsPageAppUnAuth);


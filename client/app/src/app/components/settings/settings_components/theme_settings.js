import React, { Component } from 'react';
const theme = { borderStyle: `solid`, borderColor: `red`, backgroundColor: `lightgrey`, padding: `10px` };

class ThemeSettingsPage extends Component {


    constructor(props) {
        super(props);
        this.state = {
            theme: 'light'
        }
    }

    changeThemeToLight = (newTheme) => {
        this.setState({ theme: "light" });
    }

    changeThemeToDark = (newTheme) => {
        this.setState({ theme: "dark" });
    }

    render() {

        const selectedStyle = { backgroundColor: 'lightgrey', borderColor: `blue`,borderStyle:`solid`, padding: `5px` }
        const normalStyle = { backgroundColor: 'white',  padding: `5px` }
        const lightTheme=  this.state.theme == 'light' ? selectedStyle : normalStyle
        const darkTheme=  this.state.theme == 'dark' ? selectedStyle : normalStyle

        return (<div>

            <h1>Theme settings  </h1>
            <div className="d-flex align-items-center text-center error-page  pt-5 pb-4 h-100">
                <div className="row flex-grow">
                    <div className="col-lg-6 col-md-8 col-sm-12 col-xs-12 mx-auto "  style={lightTheme} onClick={this.changeThemeToLight}>

                        <div  >
                            <div ><img className=" img-thumbnail " src={require("../../../../assets/images/theme/light_theme.png")} alt="light theme" />
                                <h4>Light theme</h4></div>
                        </div>
                    </div>
                </div>
                <div className="row flex-grow">
                        <div className="col-lg-6 col-md-8 col-sm-12 col-xs-12"  style={darkTheme} onClick={this.changeThemeToDark}>

                            <img className=" img-thumbnail"  src={require("../../../../assets/images/theme/dark_theme.png")} alt="dark theme" />
                            <h4>Dark theme</h4>
                        </div>
                </div>
            </div>
        </div>
        );
    }
}

export default ThemeSettingsPage;
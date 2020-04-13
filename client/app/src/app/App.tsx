import React, { Component, ReactNode } from 'react';
import { withRouter } from 'react-router-dom';
import ReactNotifications from 'react-notifications-component';

import AppRoutes from './AppRoutes';
// import './App.scss';
import Navbar from './components/navbar/navbar';
import DumpServerNavbar from './components/navbar/dump_server_navbar';
import ConnectionToolAppBar from './components/navbar/connection_tool_navbar';
import EditorNavBar from './components/navbar/editor_navbar';

import Sidebar from './components/sidebar/sidebar';
import Footer from './components/footer/footer';
import AppGenerator from './components/generator/generator';

import GeneratorNavBar from './components/navbar/generator_navbar';
import JsonGeneratorNavBar from './components/navbar/json_generator_navbar';
import SchemaGeneratorNavBar from './components/navbar/schema_generetor_navbar';
import { UserSettings } from '../models/settings';

export interface AppProps {
  
}
 
export interface AppState {
  isFullPageLayout : boolean,
  location? : Location ,
  appBarStyle : string,
  userSettings : UserSettings
}
 
class App extends React.Component<AppProps, AppState> {
  constructor(props : App) {
    super(props);

    this.state = { 
      isFullPageLayout : false,
      location : undefined ,
      appBarStyle : "",
      userSettings : {
        userId: "",
        theme: "",
        stats : "",
        notify: "", 
      }

    };
}
  componentDidMount() {
    // this.onRouteChanged();
    // this.setState({ location: window.location });

  
  
    // console.error("settings  "+ JSON.stringify(this.props.userSettings))
    
    
    //load css
    if (this.state.userSettings != null && this.state.userSettings.theme != null && this.state.userSettings.theme === 'light') {

      require('./css/App_light.scss');
      // this.setState({})
    } else {
    
      require('./css/App_dark.scss');
    }

    // window.location.pathname == "/create_tool" ? this.setState({ appBarStyle: "no style" })
    //   : this.setState({ appBarStyle: "style" })



  }

  diplayAppropriateAppBAr = ()  => {
    // let navbarOne = !this.state.isFullPageLayout ? <Navbar /> : '';

    let navbarTwo : ReactNode

    if (window.location.pathname == "/aurora/dump_server") {
      navbarTwo = <DumpServerNavbar></DumpServerNavbar>
    } else if (window.location.pathname == "/aurora/generator") {
      navbarTwo = <GeneratorNavBar></GeneratorNavBar>
      let isTogled = document.body.classList.contains('sidebar-icon-only');

      if (isTogled) {
        console.log("ignore as sidebar already toggled");

      } else {
        document.body.classList.toggle('sidebar-icon-only');
      }
    } else if (window.location.pathname == "/aurora/generator/tojson") {
      navbarTwo = <JsonGeneratorNavBar></JsonGeneratorNavBar>
    } else if (window.location.pathname == "/aurora/generator/toschema") {
      navbarTwo = <SchemaGeneratorNavBar></SchemaGeneratorNavBar>
    } else if (window.location.pathname == "/aurora/connection_tool") {
      navbarTwo = <ConnectionToolAppBar></ConnectionToolAppBar>
    } else
      if (window.location.pathname == "/aurora/editor" || window.location.pathname == "/aurora/project" || window.location.pathname == "/") {
        navbarTwo = <EditorNavBar></EditorNavBar>
      } else { navbarTwo = ''; }

    return navbarTwo;
  }



  render() {
    let sidebarComponent = !this.state.isFullPageLayout ? <Sidebar /> : '';
    let footerComponent = !this.state.isFullPageLayout ? <Footer /> : '';
    // let appBackground = '';
    // let appContainerBackground = {
    //   marginLeft: `5px`,
    //   marginTop: `5px`,
    //   backgroundColor : `red`
    // }
    // if (this.props.userSettings.theme == "light") {


    // } else {
    //   appBackground = { backgroundColor: `#494949` }

    // } 
    return (
      <div className="container-scroller">
        {this.diplayAppropriateAppBAr()}
        <ReactNotifications />
        <div className="container-fluid page-body-wrapper">
          {sidebarComponent}

          {window.location.pathname != "/aurora/generator" ?

            <div className="main-panel"

            style={this.state.userSettings.theme == "light" ?  {} : {backgroundColor:`#494949`}}
            >
              <div className="content-wrapper"
                style={this.state.userSettings.theme == "light" ?  {} : {backgroundColor:`#494949`}}
              >

                <AppRoutes  />
              </div>
              {footerComponent}
            </div>
            :
            <div className="main-panel" style={{ margin: `2px, 0, 0,0`, backgroundColor: `pink` }}  >
           
              <AppGenerator />
              {footerComponent}
            </div>

          }
        </div>
      </div>
    );
  }

  componentDidUpdate(prevProps : any) {
    if (this.state.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    console.log("ROUTE CHANGED");
    window.scrollTo(0, 0);
    const fullPageLayoutRoutes = ['/logout', '/login', '/reset-password', '/login-key',
      '/register', '/login-personal-details', '/error-pages/error-404', '/error-pages/error-500',
      '/forgot-password', '/forgot-password-key'];
    for (let i = 0; i < fullPageLayoutRoutes.length; i++) {
      if (this.state.location?.pathname === fullPageLayoutRoutes[i]) {
        this.setState({
          isFullPageLayout: true
        })
        document.querySelector('.page-body-wrapper')!.classList.add('full-page-wrapper');
        break;
      } else {
        this.setState({
          isFullPageLayout: false
        })
        document.querySelector('.page-body-wrapper')!.classList.remove('full-page-wrapper');
      }
    }
  }
}
 
export default App;
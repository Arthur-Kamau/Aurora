import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ReactNotifications from 'react-notifications-component';

import AppRoutes from './AppRoutes';
// import './App.scss';
import Navbar from './components/navbar/Navbar';
import DumpServerNavbar from './components/navbar/dump_server_navbar';
import ConnectionToolAppBar from './components/navbar/connection_tool_navbar';
import EditorNavBar from './components/navbar/editor_navbar';

import Sidebar from './components/sidebar/Sidebar';
import Footer from './components/footer/Footer';
import EditorHomePage from './components/editor/editor_home';
import AppGenerator from './components/generator/generator';

import GeneratorNavBar from './components/navbar/generator_navbar';
import JsonGeneratorNavBar from './components/navbar/json_generator_navbar';
import SchemaGeneratorNavBar from './components/navbar/schema_generetor_navbar';

import updateSchemaDataForGenerateSchema from '../actions/generate_schema_shema_data_action';
import updateRawJsonForGenerateSchema from '../actions/generate_schema_raw_json_string_action';

import updateSchemaForGenerateJson from '../actions/generate_json_schema_action';
import updateJsonForGenerateJson from '../actions/generate_json_raw_string_action';

import { connect } from 'react-redux'


class App extends Component {


  constructor(props) {
    super(props);
    this.state = {
      appBarStyle: "",
      location: '',
      ws: 'hola',
    };
  }


  onChange = (newValue) => {
    console.log("change new value", newValue);
    var obj = { action: "to-json", payload: newValue };
    // Converting JS object to JSON string.
    var json = JSON.stringify(obj);
    try {

      this.state.ws.send(json) //send data to the server
    } catch (error) {
      console.log(error) // catch error
    }

  }


  componentDidMount() {
    this.onRouteChanged();
    this.setState({ location: window.location.pathname });

    //load css
    if (this.props.userSettings != null && this.props.userSettings.theme != null && this.props.userSettings.theme === 'light') {
      console.error("light"+this.props.userSettings)
      require('./App_light.scss');
      // this.setState({})
    } else {
      console.error("darkr"+this.props.userSettings)
      require('./App_dark.scss');
    }

    window.location.pathname == "/create_tool" ? this.setState({ appBarStyle: "no style" })
      : this.setState({ appBarStyle: "style" })


    this.state.ws = new WebSocket("ws://0.0.0.0:8080/ws/user")//AppUrls.toJsonWebSocket)
    this.state.ws.onopen = () => {
      // on connecting, do nothing but log it to the console
      console.log('App connected')
    }

    this.state.ws.onmessage = evt => {
      // listen to data sent from the websocket server
      const message = JSON.parse(evt.data)

      // this.setState({ dataFromServer: evt.data })
      console.log("message from websocket" + evt.data)

      var obj = JSON.parse(evt.data)

      if (obj.action === 'generate_schema') {

        this.props.onupdateSchemaDataForGenerateSchema(evt.data);
      } else {

        this.props.onupdateJsonForGenerateJson(evt.data);
      }


    }

    this.state.ws.onclose = () => {
      console.log('App disconnected')

    }

  }

  diplayAppropriateAppBAr(starRating) {
    // let navbarOne = !this.state.isFullPageLayout ? <Navbar /> : '';

    let navbarTwo = ''

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
        {this.diplayAppropriateAppBAr(10)}
        <ReactNotifications />
        <div className="container-fluid page-body-wrapper">
          {sidebarComponent}

          {window.location.pathname != "/aurora/generator" ?

            <div className="main-panel"

            style={this.props.userSettings.theme == "light" ?  {} : {backgroundColor:`#494949`}}
            >
              <div className="content-wrapper"
                style={this.props.userSettings.theme == "light" ?  {} : {backgroundColor:`#494949`}}
              >

                <AppRoutes websocket={this.state.ws} />
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

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
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
      if (this.props.location.pathname === fullPageLayoutRoutes[i]) {
        this.setState({
          isFullPageLayout: true
        })
        document.querySelector('.page-body-wrapper').classList.add('full-page-wrapper');
        break;
      } else {
        this.setState({
          isFullPageLayout: false
        })
        document.querySelector('.page-body-wrapper').classList.remove('full-page-wrapper');
      }
    }
  }


}

const mapStateToProps = state => ({
  convertJsonStringToSchema: state.convertJsonStringToSchema,
  convertToJsonRawShcema: state.convertToJsonRawShcema,

  convertToSchemaShcema: state.convertToSchemaShcema,
  convertToSchemaString: state.convertToSchemaString,
  userProfile: state.userProfile,
  userSettings: state.userSettings,
});

const mapActionsToProps = {
  onupdateSchemaDataForGenerateSchema: updateSchemaDataForGenerateSchema,
  onupdateRawJsonForGenerateSchema: updateRawJsonForGenerateSchema,
  onupdateSchemaForGenerateJson: updateSchemaForGenerateJson,
  onupdateJsonForGenerateJson: updateJsonForGenerateJson,

}
export default connect(mapStateToProps, mapActionsToProps)(withRouter(App));

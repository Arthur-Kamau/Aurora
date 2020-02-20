import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './App.scss';
import AppRoutes from './AppRoutes';
import Navbar from './shared/Navbar';
import ToJsonNavBar from './navbars/to_json_navbar';
import FromJsonNavBar from './navbars/from_json_navbar';

import GraphQlNavBar from './navbars/graphql_navbar';
import MqttNavBar from './navbars/mqtt_navbar';
import WebSocketsNavBar from './navbars/websockets_navbar';
import RestNavBar from './navbars/rest_navbar';
import DumpServerNavBar from './navbars/dump_server';




import Sidebar from './shared/Sidebar';
import Footer from './shared/Footer';
import ReactNotifications from 'react-notifications-component';



import { useLocalStore, useObserver } from "mobx-react";
import StoreContext  from '../store/store';


const StoreProvider = ({ children }) => {

  const store = useLocalStore(() => ({
toJsonRawSchema : "class animal{}",toJsonDataString : "hey"
  }));
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appBarStyle: "",
      location: ''
    };
  }
  componentDidMount() {
    this.onRouteChanged();
    this.setState({ location: window.location.pathname });

    window.location.pathname == "/create_tool" ? this.setState({ appBarStyle: "no style" })
      : this.setState({ appBarStyle: "style" })
  }

  diplayAppropriateAppBAr(starRating) {
    let navbarOne = !this.state.isFullPageLayout ? <Navbar /> : '';

    let navbarTwo = ''

    if (window.location.pathname == "/aurora/generator/to-json") {
      navbarTwo = <ToJsonNavBar></ToJsonNavBar>
    } else if (window.location.pathname == "/aurora/generator/from-json") {
      navbarTwo = <FromJsonNavBar></FromJsonNavBar>
    } else if (window.location.pathname == "/aurora/tool/rest") {
      navbarTwo = <RestNavBar></RestNavBar>
    } else if (window.location.pathname == "/aurora/tool/websocket") {
      navbarTwo = <WebSocketsNavBar></WebSocketsNavBar>
    } else if (window.location.pathname == "/aurora/tool/mqtt") {
      navbarTwo = <MqttNavBar></MqttNavBar>
    } else if (window.location.pathname == "/aurora/tool/graphql") {
      navbarTwo = <GraphQlNavBar></GraphQlNavBar>
    } else if (window.location.pathname == "/aurora/dump_server") {
      navbarTwo = <DumpServerNavBar></DumpServerNavBar>
    } else { navbarTwo = ''; }

    return navbarTwo;
  }


  render() {
    let sidebarComponent = !this.state.isFullPageLayout ? <Sidebar /> : '';
    let footerComponent = !this.state.isFullPageLayout ? <Footer /> : '';

    return (
      <div className="container-scroller">
        {this.diplayAppropriateAppBAr(10)}
        <ReactNotifications />
        <div className="container-fluid page-body-wrapper">
          {sidebarComponent}

          {window.location.pathname != "/create_tool" ?

            <div className="main-panel"    >
              <div className="content-wrapper" style={{
                marginLeft: `5px`,
                marginTop: `5px`,
              }}>
                <StoreProvider>
                  <AppRoutes /></StoreProvider>
              </div>
              {footerComponent}
            </div>
            :
            <div className="main-panel" style={{ padding: `0`, margin: `0` }}  >
              <div className="content-wrapper" style={{ padding: `0`, margin: `0` }}>
                <StoreProvider>
                  <AppRoutes /></StoreProvider>
              </div>
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
    const fullPageLayoutRoutes = ['/user-pages/login-2', '/user-pages/register-1', '/user-pages/register-2', '/user-pages/lockscreen', '/error-pages/error-404', '/error-pages/error-500', '/general-pages/landing-page'];
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

export default withRouter(App);

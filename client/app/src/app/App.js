import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ReactNotifications from 'react-notifications-component';

import AppRoutes from './AppRoutes';
import './App.scss';
import Navbar from './components/navbar/Navbar';
import DumpServerNavbar from './components/navbar/dump_server_navbar';
import ConnectionToolAppBar from './components/navbar/connection_tool_navbar';
import EditorNavBar from './components/navbar/editor_navbar';

import Sidebar from './components/sidebar/Sidebar';
import Footer from './components/footer/Footer';
import EditorHomePage from './components/editor/editor_home';


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
    // let navbarOne = !this.state.isFullPageLayout ? <Navbar /> : '';

    let navbarTwo = ''

    if (window.location.pathname == "/aurora/dump_server") {
      navbarTwo = <DumpServerNavbar></DumpServerNavbar>
    } else  if (window.location.pathname == "/aurora/connection_tool") {
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

    return (
      <div className="container-scroller">
        {this.diplayAppropriateAppBAr(10)}
        <ReactNotifications />
        <div className="container-fluid page-body-wrapper">
          {sidebarComponent}

          {window.location.pathname != "/aurora/project" ?

            <div className="main-panel"    >
              <div className="content-wrapper"
                style={{
                  marginLeft: `5px`,
                  marginTop: `5px`,
                }}
              >

                <AppRoutes />
              </div>
              {footerComponent}
            </div>
            :
            <div className="main-panel" style={{ margin:`2px, 0, 0,0`,  backgroundColor: `pink` }}  >
              <EditorHomePage />
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
    const fullPageLayoutRoutes = ['/aurora/project', '/aurora/', '/aurora/editor', '/aurora', '/error-pages/error-404', '/error-pages/error-500', '/general-pages/landing-page'];
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

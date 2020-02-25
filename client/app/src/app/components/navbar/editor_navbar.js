import React, { Component } from 'react';
// import { Dropdown } from 'react-bootstrap';
import { store } from 'react-notifications-component';

class EditorNavBar extends Component {
    toggleOffcanvas() {
        document.querySelector('.sidebar-offcanvas').classList.toggle('active');
    }
    openHelpPage = (e) =>{
        // window.require("shell").openExternal("http://www.google.com")
    //     const shell = window.require('electron').shell;
    //    shell.openExternal("http://www.google.com");



    }
    render() {
        return (
            <nav className="navbar navbar-sm navbar-expand-sm bg-dark navbar-dark col-lg-12 col-12 p-0 m-0 fixed-top d-flex flex-row" style={{height : `44px`}}>
                <ul className="navbar-nav header-links">
                    <li className="nav-item">
                        <a className="nav-link" href="#">Workspace</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Create</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Devtools</a>
                    </li>
                    <li className="nav-item" onClick={this.openHelpPage}>
                        <a className="nav-link" href="#">Help</a>
                    </li>

                  
                </ul>
            </nav>
        );
    }
}

export default EditorNavBar;

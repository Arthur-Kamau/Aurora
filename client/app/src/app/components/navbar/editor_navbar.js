import React, { Component } from 'react';
import { Dropdown } from 'react-bootstrap';

class EditorNavBar extends Component {
    toggleOffcanvas() {
        document.querySelector('.sidebar-offcanvas').classList.toggle('active');
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
                    <li className="nav-item">
                        <a className="nav-link" href="#">Help</a>
                    </li>

                  
                </ul>
            </nav>
        );
    }
}

export default EditorNavBar;

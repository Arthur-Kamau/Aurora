import React, { Component } from 'react';
import EditorTree from './editor_components/editor_tree/editor_tree'

class EditorHomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {}

    }
    componentDidMount() {
        this.toggleOffcanvas();
    }
    toggleOffcanvas = () => {
        // document.querySelector('.sidebar-offcanvas').classList.toggle('active');
        document.body.classList.toggle('sidebar-icon-only');
    }
    render() {
        return (

            <div style={{ height: `99%`, width: `100%`, backgroundColor: `black`, margin: `0px`, padding: `0px` }}>
                <div className="row " style={{ height: `100%`, backgroundColor: `yellow`, width: `100%`, margin: `0px`, padding: `0px` }}>
                    <ul class="list-group col-lg-3 col-md-4 " style={{ backgroundColor: `#333333`, margin: `0px`, padding: `0px`, height: `100%` }}>
                        <li class="list-group-item active ">Cras justo odio</li>
                        <li class="list-group-item bg-dark">Dapibus ac facilisis in</li>
                        <li class="list-group-item bg-dark">Vestibulum at eros</li>
                    </ul>
                    <div className="col-lg-9 col-md-8 col-xs-12 grid-margin stretch-card" style={{ backgroundColor: `#242424`, margin: `0px`, padding: `0px`, height: `100%` }}>

                    </div>
                </div>

            </div>

        );
    }
}

export default EditorHomePage;
import React, { Component } from 'react'
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-csharp";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-kuroir";
import "ace-builds/src-noconflict/theme-chrome";
import "ace-builds/src-noconflict/theme-twilight";
import MonacoEditor from 'react-monaco-editor';

class AppGenerator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: 0,
        }

    }
    componentDidMount() {
        this.toggleOffcanvas();
        var windowLocation = window.location;
        console.log("window location " + windowLocation);
        if (windowLocation = "/generator/generate_json") {
            this.setState({ activeItem: 0 });
        } else if (windowLocation = "/generator/generate_schema") {
            this.setState({ activeItem: 1 });
        } else {
            this.setState({ activeItem: 2 });
        }
    }

    toggleOffcanvas = () => {
        // document.querySelector('.sidebar-offcanvas').classList.toggle('active');
        let isTogled = document.body.classList.contains('sidebar-icon-only');

        if (isTogled) {
            console.log("ignore as sidebar already toggled");

        } else {
            document.body.classList.toggle('sidebar-icon-only');
        }

    }

    changeLocationToGenerateJson = () => {
        this.setState({ activeItem: 1 })
        // window.location = "/generate/tojson"
    }
    changeLocationToGenerateSchema = () => {
        this.setState({ activeItem: 0 })
        // window.location = "/generate/toschema"
    }

    render() {
       var generateSchemaStyle =   this.state.activeItem == 0 ? ' list-group-item active' : 'list-group-item' ;
       var generateJsonStyle =   this.state.activeItem == 1 ? ' list-group-item active' : 'list-group-item';
        return (

            <div style={{ height: `99%`, width: `100%`, backgroundColor: `black`, margin: `0px`, padding: `0px` }}>
                <div className="row " style={{ height: `100%`, backgroundColor: `yellow`, width: `100%`, margin: `0px`, padding: `0px` }}>
                    {/* <ul class="list-group col-lg-2 col-md-4 " style={{ backgroundColor: `#333333`, margin: `0px`, padding: `0px`, height: `100%` }}> */}
                    <ul class="list-group list-group-flush col-lg-2 col-md-4 " style={{ backgroundColor: `#f2f2f2`, margin: `0px`, padding: `0px`, height: `100%` }}>

                    {/* <div className={'list-group-item' + (this.state.something === "a" ? " anotherClass" : "")}></div> */}
                    {/* + this.state.activeItem == 0 ? 'active' : ''  */}
                        <li
                            className={generateSchemaStyle}
                            onClick={this.changeLocationToGenerateSchema} >
                            Generate Schema 
                        </li>

                        {/* + this.state.activeItem == 1 ? 'active' : '' */}
                        <li
                            className={generateJsonStyle}
                            onClick={this.changeLocationToGenerateJson} >
                            Generate Json 
                        </li>

                    </ul>
                    {/* <div className="col-lg-10 col-md-8 col-xs-12 grid-margin stretch-card" style={{ backgroundColor: `#242424`, margin: `0px`, padding: `0px`, height: `100%` }}> */}
                    <div className="col-lg-10 col-md-8 col-xs-12 " style={{ margin: `0px`, padding: `0px`, height: `100%`, width: `100%`, backgroundColor: `white` }}>
                        <div className="row " style={{ margin: `0px`, padding: `0px`, height: `100%`, width: `100%`, backgroundColor: `black` }}>
                            <div className="col-lg-6 col-md-12 col-xs-12     " style={{ margin: `0px`, padding: `0px`, height: `100%`, width: `100%`, backgroundColor: `yellow` }} >
                                {/* <EditorInPut></EditorInPut> */}
                                <AceEditor

                                    mode="java"
                                    theme="twilight"
                                    style={{
                                        width: `100%`,
                                        height: `100%`,
                                        padding: `0`,
                                        margin: `0`
                                    }}
                                    // setOptions={{
                                    //     showGutter: false,
                                    //     highlightActiveLine: true,
                                    //     readOnly: false,
                                    //     value: this.props.user
                                    // }}
                                    name="2"
                                    editorProps={{
                                        $blockScrolling: true
                                    }}
                                />

                            </div>
                            <div className="col-lg-6 col-md-12 col-xs-12 m-0 p-0">
                                {/* <EditorOutPut></EditorOutPut> */}

                                <AceEditor

                                    mode="java"
                                    theme="chrome"
                                    style={{
                                        width: `100%`,
                                        height: `100%`,
                                        padding: `0`,
                                        margin: `0`
                                    }}
                                    setOptions={{
                                        showGutter: false,
                                        highlightActiveLine: true,
                                        readOnly: true,
                                        value: this.props.user
                                    }}
                                    name="2"
                                    editorProps={{
                                        $blockScrolling: true
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        );
    }
}

export default AppGenerator;

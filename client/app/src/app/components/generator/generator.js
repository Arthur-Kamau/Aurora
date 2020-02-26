import React, { Component } from 'react'
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-csharp";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-kuroir";
import "ace-builds/src-noconflict/theme-chrome";
import "ace-builds/src-noconflict/theme-twilight";
import MonacoEditor from 'react-monaco-editor';
import { connect } from 'react-redux';
import updateSchemaDataForGenerateSchema from '../../../actions/generate_schema_shema_data_action';
import updateRawJsonForGenerateSchema from '../../../actions/generate_schema_raw_json_string_action';

import updateSchemaForGenerateJson from '../../../actions/generate_json_schema_action';
import updateJsonForGenerateJson from '../../../actions/generate_json_raw_string_action';


class AppGenerator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: 'generate_schema',
            ws: '',
            userInput: '',
            serverOuput: ''
        }

    }
    componentDidMount() {
        this.toggleOffcanvas();

        this.state.ws = new WebSocket("wss://echo.websocket.org")//AppUrls.toJsonWebSocket)
        this.state.ws.onopen = () => {
            // on connecting, do nothing but log it to the console
            console.log('connected')
        }

        this.state.ws.onmessage = evt => {
            // listen to data sent from the websocket server
            const message = JSON.parse(evt.data)

            console.log("message from websocket" + evt.data)
            // this.setState({ serverOuput: evt.data });

            if (this.state.activeItem == 'generate_schema') {
                this.props.onupdateSchemaDataForGenerateSchema(evt.data);
            } else {

                this.props.onupdateJsonForGenerateJson(evt.data);
            }






        }

        this.state.ws.onclose = () => {
            console.log('disconnected')

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
        this.setState({ activeItem: 'generate_json' });
    }
    changeLocationToGenerateSchema = () => {
        this.setState({ activeItem: 'generate_schema' });
    }


    userInput = (newValue, e) => {
        var input = newValue;
        var data = JSON.stringify({ data: input });
        console.log("user input " + input)

        //   this.setState({userInput : input});

        this.state.ws.send(data);
    }


    render() {
        var generateSchemaStyle = this.state.activeItem == 'generate_schema' ? ' list-group-item active' : 'list-group-item';
        var generateJsonStyle = this.state.activeItem == 'generate_json' ? ' list-group-item active' : 'list-group-item';
        const userEditorOptions = {
            selectOnLineNumbers: true
        };

        return (

            <div style={{ height: `99%`, width: `100%`, backgroundColor: `black`, margin: `0px`, padding: `0px` }}>
                <div className="row " style={{ height: `100%`, backgroundColor: `yellow`, width: `100%`, margin: `0px`, padding: `0px` }}>
                    <ul className="list-group list-group-flush col-lg-2 col-md-4 " style={{ backgroundColor: `#f2f2f2`, margin: `0px`, padding: `0px`, height: `100%` }}>

                        <li
                            className={generateSchemaStyle}
                            onClick={this.changeLocationToGenerateSchema} >
                            Generate Schema
                        </li>

                        <li
                            className={generateJsonStyle}
                            onClick={this.changeLocationToGenerateJson} >
                            Generate Json
                        </li>

                    </ul>
                    <div className="col-lg-10 col-md-8 col-xs-12 " style={{ margin: `0px`, padding: `0px`, height: `100%`, width: `100%`, backgroundColor: `white` }}>
                        <div className="row " style={{ margin: `0px`, padding: `0px`, height: `100%`, width: `100%`, backgroundColor: `black` }}>
                            <div className="col-lg-6 col-md-12 col-xs-12     " style={{ margin: `0px`, padding: `0px`, height: `100%`, width: `100%`, backgroundColor: `yellow` }} >

                                <MonacoEditor
                                    width="600"
                                    height="100vh"
                                    language="java"
                                    theme="vs-dark"
                                    options={userEditorOptions}
                                    onChange={this.userInput}
                                />
                            </div>
                            <div className="col-lg-6 col-md-12 col-xs-12 m-0 p-0">
                                {this.state.activeItem == 'generate_schema' ?
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
                                            value: this.props.convertToSchemaShcema
                                        }}
                                        name="3"
                                        editorProps={{
                                            $blockScrolling: true
                                        }}
                                    />
                                    :

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
                                            value: this.props.convertJsonJsonString
                                        }}
                                        name="3"
                                        editorProps={{
                                            $blockScrolling: true
                                        }}
                                    />}
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        );
    }
}


const mapStateToProps = state => ({
    account: state.userAccount,
    convertJsonJsonString: state.convertJsonJsonString,
    convertToJsonRawShcema: state.convertToJsonRawShcema,

    convertToSchemaShcema: state.convertToSchemaShcema,
    convertToSchemaJsonString: state.convertToSchemaJsonString
});


const mapActionsToProps = {
    onupdateSchemaDataForGenerateSchema: updateSchemaDataForGenerateSchema,
    onupdateRawJsonForGenerateSchema: updateRawJsonForGenerateSchema,
    onupdateSchemaForGenerateJson: updateSchemaForGenerateJson,
    onupdateJsonForGenerateJson: updateJsonForGenerateJson,

};


export default connect(mapStateToProps, mapActionsToProps)(AppGenerator);

import React, { Component } from 'react'
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-csharp";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-kuroir";
import "ace-builds/src-noconflict/theme-chrome";
import "ace-builds/src-noconflict/theme-twilight";
import { connect } from 'react-redux';
import updateSchemaDataForGenerateSchema from '../../../actions/generate_schema_shema_data_action';
import updateRawJsonForGenerateSchema from '../../../actions/generate_schema_raw_json_string_action';

import updateSchemaForGenerateJson from '../../../actions/generate_json_schema_action';
import updateJsonForGenerateJson from '../../../actions/generate_json_raw_string_action';

// import MonacoEditor from 'react-monaco-editor';
import MonacoEditor from '@uiw/react-monacoeditor';

class AppGenerator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: 'generate_json', // 'generate_schema',
            userInput: '',
            serverOuput: '',
            iuserInputWidth: '',
            ws: '',
            dataFromServer: '',
            thisEditorWidth: '',
            pageWidth: '',
            pageHeight: ''
        }


    }
    componentDidMount() {

        

        this.state.ws = new WebSocket("ws://0.0.0.0:8080/generator")
        this.state.ws.onopen = () => {
            // on connecting, do nothing but log it to the console
            console.log('generateor connected')
        }

        this.state.ws.onmessage = evt => {
            console.log("message received " + evt.data);
            // listen to data sent from the websocket server
            const message = JSON.parse(evt.data)

            this.setState({ dataFromServer: message.message })
            console.log("message" + message.message)
        }

        this.state.ws.onclose = () => {
            console.log('generator disconnected')

        }

        // window.addEventListener("resize", this.updateDimensions);

    }

    updateDimensions = () =>{
        window.location.reload(false);
    }
    changeLocationToGenerateJson = () => {
        this.setState({ activeItem: 'generate_json' });
    }
    changeLocationToGenerateSchema = () => {
        this.setState({ activeItem: 'generate_schema' });

    }

    

    // handleEditorChange = (ev, value) => {
    handleEditorChange = (value) => {

        var input = value;
        var data = JSON.stringify({ payload: input, action: this.state.activeItem });
        console.log("user input " + input)


        if (this.state.ws.readyState === 1) {
            this.state.ws.send(data);
        } else {
            console.error("unable to send message")
        }

    };


    editorDidMount = (editor, monaco) => {
        console.log('editorDidMount', editor);
        editor.focus();
    }
    onChange = (newValue, e) => {
        console.log('onChange', newValue, e);

        var input = newValue;
        var data = JSON.stringify({ payload: input, action: this.state.activeItem });
        console.log("user input " + input)


        if (this.state.ws.readyState === 1) {
            this.state.ws.send(data);
        } else {
            console.error("unable to send message")
        }
    }

    render() {
        var generateSchemaStyle = this.state.activeItem == 'generate_schema' ? ' list-group-item active' : 'list-group-item';
        var generateJsonStyle = this.state.activeItem == 'generate_json' ? ' list-group-item active' : 'list-group-item';
        const userEditorOptions = {
            selectOnLineNumbers: true
        };

        const code = this.state.code;
        const options = {
            selectOnLineNumbers: true
        };

        return (

            <div style={{ height: `99%`, width: `100%`, backgroundColor: `black`, margin: `0px`, padding: `0px` }}>
                <div className="row " style={{ height: `100%`, backgroundColor: `yellow`, width: `100%`, margin: `0px`, padding: `0px` }}>
                    {/* <ul className="list-group list-group-flush col-lg-2 col-md-4 " style={{ backgroundColor: `#f2f2f2`, margin: `0px`, padding: `0px`, height: `100%` }}>

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
                    </ul> */}
                    <div className="col-lg-12 col-md-12 col-xs-12 " style={{ margin: `0px`, padding: `0px`, height: `100%`, width: `100%`, backgroundColor: `white` }}>
                        <div className="row " style={{ margin: `0px`, padding: `0px`, height: `100%`, width: `100%`, backgroundColor: `black` }} >
                            <div ref="myImgContainer" className="col-lg-6 col-md-6 col-xs-12" style={{ margin: `0px`, padding: `0px`, height: `100%`, width: `100%`, backgroundColor: `green` }}  >

                                 {this.editor ||
                                    (this.editor = (
                                        // <ControlledEditor
                                        //     width={this.state.iuserInputWidth}
                                        //     //    options={userEditorOptions}
                                        //     onChange={this.handleEditorChange}
                                        //     height="90vh"
                                        //     language="java"
                                        //     theme="vs-dark"


                                        // />

                                        <AceEditor
                                            mode="csharp"
                                            theme="twilight"
                                            style={{
                                                width: `100%`,
                                                height: `100%`,
                                                padding: `0`,
                                                margin: `0`
                                            }}
                                            onChange={this.handleEditorChange}
                                            setOptions={{
                                                showGutter: true,
                                                enableBasicAutocompletion: true,
                                                enableSnippets: true,
                                                enableLiveAutocompletion: true,
                                                value: this.state.rawModel,
                                                fontFamily : ''
                                            }}
                                            name="1"
                                            editorProps={{
                                                $blockScrolling: true
                                            }}
                                        />
                                    ))} 


                                {/* <MonacoEditor
                                    language="javascript"
                                    width={this.state.thisEditorWidth}
                                    onChange={this.onChange.bind(this)}
                                    options={{
                                        theme: 'vs-dark',
                                    }}
                                /> */}
                            </div>
                            <div className="col-lg-6 col-md-6 col-xs-12 m-0 p-0">
                                {this.state.activeItem == 'generate_schema' ?
                                    // value: this.props.convertToSchemaShcema != null && this.props.convertToSchemaShcema.length > 0 ?
                                    //     this.props.convertToSchemaShcema.data : this.props.convertToSchemaShcema
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
                                            value: this.state.dataFromServer

                                        }}
                                        value ={this.state.dataFromServer}
                                        name="3"
                                        editorProps={{
                                            $blockScrolling: true
                                        }}
                                    />
                                    :
                                    // value:
                                    //     this.props.convertJsonJsonString != null && this.props.convertJsonJsonString.length > 0 ?
                                    //         this.props.convertJsonJsonString.data : this.props.convertJsonJsonString

                                    <AceEditor
                                        mode="json"
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
                                            value: this.state.dataFromServer
                                        }}
                                        value ={this.state.dataFromServer}
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



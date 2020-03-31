import React, { Component } from 'react'
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-csharp";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-kuroir";
import "ace-builds/src-noconflict/theme-chrome";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/theme-gruvbox";
import { connect } from 'react-redux';
import { appInputXmlToJson, appInputJsonToXml, generateSchemaFromJson, generateJsonFromSchema } from "./generator_tool";
import MonacoEditor from '@uiw/react-monacoeditor';

class AppGenerator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ws: '',
            dataFromServer: '',
            xmlToJson: '',
            jsonToXml: '',
            jsonToSchema: '',
            schemaToJson: '',
            width: 0,
            height: 0,

            targetLanguage: '',
            targetLanguageNameSpaceOrClassName: '',
        }


    }
    componentDidMount() {

//confirm windo location
if(window.location.pathname!="/aurora/generator"){
window.location="/aurora/generator"
}else{
console.log("window location okay.");
}

        // initialize conversion classes
        var xmlToJson = new appInputXmlToJson();
        this.setState({ xmlToJson: xmlToJson });

        var jsonToXml = new appInputJsonToXml();
        this.setState({ jsonToXml: jsonToXml });


        var jsonToSchema = new generateSchemaFromJson();
        this.setState({ jsonToSchema: jsonToSchema });


        var schemaToJson = new generateJsonFromSchema();
        this.setState({ schemaToJson: schemaToJson });



        // initialize websocket connection
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

        this.setState({ width: window.innerWidth, height: window.innerHeight });
        window.addEventListener('resize', this.updateDimensions);

    }
    updateDimensions = () => {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    };
    onChange = (newValue, e) => {
        console.log('onChange', newValue, e);
        this.handleEditorChange(newValue)
    }
    handleEditorChange = async (value) => {

        // var input = value;
        // var data = JSON.stringify({ payload: input, action: this.state.activeItem });
        // console.log("user input " + input)


        // if (this.state.ws.readyState === 1) {
        //     this.state.ws.send(data);
        // } else {
        //     console.error("unable to send message")
        // }


        if (this.props.appGeneratorOperations.appGeneratorOperationsActions == 'convert_to_json') {
            alert(" (convert to json)")

        } else if (this.props.appGeneratorOperations.appGeneratorOperationsActions == 'generate_schema') {

            // var classNameOrNameSpace = this.state.targetLanguageNameSpaceOrClassName == null || this.state.targetLanguageNameSpaceOrClassName.length == 0 ?
            //     "Aurorora" : this.state.targetLanguageNameSpaceOrClassName
            let classNameOrNameSpace = 
            this.props.appGeneratorOperations.convertToSchemaSettings.classOrNameSpaceName == null  ||
            this.props.appGeneratorOperations.convertToSchemaSettings.classOrNameSpaceName == undefined 
            ? 'App' :
                this.props.appGeneratorOperations.convertToSchemaSettings.classOrNameSpaceName;


            let languageItem = 
            this.props.appGeneratorOperations.convertToSchemaSettings.targetLanguage == null  || 
            this.props.appGeneratorOperations.convertToSchemaSettings.targetLanguage == undefined
            ? "c#" : this.props.appGeneratorOperations.convertToSchemaSettings.targetLanguage;

            const { lines: res } = await this.quicktypeJSON(
                languageItem,
                classNameOrNameSpace,
                value
            );
            console.log("==>" + res.join("\n"));
            if (res !== null && typeof res === 'object') {

                const disp = res.join("\n");
                this.setState({ dataFromServer: disp });
                this.setState({ dataFromServer: disp });
            } else if (res == null) {
                this.setState({ dataFromServer: "Encoutered an error" })
            } else {
                this.setState({ dataFromServer: JSON.stringify(res) })
            }
        } else if (this.props.appGeneratorOperations.appGeneratorOperationsActions == 'generate_data') {

            alert(" (generate data)")

        } else if (this.props.appGeneratorOperations.appGeneratorOperationsActions == 'convert_to_json_from_xml') {

            var res = this.state.xmlToJson.convert(value)
            console.log("response " + typeof res)
            if (Array.isArray(res)) {
                this.setState({ dataFromServer: res });
            } else if (res !== null && typeof res === 'object') {
                this.setState({ dataFromServer: JSON.stringify(res) })
            } else if (res == null) {
                this.setState({ dataFromServer: "Encoutered an error" })
            } else {
                this.setState({ dataFromServer: JSON.stringify(res) })
            }

        } else if (this.props.appGeneratorOperations.appGeneratorOperationsActions == 'convert_to_xml_from_json') {


            var res = this.state.jsonToXml.convert(value)
            console.log("response " + typeof res)
            if (Array.isArray(res)) {
                alert("array")
            } else if (typeof res === 'object' && res !== null) {
                console.log("response  obj" + JSON.stringify(res))
                this.setState({ dataFromServer: JSON.stringify(res) })
            } else if (res == null) {
                this.setState({ dataFromServer: "Encoutered an error" })
            } else {
                this.setState({ dataFromServer: res })
            }
        } else {

            alert('option unknown');


        }
    };


    quicktypeJSON = async (targetLanguage, typeName, jsonString) => {

        const {
            quicktype,
            InputData,
            jsonInputForTargetLanguage,
            JSONSchemaInput,
            JSONSchemaStore
        } = require("quicktype-core");

        const jsonInput = jsonInputForTargetLanguage(targetLanguage);

        // We could add multiple samples for the same desired
        // type, or many sources for other types. Here we're
        // just making one type from one piece of sample JSON.
        await jsonInput.addSource({
            name: typeName,
            samples: [jsonString]
        });

        const inputData = new InputData();
        inputData.addInput(jsonInput);

        return await quicktype({
            inputData,
            lang: targetLanguage
        });
    }


    render() {

        return (

            <div style={{ height: `99%`, width: `100%`, backgroundColor: `black`, margin: `0px`, padding: `0px` }}>
                <div className="row " style={{ height: `100%`, backgroundColor: `yellow`, width: `100%`, margin: `0px`, padding: `0px` }}>
                    <div className="col-lg-12 col-md-12 col-xs-12 " style={{ margin: `0px`, padding: `0px`, height: `100%`, width: `100%`, backgroundColor: `white` }}>
                        <div className="row " style={{ margin: `0px`, padding: `0px`, height: `100%`, width: `100%`, backgroundColor: `black` }} >
                            <div ref="myImgContainer" className="col-lg-6 col-md-6 col-xs-12" style={{ margin: `0px`, padding: `0px`, height: `100%`, width: `100%`, backgroundColor: `green` }}  >

                                {/* {this.editor ||
                                    (this.editor = ( */}

                                {/* <AceEditor
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
                                                // fontFamily: "Sans-serif",
                                            }}
                                            name="1"
                                            editorProps={{
                                                $blockScrolling: true
                                            }} */}
                                {/* /> */}
                                {/* ))} */}

                                {/* height -64 because of appp bar and footer */}
                                <MonacoEditor
                                    language="javascript"
                                    // width="100%"
                                    // height="92vh"
                                    width={this.state.width - 50}
                                    height={this.state.height - 64}
                                    onChange={this.onChange}
                                    options={{
                                        theme: 'vs-dark',
                                    }}
                                />
                            </div>
                            <div className="col-lg-6 col-md-6 col-xs-12 m-0 p-0">
                                <AceEditor
                                    mode="java"
                                    theme="gruvbox"
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
                                    value={this.state.dataFromServer}
                                    name="3"
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


const mapStateToProps = state => ({
    account: state.userAccount,
    appGeneratorOperations: state.appGeneratorOperations,
    convertJsonJsonString: state.convertJsonJsonString,
    convertToJsonRawShcema: state.convertToJsonRawShcema,

    convertToSchemaShcema: state.convertToSchemaShcema,
    convertToSchemaJsonString: state.convertToSchemaJsonString
});


const mapActionsToProps = {

};


export default connect(mapStateToProps, mapActionsToProps)(AppGenerator);



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
import { appInputXmlToJson, appInputJsonToXml, generateSchemaFromJson, generateJsonFromSchema, generateYamFromJson, generateHtmlFromMarkdown, generateJsonFromYaml } from "./generator_tool";
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
            theme: '',
            targetLanguage: '',
            targetLanguageNameSpaceOrClassName: '',
        }


    }
    componentDidMount() {

        //confirm windo location
        if (window.location.pathname != "/aurora/generator") {
            window.location = "/aurora/generator"
        } else {
            console.log("window location okay.");
        }


        // set theme 
        if (this.props.authToken == null || this.props.authToken.length == 0) {
            try {
                var theme = window.localStorage.getItem('theme_unauth');

                this.setState({ theme: theme });

                console.error("theme " + theme);
            } catch (objError) {
                this.setState({ theme: this.props.userSettings.theme });
            }
        } else {
            this.setState({ theme: this.props.userSettings.theme });
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



        if (this.props.appGeneratorOperations.appGeneratorOperationsActions == 'convert_json_to_yaml') {

            let conv = new generateYamFromJson();
            let res = conv.convert(value)
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

        } else if (this.props.appGeneratorOperations.appGeneratorOperationsActions == 'convert_yaml_to_json') {
          var  YAML = require('yamljs');
 
            // parse YAML string
            var res = YAML.parse(value);
             

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

        } else if (this.props.appGeneratorOperations.appGeneratorOperationsActions == 'convert_markdown_to_html') {


            let conv = new generateHtmlFromMarkdown();
            let res = conv.convert(value)
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



        } else if (this.props.appGeneratorOperations.appGeneratorOperationsActions == 'convert_schema_to_json') {
            let conv = new generateJsonFromSchema();
            const res = conv.ConvertToJson(value);
            if (res !== null && typeof res === 'object') {
                this.setState({ dataFromServer: JSON.stringify(res) });
            } else if (res == null) {
                this.setState({ dataFromServer: "Encoutered an error" });
            } else {
                this.setState({ dataFromServer: res });
            }

        } else if (this.props.appGeneratorOperations.appGeneratorOperationsActions == 'generate_schema') {

            // var classNameOrNameSpace = this.state.targetLanguageNameSpaceOrClassName == null || this.state.targetLanguageNameSpaceOrClassName.length == 0 ?
            //     "Aurorora" : this.state.targetLanguageNameSpaceOrClassName
            let classNameOrNameSpace =
                this.props.appGeneratorOperations.convertToSchemaSettings.classOrNameSpaceName == null ||
                    this.props.appGeneratorOperations.convertToSchemaSettings.classOrNameSpaceName == undefined
                    ? 'App' :
                    this.props.appGeneratorOperations.convertToSchemaSettings.classOrNameSpaceName;


            let languageItem =
                this.props.appGeneratorOperations.convertToSchemaSettings.targetLanguage == null ||
                    this.props.appGeneratorOperations.convertToSchemaSettings.targetLanguage == undefined
                    ? "c#" : this.props.appGeneratorOperations.convertToSchemaSettings.targetLanguage;


            let con = new generateSchemaFromJson();

            const { lines: res } = await con.convert(
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
        } else if (this.props.appGeneratorOperations.appGeneratorOperationsActions == 'generate_json_data_from_schema') {

            alert(" (generate data) not yet impimented")

        } else if (this.props.appGeneratorOperations.appGeneratorOperationsActions == 'convert_schema_to_json_from_xml') {

            var res = this.state.xmlToJson.convert(value)
            console.log("response " + typeof res)
            if (Array.isArray(res)) {
                this.setState({ dataFromServer: res });
            } else if (res !== null && typeof res === 'object') {
                this.setState({ dataFromServer: JSON.stringify(res) })
            } else if (res == null) {
                this.setState({ dataFromServer: "Encoutered an error" })
            } else {
                this.setState({ dataFromServer: res })
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




    render() {
        let editOnlyStyle =
        {
            // theme: 'vs-dark',
            theme: this.state.theme == "light" ? 'vs' : 'vs-dark',
        }

        let readOnlyStyle =
        {
            theme: this.state.theme == "light" ? 'vs' : 'vs-dark',
            readOnly: true
        }

        console.error("edit olyth theme" + JSON.stringify(editOnlyStyle));
        return (

            <div style={{ height: `99%`, width: `100%`, backgroundColor: `black`, margin: `0px`, padding: `0px` }}>
                <div className="row " style={{ height: `100%`, backgroundColor: `yellow`, width: `100%`, margin: `0px`, padding: `0px` }}>
                    <div className="col-lg-12 col-md-12 col-xs-12 " style={{ margin: `0px`, padding: `0px`, height: `100%`, width: `100%`, backgroundColor: `white` }}>
                        <div className="row " style={{ margin: `0px`, padding: `0px`, height: `100%`, width: `100%`, backgroundColor: `black` }} >
                            <div ref="myImgContainer" className="col-lg-6 col-md-6 col-xs-12" style={{ margin: `0px`, padding: `0px`, height: `100%`, width: `100%`, backgroundColor: `green` }}  >

                                <MonacoEditor
                                    language="java"
                                    // width="100%"
                                    // height="92vh"
                                    width={this.state.width - 50}
                                    height={this.state.height - 64}
                                    onChange={this.onChange}
                                    options={editOnlyStyle}
                                />
                            </div>
                            <div className="col-lg-6 col-md-6 col-xs-12 m-0 p-0">
                                <MonacoEditor
                                    language="json"

                                    // width={this.state.width - 100}
                                    height={this.state.height - 64}
                                    value={this.state.dataFromServer}
                                    options={readOnlyStyle}
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
    authToken: state.authtoken,
    userSettings: state.userSettings,

    appGeneratorOperations: state.appGeneratorOperations,
    convertJsonJsonString: state.convertJsonJsonString,
    convertToJsonRawShcema: state.convertToJsonRawShcema,

    convertToSchemaShcema: state.convertToSchemaShcema,
    convertToSchemaJsonString: state.convertToSchemaJsonString
});


const mapActionsToProps = {

};


export default connect(mapStateToProps, mapActionsToProps)(AppGenerator);



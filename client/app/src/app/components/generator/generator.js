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

    //loop through the array in reverese finding any character that is not white space and return it
    getPreviousWord = (wordsList) => {
        let previousWord = "";
        for (var i = wordsList.length - 1; i >= 0; i--) {
            if (wordsList[i].trim().length == 0) {
                console.log("Ignoring space at postion " + i + "inspect " + wordsList)
            } else {
                previousWord = wordsList[i];
                break;
            }
        }
        console.log("previous word found " + previousWord);
        return previousWord;
    }

    wordContainsAnyForbiddenCharacters(word, characters) {
        for (var i = 0; i != characters.length; i++) {
            var charItem = characters[i];
            if (word.indexOf(charItem) != - 1) {
                return charItem;
            }
        }
        return null;
    }
    // read through the line and split by whitespace
    // loop through the list generated above.
    //  chack if item in array is key word or class and ignore if item i whitespace add to array
    //  if anything else get the previous word and  check if its a keyword  if it is genrate a key value pair ,
    // if its space , { , } or class ignore .
    // if its unknown return an error 
    ConvertToJsonLine = (value, lineNumber, maxLines) => {
        let finalStringArray = [];
        let keyWords = ["int", "string", "date", "datetime", "double"];
        let forBiddenCharactersInWords = ["{", "}", "[", "]"];
        //split string by space 
        var stringArray = value.split(/(\s+)/);
        for (var i = 0; i < stringArray.length; i++) {
            console.log(" line " + lineNumber + " max line " + maxLines + " looping item " + stringArray[i] + "final array " + finalStringArray)
            if (keyWords.includes(stringArray[i].toLowerCase())) {


            } else if (stringArray[i].toLowerCase() == "class") {

            }
            else if (stringArray[i].trim().length == 0) {

                // finalStringArray.push(stringArray[i]);
            } else if (stringArray[i] == "{") {
                console.log("previous word is { ")
                // finalStringArray.push(stringArray[i].trim()); 

                finalStringArray.push(stringArray[i] + " \n");
                // finalStringArray.push("h");
                console.error("after appending } array " + finalStringArray);
            }
            else if (stringArray[i] == "}") {
                console.log("previous word is } ");
                //add a traili , if not end of line 
                let trailing = lineNumber != maxLines ? " , " : ""
                let charData = "\n " + stringArray[i] + trailing
                finalStringArray.push(charData);
                console.error("after appending } array " + finalStringArray);
            }
            else {
                let containsForbidenChar = this.wordContainsAnyForbiddenCharacters(stringArray[i], forBiddenCharactersInWords);

                if (containsForbidenChar != null) {

                    finalStringArray.push(("Error in line " + lineNumber + " at word " + stringArray[i] +
                        " names are not allowed to contain { or } \n probably you forgot to whitespace between " +
                        " { or } and " + stringArray[i]));
                    break;
                }
                //get previous word or sign 
                let slicedArray = stringArray.slice(0, i - 1);
                console.log("find previous word from " + slicedArray + " and its length " + slicedArray.length);
                let previousWordOrSign;
                if (slicedArray == null || slicedArray.length == 0) {
                    console.log("slicedArray is null or 0 ")
                    previousWordOrSign = "";
                } else {
                    previousWordOrSign = this.getPreviousWord(slicedArray);
                }

                if (previousWordOrSign != null || previousWordOrSign != undefined) {
                    if (previousWordOrSign.trim().length == 0) {
                        console.log("previous word " + previousWordOrSign + "  is space");
                    } else if (keyWords.includes(previousWordOrSign.toLowerCase())) {
                        console.log("previous word " + previousWordOrSign + "  is keyword");

                        let term =lineNumber != maxLines ? " , " : " ";
                        let gen = " " + stringArray[i].trim() + " : value  " + term + "\n"
                        finalStringArray.push(gen);
                        console.error("gen " + gen + "after appending key and valu name array  " + finalStringArray);
                    } else if (previousWordOrSign.trim() == "}") {
                        console.log("Should not runn previous word is } ");
                    } else if (previousWordOrSign.trim() == "{") {
                        console.log("Should not runn previous word is { ")
                    } else if (previousWordOrSign.trim().toLowerCase() == "class") {
                        console.log("previous word is class ")
                        finalStringArray.push( stringArray[i] + " : ")
                  
                        console.error("after appending class name array " + finalStringArray);
                    } else {
                        console.log("previous word " + previousWordOrSign + "  is unknown");

                        finalStringArray.push(("Error in line " + lineNumber + " at word " + previousWordOrSign + " expected a keyword  " + keyWords + "  try int " + stringArray[i] + " or string " + stringArray[i]));

                        break;
                    }
                } else {
                    console.error("previous word is undifined");
                }


            }

        }
        // return finalStringArray.filter(function (str) {
        //     return /\S/.test(str);
        // }).join();
        let finalString = "";
        finalStringArray.forEach((item, index) => {
            console.log("item " + item + " index " + index);
            if (item.length != 0) { finalString += item }
        });
        return finalString;
    }
    // split the lines by new line 
    // split the lines by ;
    // process each word in the line
    // return the result 
    ConvertToJson = (value) => {
        let finalString = "{ \n"

        // efghi
        //split by new line
        var lines = value.split("\n");
        for (var e = 0; e < lines.length; e++) {


            if (lines[e].includes(";")) {
                let lineInLines = lines[e].split(";");
                for (var f = 0; f < lineInLines.length; f++) {
                    if (lineInLines[f].startsWith("//")) {
                        console.log("line starts with a comment");
                    } else if (lines[e].length == 0) {
                        console.log("ignore empty line");
                    } else {
                        // array starts at 0 humans start counting from one
                        var returnData = this.ConvertToJsonLine(lineInLines[f], e + 1, lines.length);
                        console.log("line in lines return " + returnData + "  final string " + finalString);
                        finalString += returnData
                    }
                }
            } else {
                if (lines[e].startsWith("//")) {
                    console.log("line starts with a comment");
                } else if (lines[e].length == 0) {
                    console.log("ignore empty line");
                } else {
                    var returnData = this.ConvertToJsonLine(lines[e], e + 1, lines.length);

                    finalString += returnData;
                    console.log("line item return " + returnData + "  final string " + finalString);
                }
            }



        }

        return finalString += " \n }";

    }
    handleEditorChange = async (value) => {



        if (this.props.appGeneratorOperations.appGeneratorOperationsActions == 'convert_to_json') {

            const res = this.ConvertToJson(value);
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
                                {/* <AceEditor
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
                                /> */}
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



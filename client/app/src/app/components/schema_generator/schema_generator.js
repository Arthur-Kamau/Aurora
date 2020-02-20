import React, { Component } from 'react';

import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-csharp";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-kuroir";
import "ace-builds/src-noconflict/theme-chrome";
import "ace-builds/src-noconflict/theme-twilight";

class SchemaGeneratorPage extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 

            <div style={{ height:`100%`}}>
            <div className="row container"  style={{ height:`100%`,  marginLeft: `5px`, marginRight: `2px` }}>
                   <div
                     className="col-xl-6 col-lg-6 col-sm-6"
                     style={{ margin: 0, padding: 0 }}
                   >
                     <AceEditor
                       mode="csharp"
                       theme="twilight"
                       style={{
                         width: `100%`,
                         height: `100%`,
                         padding: `0`,
                         margin: `0`
                       }}
                       onChange={this.onChange}
                       setOptions={{
                         showGutter: true,
                         enableBasicAutocompletion: true,
                         enableSnippets: true,
                         enableLiveAutocompletion: true,
                         // value: this.state.store.toJsonRawSchema
                       }}
                       name="1"
                       editorProps={{
                         $blockScrolling: true
                       }}
                     />
                   </div>
           
                   <div
                     className="col-xl-6 col-lg-6 col-sm-6"
                     style={{
                       marginLeft: `0`,
                     }}
                   >
                     <h1>{this.state.dataFromServer}</h1>
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
                         // value:this.state.dataFromServer.payload
                       }}
                       name="2"
                       editorProps={{
                         $blockScrolling: true
                       }}
                     />
                   </div>
                 </div>
               </div>
           
         );
    }
}
 
export default SchemaGeneratorPage;
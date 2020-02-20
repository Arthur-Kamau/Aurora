import React, { Component } from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-csharp";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-kuroir";
import "ace-builds/src-noconflict/theme-chrome";
import "ace-builds/src-noconflict/theme-twilight";

class FromJson extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.onChange = this.onChange.bind(this);
      }

      onChange(newValue) {
        console.log("change", newValue);
      }
      componentDidMount() {
        // document.body.classList.toggle("sidebar-icon-only");
        
      }
      render() {
        return (
            <div className="row" style={{height:`99%`, width:`100%`,marginLeft: `5px`, marginRight:`2px`}}>
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
                    enableLiveAutocompletion: true
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
                    value: "//Your generated schema will apear here \n//view the documentation to learn more."
                  }}
                  name="2"
                  editorProps={{
                    $blockScrolling: true
                  }}
                />
              </div>
          </div>
        );
      }
    }


export default FromJson;

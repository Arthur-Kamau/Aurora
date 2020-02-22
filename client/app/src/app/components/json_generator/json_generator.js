import React, { Component } from 'react'
// import './json_generator.css';
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-csharp";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-kuroir";
import "ace-builds/src-noconflict/theme-chrome";
import "ace-builds/src-noconflict/theme-twilight";
import MonacoEditor from 'react-monaco-editor';
import {connect}  from "react-redux";
import updateUser from '../../../actions/user_actions';
import {websocket} from './websockets'
import config from './monaco_configs'

import Editor from "@monaco-editor/react";
class JsonGeneratorPage extends Component {


onChange = (newValue) => {
    console.log("change new value", newValue);
    var obj = { action: "to-json", payload: newValue };
    // Converting JS object to JSON string.
    var json = JSON.stringify(obj);
    try {

     websocket.send(json) //send data to the server
    } catch (error) {
      console.log(error) // catch error
    }

  }




  componentWillMount() {
    // document.body.classList.toggle("sidebar-icon-only");
    // websocket //AppUrls.toJsonWebSocket)
   websocket.onopen = () => {
      // on connecting, do nothing but log it to the console
      console.log('connected')
    }

   websocket.onmessage = evt => {
      // listen to data sent from the websocket server
      const message = JSON.parse(evt.data)

      console.log("message" + message.payload)

      this.props.onUpdateUser(message.payload);

    }

   websocket.onclose = () => {
      console.log('disconnected')

    }
  }


  render() {
    return (
    <div style={{ height:`100%`}}>
    <div className="row container"  style={{ height:`100%`,  marginLeft: `5px`, marginRight: `2px` }}>
        <div
          className="col-xl-6 col-lg-6 col-sm-6"
          style={{ margin: 0, padding: 0 }}
        >

          <MonacoEditor
        language="javascript"
        theme="vs-dark"
        // value={code}
        // options={options}
        onChange={this.onChange}
        // editorDidMount={this.editorDidMount}
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

    );
  }
}



const mapStateToProps = state => (
  {
    products : state.products,
    user : state.user,
  }
);

const mapActionsToProps ={
 onUpdateUser: updateUser
};
export default connect(mapStateToProps, mapActionsToProps)(JsonGeneratorPage);


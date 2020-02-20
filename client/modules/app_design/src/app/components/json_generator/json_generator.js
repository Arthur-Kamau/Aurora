import React, { Component } from 'react'
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-csharp";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-kuroir";
import "ace-builds/src-noconflict/theme-chrome";
import "ace-builds/src-noconflict/theme-twilight";
// import MonacoEditor from 'react-monaco-editor';
// import Editor from "@monaco-editor/react";
import MonacoEditor from '@uiw/react-monacoeditor';
import { connect } from "react-redux";
import updateUser from '../../../actions/user_actions';
import { websocket } from './websockets'


class JsonGeneratorPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      websocketConnection: websocket
    }
  }
  onChange = (newValue) => {
    console.log("change new value", newValue);
    var obj = { action: "to-json", payload: newValue };
    // Converting JS object to JSON string.
    var json = JSON.stringify(obj);
    try {
      // CONNECTING OPEN CLOSING or CLOSED
      if (this.state.websocketConnection.readyState === WebSocket.CLOSED || this.state.websocketConnection.readyState === WebSocket.CLOSING) {
        this.state.websocketConnection = new WebSocket("ws://0.0.0.0:8080/ws/schema-to-json")
      } else {
        this.state.websocketConnection.send(json) //send data to the server
      }

    } catch (error) {
      console.log("error sending " + error) // catch error
    }

  }




  componentWillMount() {
    // document.body.classList.toggle("sidebar-icon-only");
    // this.state.websocketConnection //AppUrls.toJsonWebSocket)
    this.state.websocketConnection.onopen = () => {
      // on connecting, do nothing but log it to the console
      console.log('connected')
    }
    this.state.websocketConnection.onerror = () => {
      // on connecting, do nothing but log it to the console
      console.log('err')

      alert("errro websocket")
    }
    this.state.websocketConnection.onmessage = evt => {
      // listen to data sent from the websocket server
      const message = JSON.parse(evt.data)

      console.log("message" + message.payload)

      this.props.onUpdateUser(message.payload);

    }

    this.state.websocketConnection.onclose = () => {
      console.log('disconnected')
      alert("disconnected")
    }
  }


  render() {
    return (
      <div style={{ height: `100%` }}>
        <div className="row container" style={{ height: `100%`, marginLeft: `5px`, marginRight: `2px` }}>
          <div
            className="col-xl-6 col-lg-6 col-sm-6"
            style={{ margin: 0, padding: 0 }}
          >

            <MonacoEditor
              language="java"
              options={{
                theme: 'vs-dark',
              }}
              onChange={this.onChange}
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
    products: state.products,
    user: state.user,
    jsonString: state.convertToJsonString,
    schema: state.convertToJsonRawSchema
  }
);

const mapActionsToProps = {
  onUpdateUser: updateUser
};
export default connect(mapStateToProps, mapActionsToProps)(JsonGeneratorPage);


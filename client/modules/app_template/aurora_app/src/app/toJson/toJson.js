import React, { Component } from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-csharp";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-kuroir";
import "ace-builds/src-noconflict/theme-chrome";
import "ace-builds/src-noconflict/theme-twilight";
import AppUrls from "../../url/url";
// import StoreContext  from '../../store/store';


class ToJsonPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ws: '',
      dataFromServer: "", // "//Your generated schema will apear here \n//view the documentation to learn more."
      store: ""
    };
  }



  onChange = (newValue) => {
    console.log("change new value", newValue);
    var obj = { action: "to-json", payload: newValue };
    // Converting JS object to JSON string.
    var json = JSON.stringify(obj);
    try {

      this.state.ws.send(json) //send data to the server
    } catch (error) {
      console.log(error) // catch error
    }

  }



  componentWillMount() {
    // document.body.classList.toggle("sidebar-icon-only");
    this.state.ws = new WebSocket("wss://echo.websocket.org")//AppUrls.toJsonWebSocket)
    this.state.ws.onopen = () => {
      // on connecting, do nothing but log it to the console
      console.log('connected')
    }

    this.state.ws.onmessage = message => {
      // listen to data sent from the websocket server
      // const message = JSON.parse(evt.data)

      // this.setState({ dataFromServer: evt.data })
      // console.log("message" + evt.data)


      const dataFromServer = JSON.parse(message.data);
      const stateToChange = {};
      if (dataFromServer.type === "userevent") {
        stateToChange.dataFromServer = Object.values(dataFromServer.data.users);
      } else if (dataFromServer.type === "contentchange") {
        stateToChange.dataFromServer = dataFromServer.data || "contentDefaultMessage";
      } else {
        stateToChange.dataFromServer = "else"; //dataFromServer.data.userActivity;

      }
      this.setState({
        ...stateToChange
      });

    }

    this.state.ws.onclose = () => {
      console.log('disconnected')

    }
  }
  componentDidMount() {
    // this.state.store = React.useContext(StoreContext)

  }



  render() {
    return (
      <div className="row" style={{ height: `99%`, width: `100%`, marginLeft: `5px`, marginRight: `2px` }}>
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
              value: this.state.store.toJsonRawSchema
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
          {/* <AceEditor
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
          /> */}
        </div>
      </div>
    );
  }
}



export default ToJsonPage;

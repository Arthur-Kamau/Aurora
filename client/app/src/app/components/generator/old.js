

// import React, { Component } from "react";
// import AceEditor from "react-ace";
// import "ace-builds/src-noconflict/mode-csharp";

// class AppGenerator extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       ws: '',
//       dataFromServer: "", 
//       };
//   }



//   onChange = (newValue) => {
//     var obj = { action: "plan", payload: newValue };
//     // Converting JS object to JSON string.
//     var json = JSON.stringify(obj);
//     try {

//       this.state.ws.send(json) //send data to the server
//     } catch (error) {
//       console.log("error"+error) // catch error
//     }

//   }
//   componentDidMount() {


//     this.state.ws = new WebSocket("wss://echo.websocket.org")
//     this.state.ws.onopen = () => {
//       // on connecting, do nothing but log it to the console
//       console.log('connected')
//     }

//     this.state.ws.onmessage = evt => {
//       // listen to data sent from the websocket server
//       // const message = JSON.parse(evt.data)

//       this.setState({ dataFromServer: evt.data })
//       console.log("message" + evt.data)
//     }

//     this.state.ws.onclose = () => {
//       console.log('disconnected')

//     }
//   }



//   render() {
//     return (
//       <div className="row" style={{ height: `99%`, width: `100%`, marginLeft: `5px`, marginRight: `2px` }}>
//         <div
//           className="col-xl-6 col-lg-6 col-sm-6"
//           style={{ margin: 0, padding: 0 }}
//         >
//             {this.editor || 
//             (this.editor = (
//           <AceEditor
//             mode="csharp"
//             theme="twilight"
//             style={{
//               width: `100%`,
//               height: `100%`,
//               padding: `0`,
//               margin: `0`
//             }}
//             onChange={this.onChange}
//             setOptions={{
//               showGutter: true,
//               enableBasicAutocompletion: true,
//               enableSnippets: true,
//               enableLiveAutocompletion: true,
//               value: this.state.rawModel
//             }}
//             name="1"
//             editorProps={{
//               $blockScrolling: true
//             }}
//           />
//           ))}
//         </div>

//         <div
//           className="col-xl-6 col-lg-6 col-sm-6"
//           style={{
//             marginLeft: `0`,
//           }}
//         >
//           <h1>{this.state.dataFromServer}</h1>

//         </div>
//       </div>
//     );
//   }
// }



// export default AppGenerator;

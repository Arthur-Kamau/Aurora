import React, { Component } from 'react';
import { Form } from "react-bootstrap";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-csharp";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-kuroir";
import "ace-builds/src-noconflict/theme-chrome";
import "ace-builds/src-noconflict/theme-twilight";

class ConnectionTool extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeColumn: 'publish'
        }
    }
    changeBodyToPublish = () => {
        this.setState({ activeColumn: 'publish' })
    }
    changeBodyToSubscribe = () => {
        this.setState({ activeColumn: 'subscribe' })
    }
    changeBodyToLogs = () => {
        this.setState({ activeColumn: 'logs' })
    }
    render() {
        var publishColumnStyle = this.state.activeColumn === "publish" ? ' flex-sm-fill text-sm-center nav-link active' : ' flex-sm-fill text-sm-center nav-link';
        var subscribeColumnStyle = this.state.activeColumn === "subscribe" ? ' flex-sm-fill text-sm-center nav-link active' : ' flex-sm-fill text-sm-center nav-link';
        var logsColumnStyle = this.state.activeColumn === "logs" ? ' flex-sm-fill text-sm-center nav-link active' : ' flex-sm-fill text-sm-center nav-link';
        return (<div className="card" >
            <div className="card-header transparent">
                <form className="form-inline">
                    <p className="mb-2 mr-4" htmlFor="inlineFormInputName2">Address</p>
                    <Form.Control type="text" className="form-control mb-2 mr-sm-2" id="inlineFormInputName2" placeholder="Jane Doe" />
                    <label className="mb-2 mr-4 ml-4" htmlFor="inlineFormInputGroupUsername2">Port</label>
                    <div className="input-group mb-2 mr-sm-2">
                        <Form.Control type="text" className="form-control" id="inlineFormInputGroupUsername2" placeholder="Username" />
                    </div>
                    <button type="submit" className="float-right btn btn-danger mb-2 ">Disconnect</button>
                </form>
            </div>
            <div className="card-body">
                <nav className="nav nav-pills flex-column flex-sm-row">
                    <div className={publishColumnStyle} onClick={this.changeBodyToPublish}>Publish</div>
                    <div className={subscribeColumnStyle} onClick={this.changeBodyToSubscribe}>Subscribe</div>
                    <div className={logsColumnStyle} onClick={this.changeBodyToLogs}>Log</div>
                </nav>
                <hr></hr>
                <br></br>
                {
                    this.state.activeColumn === "publish" ?
                        <div className="row">
                            <div className="col-md-6 col-lg-3">
                            </div>
                            <div className="col-md-8 col-lg-8">
                                <form >
                                    <Form.Group>
                                        <label htmlFor="exampleInputCity1">Topic</label>
                                        <Form.Control type="text" className="form-control" id="exampleInputCity1" placeholder="Location" />
                                    </Form.Group>
                                    <Form.Group>
                                        <label htmlFor="exampleTextarea1">Data</label>
                                        <textarea className="form-control" id="exampleTextarea1" rows="4"></textarea>
                                    </Form.Group>
                                    <button type="submit" className="btn btn-primary mr-2">Submit</button>
                                </form>
                            </div>

                        </div>
                        :
                        this.state.activeColumn === "subscribe" ?
                            <div>
                                <div className="row">
                                    <div className="col-md-3 col-lg-3">
                                        <h4>Subscrbed topics</h4>
                                        <ul class="list-group list-group-flush">
                                            <li class="list-group-item list-group-item-action  border-top  border-bottom">topics/66</li>
                                            <li class="list-group-item list-group-item-action border-top border-bottom">topics/333</li>
                                        </ul>
                                    </div>
                                    <div className="col-md-3 col-lg-3 border-left border-right">
                                    <h4>Topic  names</h4>
                                        <ul class="list-group list-group-flush">
                                            <li class="list-group-item list-group-item-action  border-top  border-bottom">Cras justo odio</li>
                                            <li class="list-group-item list-group-item-action border-top border-bottom">Dapibus ac facilisis in</li>
                                            <li class="list-group-item list-group-item-action border-top  border-bottom">Morbi leo risus</li>
                                        </ul>
                                    </div>
                                    <div className="col-md-6 col-lg-6">
                                        <h1>Message details</h1>



                                        
                                    </div>
                                </div>
                            </div>
                            :
                            <div>
                                 <h4>Logs </h4>
                                        <AceEditor

                                            mode="java"
                                            theme="twilight"
                                            style={{
                                                width: `100%`,
                                                height: `100%`,
                                                padding: `0`,
                                                margin: `0`
                                            }}
                                            // setOptions={{
                                            //     showGutter: false,
                                            //     highlightActiveLine: true,
                                            //     readOnly: false,
                                            //     value: this.props.user
                                            // }}
                                            name="2"
                                            editorProps={{
                                                $blockScrolling: true
                                            }}
                                        />
                            </div>

                }

            </div>

        </div>);
    }
}

export default ConnectionTool;
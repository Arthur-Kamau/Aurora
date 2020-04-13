import React, { Component } from 'react'
import { Form } from 'react-bootstrap';
import { store } from 'react-notifications-component';

export interface SharePageComponentProps {

}

export interface SharePageComponentState {
    localStream: string,
    sources: Array<string>
}

class SharePageComponent extends React.Component<SharePageComponentProps, SharePageComponentState> {
    constructor(props: SharePageComponentProps) {
        super(props);
        this.state = {
            localStream: '',
            sources: []
        };
    }
    shareScreen = () => {
        //         var id = ($('select').val()).replace(/window|screen/g, function(match) { return match + ":"; });
        //         onAccessApproved(id);

        store.addNotification({
            title: "Share screen!",
            message: "Share session started",
            type: "success",
            insert: "top",
            container: "top-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
                duration: 5000,
                onScreen: true
            }
        });
    } 

    nameOnChange = (e : any) => {
        console.log("name change")
    }
     componentDidMount() {
        if (navigator.userAgent.toLowerCase().indexOf(' electron/') > -1) {
            const { desktopCapturer } = window.require('electron');

            desktopCapturer.getSources({ types: ['window', 'screen'] }, (error : any, sources : any) => {
                alert("oka");
                if (error != null) {
                    alert("erro getting sources");
                }
                for (let source of sources) {
                    console.log("Name: " + source.name);
                    this.setState({ sources: [source.name, ...this.state.sources] })
                }
            });
        }
    }


    onAccessApproved = (desktop_id : any) => {
        console.log("Desktop sharing started.. desktop_id:" + desktop_id);
        // navigator.webkitGetUserMedia({
        //     audio: false,
        //     video: {
        //         mandatory: {
        //             chromeMediaSource: 'desktop',
        //             chromeMediaSourceId: desktop_id,
        //             minWidth: 1280,
        //             maxWidth: 1280,
        //             minHeight: 720,
        //             maxHeight: 720
        //         }
        //     }
        // }, this.gotStream, this.getUserMediaError);


    }
    gotStream = (stream : any) => {
        // this.state.localStream = stream;
        // document.querySelector('video').src = URL.createObjectURL(stream);
        // stream.onended = function () {

        // };
    }

    getUserMediaError = (e : any) => {
        console.log('getUserMediaError: ' + JSON.stringify(e, null, '---'));
        alert("Get user media error");
    }

    stopSharingScreen = () => {

        // if (this.state.localStream) {
        //     this.state.localStream.getTracks()[0].stop();
        // }
        // this.state.localStream = null;

        // document.querySelector('button').innerHTML = "Enable Capture";

        // $('select').empty();
        // showSources();
        // refresh();
    }
    render() {
        return (
            <div>
                <h1>Share Page</h1>

                <div className="row">
                    <div className="col-lg-0">
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-8">
                        <Form.Group>
                            <label htmlFor="exampleInputName1">Your sharing id</label>
                            <Form.Control disabled type="text" onChange={this.nameOnChange} className="form-control" id="exampleInputName1" placeholder="Name" />
                        </Form.Group>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-2 mt-4">

                        <i className="mdi   mdi-content-copy icon-sm text-info"></i>
                    </div>
                </div>
                <div>
                    {this.state.sources == null || this.state.sources.length == 0 ?
                        <div></div> :
                        <div>
                            <ul className="list-group list-group-flush">
                                {this.state.sources.map((item, index) =>
                                    <li className="list-group-item">{item}</li>
                                )}

                            </ul>
                        </div>
                    }
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <div className="form-check">
                            <label className="form-check-label">
                                <input type="checkbox" defaultChecked className="form-check-input" />
                                <i className="input-helper"></i>
                Share screen
            </label>
                        </div>
                    </li>

                    <li className="list-group-item">
                        <div className="form-check">
                            <label className="form-check-label">
                                <input type="checkbox" defaultChecked className="form-check-input" />
                                <i className="input-helper"></i>
                share editor
            </label>
                        </div></li>
                </ul>
                <div className="align-content-lg-end">
                    <div >
                        <p id="message"></p>
                        <button
                            className="btn btn-success btn-md"
                            onClick={this.shareScreen}
                        >
                            Share
                        </button>
              &nbsp;
                         <button
                            className="btn btn-danger btn-md"
                            onClick={this.stopSharingScreen}
                        >
                            Stop sharing
                         </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default SharePageComponent;
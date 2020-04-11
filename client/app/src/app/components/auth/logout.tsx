import * as React from 'react';
import { Component } from 'react';
import AppUrls from "../../../url/url";

export interface LogoutPageProps {

}

export interface LogoutPageState {

}

class LogoutPage extends React.Component<LogoutPageProps, LogoutPageState> {
    constructor(props: LogoutPageProps) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        localStorage.clear();
    }
    openHomePage = (e : any ) => {
        e.preventDefault();
        window.location.reload(false);
        window.location.href = AppUrls.generatorPage
    }

    render() {
        return (
            <form className="container card ml-auto mt-5" style={{ maxWidth: `400px` }}>
                <br></br>
                <br></br>
                <h4 className="text-center mb-2">Aurora App</h4>
                <small className="text-center">Logout</small>

                <hr></hr>

                <div className="form-group text-center ">
                    <label>You have been logged out.</label>
                </div>
                <div className="float-center">
                    <button className=" btn btn-lg btn-primary btn-block float-center  " style={{ width: `200px`, alignSelf: `center` }} onClick={this.openHomePage}>
                        <i className="mdi mdi-home"></i>
                        <span>Home</span>
                    </button>
                </div>
                <br></br>
            </form>

        );
    }
}

export default LogoutPage;
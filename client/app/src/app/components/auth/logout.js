import React, { Component } from 'react';
import AppUrls from "../../../url/url";
class LogoutPage extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        localStorage.clear();
    }
    openHomePage = (e)=>{
        e.preventDefault();
        window.location.reload(false);
        window.location = AppUrls.generatorPage 
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
                <button className=" btn btn-lg btn-primary btn-block float-center  " style={{ width: `200px`, alignSelf: `center`}} onClick={this.openHomePage}>
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
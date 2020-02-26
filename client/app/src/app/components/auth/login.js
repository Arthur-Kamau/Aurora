import React, { Component } from 'react';
import {
    GoogleLoginButton,
    GithubLoginButton,
} from "react-social-login-buttons";

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    handleGithubClick = () => {
        alert("Hello!");
    }
    handleGooglehubClick = () => {
        alert("Hello!");
    }
    render() {
        return (

            <div className=" align-items-center mt-5 ">
                <form className="container card ml-auto" style={{ maxWidth: `400px` }}>
                    <br></br>
                    <br></br>
                    <h4 className="text-center mb-2">Aurora App</h4>
                    <small className="text-center">Sign In</small>

                    <hr></hr>

                    <div className="form-group ">
                        <label>Email address</label>
                        <input type="email" className="form-control" placeholder="Enter email" />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Enter password" />
                    </div>

                    <div className="form-group">
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="customCheck1" />
                            <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                        </div>
                    </div>

                    <div className="align-self-center" >
                        <button type="submit" className=" btn btn-primary btn-block" style={{ width: `200px` }} >Submit</button>
                    </div>

                    <p className="forgot-password text-right mt-3">
                        Forgot <a href="/forgot-password">password?</a>
                    </p>
                </form>

                <div className=" align-items-center mt-3 ">

                    <div className="container card ml-auto" style={{ maxWidth: `700px` }}>

                        <div className="row">
                            <div className="col-md-6">
                                <GoogleLoginButton onClick={this.handleGooglehubClick} />
                            </div>
                            <div className="col-md-6"><GithubLoginButton onClick={this.handleGithubClick} /></div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default LoginPage;
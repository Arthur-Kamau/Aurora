import React, { Component } from 'react'
import {
    GoogleLoginButton,
    GithubLoginButton,
} from "react-social-login-buttons";


export interface RegisterPageProps {

}

export interface RegisterPageState {

}

class RegisterPage extends React.Component<RegisterPageProps, RegisterPageState> {
    constructor(props: RegisterPageProps) {
        super(props);
        this.state = {};
    }
    render() {
        return (<div className=" align-items-center mt-5 ">

            <form className="container card ml-auto" style={{ maxWidth: `400px` }}>
                <h4 className="text-center mb-2 mt-1">Aurora App</h4>
                <small className="text-center">Sign Up</small>

                <hr></hr>

                <div className="form-group">
                    <label>Name</label>
                    <input type="text" className="form-control" placeholder="First name" />
                </div>

                <div className="form-group">
                    <label>Country</label>
                    <input type="text" className="form-control" placeholder="Last name" />
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" />
                </div>

                {/* <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" placeholder="Enter password" />
            </div> */}

                {/* <div className="form-group">
                <label>Confirm Password</label>
                <input type="password" className="form-control" placeholder="Enter password" />
            </div> */}
                <div className="align-self-center" >
                    <button type="submit" className="btn btn-primary btn-block" style={{ width: `200px` }}>Sign Up</button>
                </div>

                <p className="forgot-password text-right mt-3">
                    Already registered <a href="/login">sign in?</a>
                </p>
            </form>
            {/* <div className=" align-items-center mt-3 ">

            <div className="container card ml-auto" style={{ maxWidth: `700px` }}>

                <div className="row">
                    <div className="col-md-6">
                        <GoogleLoginButton onClick={this.handleGooglehubClick} text={'Register with Google'} />
                    </div>
                    <div className="col-md-6"><GithubLoginButton onClick={this.handleGithubClick} text={'Register with Github'} /></div>
                </div>
            </div>
        </div> */}
        </div>);
    }
}

export default RegisterPage;
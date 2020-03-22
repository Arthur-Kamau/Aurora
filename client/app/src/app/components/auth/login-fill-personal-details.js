import React, { Component } from 'react';
import {
    GoogleLoginButton,
    GithubLoginButton,
} from "react-social-login-buttons";
import AppUrls from "../../../url/url";
import AppResponseStatus from "../../../url/app_responses";
import axios from 'axios';

class LoginFillPersonalDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            name: '',
            location: ''
        }
    }

    componentDidMount() {
var mail = window.localStorage.getItem("email");
this.setState({email: mail});

    }


    submitUserData = (e)=>{ 

        e.preventDefault();

        this.setState({ isSendingEmail: true });
        axios.post(AppUrls.loginPostProfileDetails, {
            email: this.state.email
        }).then((response) => {


            let decodedData = response.data;

            console.log("response data " + decodedData.status);
            if (decodedData.status === AppResponseStatus.okResponse) {
               
                window.location = AppUrls.generatorPage;// load  "/generator";
            } else {
                alert("erro response");
            }

        }).catch((erros) => {
            alert("error , try again");
            this.setState({ isSendingEmail: false });
            console.log("Error " + erros);
        });


    }


    render() {
        return (<div className=" align-items-center mt-5 " >

            <form className="container card ml-auto" style={{ maxWidth: `450px` }}>
                <h4 className="text-center mb-2 mt-1">Aurora App</h4>
                <small className="text-center">User Profile</small>

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
                    <input type="email" disabled value={this.state.email} className="form-control" placeholder="Enter email" />
                </div>

                <div className="align-self-center" >
                    <button onClick={this.submitUserData} type="submit" className="btn btn-primary btn-block" style={{ width: `200px` }}>Load App</button>
                </div>
<br></br>
            </form>
        </div>);
    }
}

export default LoginFillPersonalDetails;
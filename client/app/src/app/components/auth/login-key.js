import React, { Component } from 'react';
import AppUrls from "../../../url/url";
import AppResponseStatus from "../../../url/app_responses"; 
import axios from 'axios';

class LoginKey extends Component {
    constructor(props) {
        super(props);
        this.state = { loginKey: '', email : '' }
    }
    
    componentDidMount(){  
           let email = window.localStorage.getItem('email');
            if(email ==null || email.length == 0){
                window.location= AppUrls.loginPage}else{}} changeLoginKey = (event) => {

        console.log("loginKey " + event.target.value);
        this.setState({ loginKey: event.target.value })
    }
     submitLoginKey = (e) => {
        e.preventDefault();


        axios.post(AppUrls.loginKeyPost, {
            email: this.state.email,
            key : this.state.loginKey
        }).then((response) => {

            let decodedData = response.data;
            if (decodedData.status === AppResponseStatus.okResponse) {
          window.location = "";
          window.localStorage.setItem("aurora_key",decodedData.data);
            } else if (decodedData.status === AppResponseStatus.emailNotExistInDatabase) {
               

            } else { alert("erro response"); }

        });
    }
    render() {
        return (<form className="container card ml-auto" style={{ maxWidth: `400px` }}>
            <br></br>
            <br></br>
            <h4 className="text-center mb-2">Aurora App</h4>
            <small className="text-center">Login Confirm</small>

            <hr></hr>

            <div className="form-group ">
                <label>Login Key</label>
                <input type="email" onChange={this.changeLoginKey} className="form-control" placeholder="Enter email" />
            </div>


            <div className="align-self-center" >
                <button type="submit" className=" btn btn-lg btn-primary btn-block" style={{ width: `200px` }} onClick={this.submitLoginKey} >Submit</button>
            </div>

            <br></br>
        </form>
        );
    }
}

export default LoginKey;
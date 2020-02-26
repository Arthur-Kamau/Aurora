import React, { Component } from 'react';
class ForgotPasswordKeyPage extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( <div className=" align-items-center mt-5 ">
        <form className="container card ml-auto" style={{ maxWidth: `400px` }}>
            <br></br>
            <br></br>
            <h4 className="text-center mb-2">Aurora App</h4>
            <small className="text-center">Forgot password key </small>

            <hr></hr>

            <div className="form-group ">
                <label>Email address</label>
                <input type="email" className="form-control" placeholder="Enter email" />
            </div>

            <div className="form-group">
                <label>Key (sent to you email)</label>
                <input type="password" className="form-control" placeholder="Enter password" />
            </div>


            <div className="align-self-center" >
                <button type="submit" className=" btn btn-primary btn-block" style={{ width: `200px` }} >Submit</button>
            </div>

            <p className="forgot-password text-right mt-3">
                 <a href="/login">login?</a>
            </p>
        </form> </div> );
    }
}
 
export default ForgotPasswordKeyPage;
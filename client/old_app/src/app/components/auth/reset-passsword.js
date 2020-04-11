import React, { Component } from 'react';
class ResetPasswordPage extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (  
        <div className=" align-items-center mt-5 ">
        <form className="container card ml-auto" style={{ maxWidth: `400px` }}>
            <br></br>
            <br></br>
            <h4 className="text-center mb-2">Aurora App</h4>
            <small className="text-center">Reset Password  </small>

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
                <label>Password confirm</label>
                <input type="password" className="form-control" placeholder="Enter password" />
            </div>
            <div className="align-self-center" >
                <button type="submit" className=" btn btn-primary btn-block" style={{ width: `200px` }} >Submit</button>
            </div>

           <br></br>
        </form> </div>  );
    }
}
 
export default ResetPasswordPage;
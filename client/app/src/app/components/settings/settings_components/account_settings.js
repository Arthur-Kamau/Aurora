import React, { Component } from "react";
import { connect } from 'react-redux';
import updateUser  from '../../../../actions/user_actions';


class AccountSettings extends Component {
  constructor(props) {
    super(props);
    console.log("AccountSettings  "+ props);
    this.state = {
      imageStatus: ''
    };
  }
  handleImageLoaded = () => {
    this.setState({ imageStatus: "loaded" });
  }

  logOutUser = () => {
    window.location = "/logout"
  }
  handleImageErrored= () => {
    this.setState({ imageStatus: "failed to load" });
  }
  //   mx-auto
  render() {
    return (
      <div className="container">
        <div className="row">
          <img
            src={this.props.profile.userAvatar == null || this.props.profile.userAvatar.length == 0 ? 'https://getdrawings.com/free-icon/create-account-icon-52.png' : this.props.profile.userAvatar }
          //   onLoad={this.handleImageLoaded}
          // onError={this.handleImageErrored}
            className="img-circle  col-lg-4  col-md-4 col-sm-4"
            alt="avatar"
          ></img>
          <div className="col-lg-6 col-md-4 col-sm-4 ">
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Name: {this.props.profile.name}</li>
              <li className="list-group-item">Email:{this.props.profile.email}</li>
              <li className="list-group-item">Location: {this.props.profile.location}</li>
            </ul>
          </div>

          <div className="align-content-lg-end">
          <div >
            <p id="message"></p>
            <button
              className="btn btn-success btn-md"
              onClick={this.logOutUser}
            >
              Logout
            </button>
            &nbsp;

          </div>
        </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state =>({
   profile : state.userProfile
});

const mapActionsToProps = {
onUpdateUser : updateUser
};

export default connect(mapStateToProps,mapActionsToProps)(AccountSettings);

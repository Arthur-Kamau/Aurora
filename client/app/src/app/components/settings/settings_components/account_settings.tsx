
import * as React from 'react';
import { Component } from 'react';
import auroraAppStore from '../../../../store/AuroraStore';
import { UserProfile } from '../../../../models/profile';

export interface AccountSettingsProps {

}

export interface AccountSettingsState {
  imageStatus: string,
  // profile : string
  userProfile: UserProfile;
}

class AccountSettings extends React.Component<AccountSettingsProps, AccountSettingsState> {
  constructor(props: AccountSettingsProps) {
    super(props);
    this.state = {
      imageStatus: '',
      //  profile:''
      userProfile: {
        userId : '',
        name: 'name',
        email: 'email',
        country: 'location',
        phoneNumber : 0,
        userAvatar: 'https://picsum.photos/536/354',

      }
    };
  }
  componentDidMount() {
    // var prof =  JSON.parse(window.localStorage.getItem('prof'));
    // var sett = window.localStorage.getItem('sett');

    // console.error("prof "+prof);
    // console.error("prof "+prof.name);
    // console.error("sett "+sett);

    let prof = auroraAppStore.getUserProfile();
    this.setState({ userProfile: prof! });
    // this.setState({sett : sett});

    // this.setState({profile:JSON.parse(this.props.profile)})
  }
  handleImageLoaded = () => {
    this.setState({ imageStatus: "loaded" });
  }

  logOutUser = () => {
    window.location.href = "/logout"
  }
  handleImageErrored = () => {
    this.setState({ imageStatus: "failed to load" });
  }

  render() {
    return (

      <div className="container">
        <div className="row">
          <img
            src={this.state.userProfile.userAvatar == null || this.state.userProfile.userAvatar.length == 0 ? 'https://getdrawings.com/free-icon/create-account-icon-52.png' : this.state.userProfile.userAvatar}
            //   onLoad={this.handleImageLoaded}
            // onError={this.handleImageErrored}
            className="img-circle  col-lg-4  col-md-4 col-sm-4"
            alt="avatar"
          ></img>
          <div className="col-lg-6 col-md-4 col-sm-4 ">
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Name: {this.state.userProfile.name}</li>
              <li className="list-group-item">Email:{this.state.userProfile.email}</li>
              <li className="list-group-item">Location: {this.state.userProfile.country}</li>


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

export default AccountSettings;
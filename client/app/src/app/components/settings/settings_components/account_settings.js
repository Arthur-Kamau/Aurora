import React, { Component } from "react";

class AccountSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  //   mx-auto
  render() {
    return (
      <div className="container">
        <div className="row">
          <img
            src="https://picsum.photos/536/354"
            class="img-circle  col-lg-4  col-md-4 col-sm-4"
            alt="avatar"
          ></img>
          <div className="col-lg-6 col-md-4 col-sm-4 ">
            <ul class="list-group list-group-flush">
              <li class="list-group-item">Name: Cras justo odio</li>
              <li class="list-group-item">Email: Dapibus ac facilisis in</li>
              <li class="list-group-item">Location: Morbi leo risus</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default AccountSettings;

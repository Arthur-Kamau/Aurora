import React, { Component } from 'react';


class UserBilling extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (<div>
            
            <ul class="list-group list-group-flush">
          <li class="list-group-item"><h3>Billing </h3></li>
          <li class="list-group-item">Account balance: 100 </li>
          <li class="list-group-item">User Plan : Free </li>
          <li class="list-group-item">Current expense: 20</li>
        </ul>
        </div>);
    }
}

export default UserBilling;
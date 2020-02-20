import React, { Component } from 'react'
import { Tabs, Tab } from "react-bootstrap";
export class BlankPage extends Component {
  render() {
    return (
      <div>
        <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
  <Tab eventKey="home" title="Home">
    <h1 >Home</h1>
  </Tab>
  <Tab eventKey="profile" title="Profile">
  <h1 >profile</h1>
  </Tab>
  <Tab eventKey="contact" title="Contact" disabled>
  <h1 >contact</h1>
  </Tab>
</Tabs>
      </div>
    )
  }
}

export default BlankPage

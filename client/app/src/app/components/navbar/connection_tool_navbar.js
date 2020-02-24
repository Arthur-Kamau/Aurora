import React, { Component } from 'react';
import Modal from 'react-modal';
class ConnectionToolAppBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    // this.subtitle.style.color = '#f00';
  }

  createThenCloseModal() { this.setState({ modalIsOpen: false }); }
  closeModal() {
    this.setState({ modalIsOpen: false });
  }


  render() {


    const customStyles = { height: `200px`, width:`200px`,
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
      }
    };

    return (<nav className="navbar col-lg-12 col-12 p-lg-0 fixed-top d-flex flex-row">
      <div className="navbar-menu-wrapper d-flex align-items-center justify-content-between">
        {/* <a className="navbar-brand brand-logo-mini align-self-center d-lg-none" href="!#" onClick={evt =>evt.preventDefault()}><img src={require("../../assets/images/logo-mini.svg")} alt="logo" /></a> */}
        {/* <ul className="navbar-nav navbar-nav-left header-links">
             <li className="nav-item d-none d-md-flex"> */}
        <h4>
          Connection Tool
            </h4>
        {/* </li>
          </ul> */}
        <ul className="navbar-nav navbar-nav-right ml-lg-auto">

          <button type="submit" className="btn btn-success mb-2  btn-sm " onClick={this.openModal}>
            <i className="mdi mdi-clipboard-plus menu-icon"></i>
            create Connection
          </button>


          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >

              <div class="card-body">
                <div className="card-title  ">
                  <div className="row">
                    <div className="col-lg-6">
                      Create a connection
                    </div>
                  </div>

                </div>

                <p class="card-text">Quick sample text to create the card title and make up the body of the card's content.</p>
                <div className="card-footer  bg-transparent"> <button type="button" onClick={this.createThenCloseModal} class="btn btn-success">Create</button>
                  &emsp; <button onClick={this.closeModal} type="button" class="btn btn-danger">Close</button></div>
            </div>

          </Modal>

        </ul>
      </div>
    </nav>);
  }
}

export default ConnectionToolAppBar;
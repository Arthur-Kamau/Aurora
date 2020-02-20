import React, { Component } from "react";
import { Line, Doughnut, Bar } from "react-chartjs-2";
import { Sparklines, SparklinesBars } from "react-sparklines";
import { ProgressBar, Dropdown } from "react-bootstrap";

// import DatePicker from 'react-datepicker';
// import { Dropdown } from 'react-bootstrap';

export class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      todos: [
        {
          id: 1,
          task: "Pick up kids from school",
          isCompleted: false
        },
        {
          id: 2,
          task: "Prepare for presentation",
          isCompleted: false
        }
      ],
      inputValue: ""
    };
    this.statusChangedHandler = this.statusChangedHandler.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
    this.inputChangeHandler = this.inputChangeHandler.bind(this);
  }
  statusChangedHandler(event, id) {
    const todo = { ...this.state.todos[id] };
    todo.isCompleted = event.target.checked;

    const todos = [...this.state.todos];
    todos[id] = todo;

    this.setState({
      todos: todos
    });
  }

  addTodo(event) {
    event.preventDefault();

    const todos = [...this.state.todos];
    todos.unshift({
      id: todos.length ? todos[todos.length - 1].id + 1 : 1,
      task: this.state.inputValue,
      isCompleted: false
    });

    this.setState({
      todos: todos,
      inputValue: ""
    });
  }

  removeTodo(index) {
    const todos = [...this.state.todos];
    todos.splice(index, 1);

    this.setState({
      todos: todos
    });
  }

  inputChangeHandler(event) {
    this.setState({
      inputValue: event.target.value
    });
  }

  areaOptions = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      yAxes: [
        {
          gridLines: {
            color: "#F2F6F9"
          },
          ticks: {
            beginAtZero: true,
            min: 0,
            max: 20,
            stepSize: 5
          }
        }
      ],
      xAxes: [
        {
          gridLines: {
            color: "#F2F6F9"
          },
          ticks: {
            beginAtZero: true
          }
        }
      ]
    },
    legend: {
      display: false
    },
    elements: {
      point: {
        radius: 2
      }
    },
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      }
    },
    stepsize: 1
  };
  usersDoughnutChartData = {
    datasets: [
      {
        data: [80, 34, 100],
        backgroundColor: ["#19d895", "#2196f3", "#dde4eb"],
        borderColor: ["#19d895", "#2196f3", "#dde4eb"]
      }
    ],
    labels: ["Request", "Email"]
  };

  toggleProBanner() {
    document.querySelector(".proBanner").classList.toggle("hide");
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-xl-5 col-lg-4 col-sm-6  grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Recent Activity</h4>

                <div className="list-wrapper">
                  <ul className="d-flex flex-column todo-list todo-padding-lg">
                    <div>
                      <ListItem>To json shcema</ListItem>
                    </div>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-7 col-lg-8 col-sm-8 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <div className="card-title row">
                  <div className="col-xl-10 col-lg-10 col-sm-8">
                    <h4>Schedules</h4>
                  </div>
                  <div  className="col-xl-2 col-lg-2 col-sm-2  btn btn-success btn-sm ">
                    create
                  </div>
                </div>
                <div className="shedule-list d-xl-flex align-items-center justify-content-between mb-3">
                  <h3>27 Sep 2018</h3>
                  <small>21 Events</small>
                </div>
                <div className="event border-bottom py-3">
                  <p className="mb-2 font-weight-medium">
                    Skype call with alex
                  </p>
                  <div className="d-flex align-items-center">
                    <div className="badge badge-success">3:45 AM</div>
                    <small className="text-muted ml-2">London, UK</small>
                    <div className="image-grouped ml-auto mt-2 mt-xl-0">
                      <img
                        src={require("../../assets/images/faces/face10.jpg")}
                        alt="profile"
                      />
                      <img
                        src={require("../../assets/images/faces/face13.jpg")}
                        alt="profile"
                      />{" "}
                    </div>
                  </div>
                </div>
                <div className="event py-3 border-bottom">
                  <p className="mb-2 font-weight-medium">
                    Data Analysing with team
                  </p>
                  <div className="d-flex  align-items-center">
                    <div className="badge badge-warning">12.30 AM</div>
                    <small className="text-muted ml-2">San Francisco, CA</small>
                    <div className="image-grouped ml-auto mt-2 mt-xl-0">
                      <img
                        src={require("../../assets/images/faces/face20.jpg")}
                        alt="profile "
                      />
                      <img
                        src={require("../../assets/images/faces/face17.jpg")}
                        alt="profile "
                      />
                      <img
                        src={require("../../assets/images/faces/face14.jpg")}
                        alt="profile "
                      />{" "}
                    </div>
                  </div>
                </div>
                <div className="event py-3">
                  <p className="mb-2 font-weight-medium">Meeting with client</p>
                  <div className="d-flex  align-items-center">
                    <div className="badge badge-danger">4.15 AM</div>
                    <small className="text-muted ml-2">San Diego, CA</small>
                    <div className="image-grouped ml-auto mt-2 mt-xl-0">
                      <img
                        src={require("../../assets/images/faces/face21.jpg")}
                        alt="profile"
                      />
                      <img
                        src={require("../../assets/images/faces/face16.jpg")}
                        alt="profile"
                      />{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title mb-4">Manage Tickets</h5>
                <div className="fluid-container">
                  <div className="row ticket-card mt-3 pb-2 border-bottom pb-3 mb-3">
                    <div className="col-md-1">
                      <img
                        className="img-sm rounded-circle mb-4 mb-md-0 d-block mx-md-auto"
                        src={require("../../assets/images/faces/face1.jpg")}
                        alt="profile"
                      />{" "}
                    </div>
                    <div className="ticket-details col-md-9">
                      <div className="d-lg-flex">
                        <p className="text-dark font-weight-semibold mr-2 mb-0 no-wrap">
                          James :
                        </p>
                        <p className="text-primary mr-1 mb-0">[#23047]</p>
                        <p className="mb-0 ellipsis">
                          Donec rutrum congue leo eget malesuada.
                        </p>
                      </div>
                      <p className="text-gray ellipsis mb-2">
                        Donec rutrum congue leo eget malesuada. Quisque velit
                        nisi, pretium ut lacinia in, elementum id enim vivamus.{" "}
                      </p>
                      <div className="row text-gray d-md-flex d-none">
                        <div className="col-4 d-flex">
                          <small className="mb-0 mr-2 text-muted text-muted">
                            Last responded :
                          </small>
                          <small className="Last-responded mr-2 mb-0 text-muted text-muted">
                            3 hours ago
                          </small>
                        </div>
                        <div className="col-4 d-flex">
                          <small className="mb-0 mr-2 text-muted text-muted">
                            Due in :
                          </small>
                          <small className="Last-responded mr-2 mb-0 text-muted text-muted">
                            2 Days
                          </small>
                        </div>
                      </div>
                    </div>
                    <div className="ticket-actions col-md-2">
                      <div className="btn-group dropdown">
                        <Dropdown>
                          <Dropdown.Toggle className="btn btn-success btn-sm">
                            Manage
                          </Dropdown.Toggle>
                          <Dropdown.Menu className="navbar-dropdown preview-list">
                            <Dropdown.Item>Quick reply</Dropdown.Item>
                            <Dropdown.Item>Another action</Dropdown.Item>
                            <Dropdown.Item>Resolve Issue</Dropdown.Item>
                            <Dropdown.Item>Close Issue</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </div>
                  </div>
                  <div className="row ticket-card mt-3 pb-2 border-bottom pb-3 mb-3">
                    <div className="col-md-1">
                      <img
                        className="img-sm rounded-circle mb-4 mb-md-0 d-block mx-md-auto"
                        src={require("../../assets/images/faces/face2.jpg")}
                        alt="profile"
                      />{" "}
                    </div>
                    <div className="ticket-details col-md-9">
                      <div className="d-lg-flex">
                        <p className="text-dark font-weight-semibold mr-2 mb-0 no-wrap">
                          Stella :
                        </p>
                        <p className="text-primary mr-1 mb-0">[#23135]</p>
                        <p className="mb-0 ellipsis">
                          Curabitur aliquet quam id dui posuere blandit.
                        </p>
                      </div>
                      <p className="text-gray ellipsis mb-2">
                        Pellentesque in ipsum id orci porta dapibus. Sed
                        porttitor lectus nibh. Curabitur non nulla sit amet
                        nisl.{" "}
                      </p>
                      <div className="row text-gray d-md-flex d-none">
                        <div className="col-4 d-flex">
                          <small className="mb-0 mr-2 text-muted">
                            Last responded :
                          </small>
                          <small className="Last-responded mr-2 mb-0 text-muted">
                            3 hours ago
                          </small>
                        </div>
                        <div className="col-4 d-flex">
                          <small className="mb-0 mr-2 text-muted">
                            Due in :
                          </small>
                          <small className="Last-responded mr-2 mb-0 text-muted">
                            2 Days
                          </small>
                        </div>
                      </div>
                    </div>
                    <div className="ticket-actions col-md-2">
                      <div className="btn-group dropdown">
                        <Dropdown>
                          <Dropdown.Toggle className="btn btn-success btn-sm">
                            Manage
                          </Dropdown.Toggle>
                          <Dropdown.Menu className="navbar-dropdown preview-list">
                            <Dropdown.Item>Quick reply</Dropdown.Item>
                            <Dropdown.Item>Another action</Dropdown.Item>
                            <Dropdown.Item>Resolve Issue</Dropdown.Item>
                            <Dropdown.Item>Close Issue</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </div>
                  </div>
                  <div className="row ticket-card mt-3">
                    <div className="col-md-1">
                      <img
                        className="img-sm rounded-circle mb-4 mb-md-0 d-block mx-md-auto"
                        src={require("../../assets/images/faces/face3.jpg")}
                        alt="profile"
                      />{" "}
                    </div>
                    <div className="ticket-details col-md-9">
                      <div className="d-lg-flex">
                        <p className="text-dark font-weight-semibold mr-2 mb-0 no-wrap">
                          John Doe :
                        </p>
                        <p className="text-primary mr-1 mb-0">[#23246]</p>
                        <p className="mb-0 ellipsis">
                          Mauris blandit aliquet elit, eget tincidunt nibh
                          pulvinar.
                        </p>
                      </div>
                      <p className="text-gray ellipsis mb-2">
                        Nulla quis lorem ut libero malesuada feugiat. Proin eget
                        tortor risus. Lorem ipsum dolor sit amet.
                      </p>
                      <div className="row text-gray d-md-flex d-none">
                        <div className="col-4 d-flex">
                          <small className="mb-0 mr-2 text-muted">
                            Last responded :
                          </small>
                          <small className="Last-responded mr-2 mb-0 text-muted">
                            3 hours ago
                          </small>
                        </div>
                        <div className="col-4 d-flex">
                          <small className="mb-0 mr-2 text-muted">
                            Due in :
                          </small>
                          <small className="Last-responded mr-2 mb-0 text-muted">
                            2 Days
                          </small>
                        </div>
                      </div>
                    </div>
                    <div className="ticket-actions col-md-2">
                      <div className="btn-group dropdown">
                        <Dropdown>
                          <Dropdown.Toggle className="btn btn-success dropdown-toggle btn-sm">
                            Manage
                          </Dropdown.Toggle>
                          <Dropdown.Menu className="navbar-dropdown preview-list">
                            <Dropdown.Item>Quick reply</Dropdown.Item>
                            <Dropdown.Item>Another action</Dropdown.Item>
                            <Dropdown.Item>Resolve Issue</Dropdown.Item>
                            <Dropdown.Item>Close Issue</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const ListItem = props => {
  return (
    <li className={props.isCompleted ? "completed" : null}>
      <div className="form-check form-check-success m-0 align-items-start">
        <label htmlFor="" className="form-check-label font-weight-medium">
          <input
            className="checkbox"
            type="checkbox"
            checked={props.isCompleted}
            onChange={props.changed}
          />{" "}
          {props.children} <i className="input-helper"></i>
        </label>
      </div>
      <i
        className="remove mdi mdi-close-circle-outline"
        onClick={props.remove}
      ></i>
    </li>
  );
};
export default Dashboard;

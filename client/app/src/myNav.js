import React from "react";
import "./style.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav } from 'react-bootstrap';

import Registration from './Registration'
import Login from './Login'
import Logout from './Logout'
import MyProfile from './MyProfile'
import Home from './Home'
import Users from './Users'


export default class myNav extends React.Component {
// export default function myNav() {
    constructor(props) {
      super(props);

      this.state = {
          userLogin: "",

      };

      this.handleLogin = this.handleLogin.bind(this );
  }

  handleLogin(userLogin) {
    this.setState({
      userLogin: userLogin
    })
    this.props.onLogin(userLogin);
  }

  render() {
    console.log("Login from myNav.js :", this.state.userLogin);
    return (
      <Router>
        <div>
          <Navbar bg="dark" variant="dark" className="myNav">
              <Navbar.Brand href="/">Blog from {this.state.userLogin}</Navbar.Brand>
              <Nav className="mr-auto">
                  <Nav.Link href="/home">Home</Nav.Link>
                  <Nav.Link href="/login">Login</Nav.Link>
                  <Nav.Link href="/registration">Register</Nav.Link>
                  <Nav.Link href="/logout">Logout as </Nav.Link>
                  <Nav.Link href="/myprofile">My profile</Nav.Link>
                  <Nav.Link href="/users"> Follolos</Nav.Link> 
                  
              </Nav>
          </Navbar>

          <Switch>
              
              <Route path="/login">
                
                <Login onLogin={this.handleLogin}/>
              </Route>

              <Route path="/registration">
                <Registrationfunc />
              </Route>
              
              <Route path="/logout">
                <Logoutfunc />
              </Route>

              <Route path="/myprofile">
                
                <MyProfilefunc />
              </Route>

              <Route path="/home">
                <Homefunc />
              </Route>

              <Route path="/users">
                <Usersfunc />
              </Route> */
              
          </Switch>
        </div>
      </Router>
    );
  }
}


function Homefunc() {
  return <Home />
  
}

// export default class Loginfunc extends React.Component {
// function Loginfunc() {
//     return <Login onLogin={}/>
// }

function Registrationfunc() {
  return <Registration />
}

function Logoutfunc() {
  return <Logout />
  // à compléter
}

function MyProfilefunc() {
  return <MyProfile />
}

function Usersfunc() {
  return <Users />
}



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



export default function myNav() {
  return (
    <Router>
      <div>
        <Navbar bg="dark" variant="dark" className="myNav">
            <Navbar.Brand href="/">Myblog</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="/home">Home</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/registration">Register</Nav.Link>
                <Nav.Link href="/logout">Logout as UserLogin</Nav.Link>
                <Nav.Link href="/myprofile">My profile</Nav.Link>
                {/* <Nav.Link href="/test"> *Test</Nav.Link> */}
                
            </Nav>
        </Navbar>

        <Switch>
            
            <Route path="/login">
              
              <Loginfunc />
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

            {/* <Route path="/test">
              <Testfunc />
            </Route> */}
            
        </Switch>
      </div>
    </Router>
  );
}

function Homefunc() {
  return <Home />
  
}

function Loginfunc() {
    return <Login />
}

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

// function Testfunc() {
//   return <Test />
// }



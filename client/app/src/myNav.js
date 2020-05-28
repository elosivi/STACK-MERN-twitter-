import React from "react";
import "./style.css";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    // Link
} from "react-router-dom";

import { Redirect } from "react-router-dom";



import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Row, Col } from 'react-bootstrap';

import { BsHouseDoorFill,BsPeopleFill, BsPersonBoundingBox   } from 'react-icons/bs';
import {IoMdLogOut } from 'react-icons/io';
import { FaBlog } from 'react-icons/fa';



import Registration from './Registration'
import Login from './Login'
import Logout from './Logout'
import MyProfile from './MyProfile'
import Home from './Home'
import UsersView from './UsersView'
import Hashtag from './Hashtag'


// function URLhashtag(props) {
//     console.log("----> props.match.params.hashtag" +props.match.params.hashtag);
//   }


export default class myNav extends React.Component {
    constructor(props) {
        super(props);

        let loginInformations = {
            login: "DEFAULT_USER",
            loginStatus: "NOT_LOGGED_IN",
        };

        if (localStorage.getItem("loginInformations")) {
            loginInformations =
            JSON.parse(localStorage.getItem("loginInformations"));
        }

        this.state = {
            login: loginInformations.login,
            loginStatus: loginInformations.loginStatus,

        };

        this.handleOnLogin = this.handleOnLogin.bind(this);
        this.handleOnLogout = this.handleOnLogout.bind(this);
        this.handleOnUpdate = this.handleOnUpdate.bind(this);
    }

    handleOnLogin() {
        this.updateLoginInformations();
    }

    handleOnLogout() {
        this.updateLoginInformations();
    }

    handleOnUpdate() {
        this.updateLoginInformations();
    }

    updateLoginInformations() {
        let loginInformations = {
            login: "unknown user",
            loginStatus: "NOT_LOGGED_IN"
        }
        if (localStorage.getItem("loginInformations")) {
            loginInformations =
                JSON.parse(localStorage.getItem("loginInformations"));
        }
        this.setState({
            login: loginInformations.login,
            loginStatus: loginInformations.loginStatus,
        });
        console.log("===== LOGIN INFOS UPDATED");
    }

    render() {

        const loggedIn = (this.state.loginStatus === "LOGGED_IN");
        const redirToLogin = <Redirect to='/login' />;

        return (
            <Router>
              
                <div>
                 
                  <Row>
                    <Col xs={2}> 
                        
                        <Navbar bg="dark" variant="dark" className="flex-column">
                            <div className="topNav flex-column">
                                <Navbar.Brand className="Logo" href="/home" title="The best network never created !"><FaBlog /></Navbar.Brand>
                                <br></br>
                            
                                    {
                                        loggedIn ?
                                            <Navbar.Brand href="/home" title ="Hello you !">{this.state.login}</Navbar.Brand> :
                                            <Navbar.Brand href="/home" title="Hello visitor, join us!">Blog</Navbar.Brand>
                                    }
                            </div>
                            <Nav className="mr-auto" className="flex-column">
                                <Nav.Link href="/home" title="home"><BsHouseDoorFill /></Nav.Link>
                                {
                                    loggedIn ?
                                        <Nav.Link href="/logout" title="logout"><IoMdLogOut/></Nav.Link> :
                                        <Nav.Link href="/login">Login</Nav.Link>
                                }
                                <Nav.Link href="/registration">Register</Nav.Link>
                                <Nav.Link href="/myprofile" title="my profile"><BsPersonBoundingBox/></Nav.Link>
                                <Nav.Link href="/users" title ="my friends"> <BsPeopleFill/></Nav.Link>
                            </Nav>
                        </Navbar>
                    </Col>

                  
                        <Switch>
                            
                            <Col xs={8}> 
                                <Route path="/login" /*onSuccess={this.updatePage}*/>
                                
                                        <Login onLogin={this.handleOnLogin} />
                                    
                                </Route>


                                <Route path="/registration">
                                
                                        <Registration />
                                
                                </Route>

                                <Route path="/logout">
                                
                                    {loggedIn ? <Logout onLogout={this.handleOnLogout} /> : redirToLogin}
                                </Route>

                                <Route path="/myprofile">
                                
                                    {loggedIn ? <MyProfile onUpdate={this.handleOnUpdate}/> : redirToLogin}
                                </Route>

                                
                                    <Route path={"/home"}>
                                    
                                        {loggedIn ? <Home /> : redirToLogin}
                                    </Route>

                                    <Route path="/users">
                                        
                                        {loggedIn ? <UsersView /> : redirToLogin}
                                    </Route>


                                    <Route path="/hashtag/:hashtagContent" > 
                            
                                        {loggedIn ? <Hashtag /> : redirToLogin}
                                    </Route>
{/* 
                                    <Route path={"/"}>

                                        {loggedIn ? <Home /> : redirToLogin}
                                    </Route> */}
                            </Col>
                        </Switch>
                    </Row>
                 
                </div>
              
            </Router>
        );
    }
}

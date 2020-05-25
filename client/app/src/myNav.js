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
import { Navbar, Nav } from 'react-bootstrap';

import Registration from './Registration'
import Login from './Login'
import Logout from './Logout'
import MyProfile from './MyProfile'
import Home from './Home'
import UsersView from './UsersView'

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
                    <Navbar bg="dark" variant="dark" className="myNav">
                        {
                            loggedIn ?
                                <Navbar.Brand href="/">{this.state.login}'s blog</Navbar.Brand> :
                                <Navbar.Brand href="/">Blog</Navbar.Brand>
                        }
                        <Nav className="mr-auto">
                            <Nav.Link href="/home">Home</Nav.Link>
                            {
                                loggedIn ?
                                    <Nav.Link href="/logout">Logout</Nav.Link> :
                                    <Nav.Link href="/login">Login</Nav.Link>
                            }
                            <Nav.Link href="/registration">Register</Nav.Link>
                            <Nav.Link href="/myprofile">My profile</Nav.Link>
                            <Nav.Link href="/users"> Follolos</Nav.Link>
                        </Nav>
                    </Navbar>

                    <Switch>
                        <Route path="/login" /*onSuccess={this.updatePage}*/>
                            <Login onLogin={this.handleOnLogin} />
                        </Route>

                        <Route path="/registration">
                            <Registration />
                        </Route>

                        {/* ========== PROTECTED ROUTES ========== */}
                        {/* {() => {
                                if (!loggedIn) {
                                    return redirToLogin
                                }
                            }
                        } */}

                        <Route path="/logout">
                            {/* <Logout /> */}
                            {loggedIn ? <Logout onLogout={this.handleOnLogout} /> : redirToLogin}
                        </Route>

                        <Route path="/myprofile">
                            {/* <MyProfile /> */}
                            {loggedIn ? <MyProfile onUpdate={this.handleOnUpdate}/> : redirToLogin}
                        </Route>

                        <Route path="/users">
                            {/* <Users /> */}
                            {loggedIn ? <UsersView /> : redirToLogin}
                        </Route>

                        <Route path={["/home", "/"]}>
                            {/* <Home />  */}
                            {loggedIn ? <Home /> : redirToLogin}
                        </Route>

                    </Switch>
                </div>
            </Router>
        );
    }
}

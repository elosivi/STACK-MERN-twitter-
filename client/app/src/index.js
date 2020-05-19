import React from 'react';
import ReactDOM from 'react-dom';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import Registration from './Registration'
import Login from './Login'
import MyProfile from './MyProfile'
// import './index.css';


class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loggedInStatus: "NOT_LOGGED_IN",
            user: {
                login: "NOT LOGGED IN"
            }
        }

        this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);


    }

    handleSuccessfulAuth(data) {
        this.setState({
            user: data.user
        });

        // localStorage.setItem("user", this.state.user);
        localStorage.setItem("user_login", this.state.user.login);
        localStorage.setItem("user_email", this.state.user.email);
        localStorage.setItem("user_right", this.state.user.admin);

        console.log("this.state.user:", this.state.user);
        // console.log("this.state.user.login:", this.state.user.login);
    }

    render() {
        return (
            <Router>
                <div>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/login">Login</Link>
                            </li>
                            <li>
                                <Link to="/registration">Registration</Link>
                            </li>
                            <li>
                                <Link to="/myprofile">My profile</Link>
                            </li>
                        </ul>
                    </nav>

                    {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                    <Switch>
                        <Route path="/login">
                            <h1>Login</h1>
                            <Login handleSuccessfulAuth={this.handleSuccessfulAuth}/>
                        </Route>
                        <Route path="/registration">
                            <h1>Registration</h1>
                            <Registration />
                        </Route>
                        <Route path="/myprofile">
                            <MyProfile />
                        </Route>
                    </Switch>
                </div>
            </Router>



        );
    }
}

// ========================================

ReactDOM.render(
    <App />,
    document.getElementById('root')
);


// {/* <div>
//     <h1>{this.state.user.login}</h1>
//     <h1>Login</h1>
//     <Login handleSuccessfulAuth={this.handleSuccessfulAuth} />
//     {/* <h1>Registration</h1>
//     <Registration /> */}
// </div> */}
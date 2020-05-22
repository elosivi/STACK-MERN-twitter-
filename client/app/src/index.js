import React from 'react';
import ReactDOM from 'react-dom';

// import {
//     BrowserRouter as Router,
//     Switch,
//     Route,
//     Link
// } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
// import { Navbar, Nav } from 'react-bootstrap';

// import Registration from './Registration';
// import Login from './Login';
// import MyProfile from './MyProfile';
import MyNav from './myNav';
import './style.css';

/** added by elo 19/05 */
// function updateState(loggedInStatus){
//     this.setState({loggedInStatus})
// }
/** end of added by elo */

class App extends React.Component {
    constructor(props) {
        super(props);
        // let userLogin = localStorage.getItem('login');
        this.state = {
            loggedInStatus: "NOT_LOGGED_IN",
            user: {
                login: "NOT LOGGED IN"
                
            }
        }
        
        this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    }

     // updateState = updateState.bind(this)// added by elo 19/05
    updateState(){
        this.setState({ loggedInStatus: "LOGGED_IN"});
    }
    //end of elo test //

    handleSuccessfulAuth(data) {
        this.setState({
            user: data.user,
            loggedInStatus: data.user.login
        });

        // localStorage.setItem("user", this.state.user);
        // localStorage.setItem("user_login", this.state.user.login);
        // localStorage.setItem("user_email", this.state.user.email);
        // localStorage.setItem("user_right", this.state.user.admin);

        console.log("=== INDEX.JS state === this.state.user:", this.state.user);
        // console.log("this.state.user.login:", this.state.user.login);
    }

    render() {
        console.log(localStorage.getItem('login'));
        // if (localStorage.getItem('login')) {
        //     console.log("get from index :", localStorage.getItem('login'))
        // } else {
        //     console.log("get from index : ohoh")
        // }
        // const { redirection } = this.state;
        // if (redirection) {
        //  //Affichage de la redirection
        //  return <Redirect to='/home'/>;
        // }

        return (
            <div>
                <MyNav logged={ this.updateState.bind(this) }/> 
            </div>
        );
    }
}

// ========================================




ReactDOM.render(
    <App />,
    document.getElementById('root')
);



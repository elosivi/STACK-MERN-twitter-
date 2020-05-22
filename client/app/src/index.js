import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import MyNav from './myNav';
import './style.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        // let userLogin = localStorage.getItem('login');
        this.state = {
            loggedInStatus: "NOT_LOGGED_IN",
            user: {
                login: "NOT LOGGED IN"
                
            },
            userLogin: ""
        }
        
        this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
        this.handleIndexLogin = this.handleIndexLogin.bind(this);
    }

     // updateState = updateState.bind(this)// added by elo 19/05
    updateState(){
        this.setState({ loggedInStatus: "LOGGED_IN"});
    }
    //end of elo test //

    handleSuccessfulAuth(data) {
        this.setState({
            user: data.user,
            loggedInStatus: data.user.login,
            userLogin: ""
        });

        // localStorage.setItem("user", this.state.user);
        // localStorage.setItem("user_login", this.state.user.login);
        // localStorage.setItem("user_email", this.state.user.email);
        // localStorage.setItem("user_right", this.state.user.admin);

        console.log("=== INDEX.JS state === this.state.user:", this.state.user);
        // console.log("this.state.user.login:", this.state.user.login);
    }

    handleIndexLogin(userLogin){
        console.log("From index !!!!", userLogin)
        this.setState({
            userLogin: userLogin
        })
        // localStorage.setItem("localStorageLogin", userLogin);
    }

    render() {


        return (
            <div>
                <MyNav logged={ this.updateState.bind(this)} onLogin={this.handleIndexLogin}/>

            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <App />,
    document.getElementById('root')
);



import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import MyNav from './myNav';
import './style.css';

class App extends React.Component {
    constructor(props) {
        super(props);
       
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

        console.log("=== INDEX.JS state === this.state.user:", this.state.user);
      
    }

    handleIndexLogin(userLogin){
        console.log("From index !!!!", userLogin)
        this.setState({
            userLogin: userLogin
        })
        localStorage.setItem("coucou ", userLogin);
    }

    render() {

        return (
            <div>
                <MyNav />
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <App />,
    document.getElementById('root')
);



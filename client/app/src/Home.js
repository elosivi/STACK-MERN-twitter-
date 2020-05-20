import React, { Component } from 'react';
// import { Redirect } from "react-router-dom";

export default class Home extends Component {
    constructor(props) {
        super(props);
        let userLogin = localStorage.getItem('login');
        console.log("userLogin from Home :", userLogin);

        this.state = {
            loggedIn: userLogin,
            redirection: false
        }
        if (!userLogin) {
            userLogin = "";
            this.setState({
                redirection: true
            })
        }

        console.log("from Home state : ", this.state.loggedIn);
    }

    render() {
        // const { redirection } = this.state;
        // if (redirection) {
        //     //Affichage de la redirection
        //     return <Redirect to='/login' />;
        // }
        return (
            <div>
                <h1>Home</h1>
                <h2>Welcome {localStorage.getItem('login')}</h2>
            </div>
        )
    }

}

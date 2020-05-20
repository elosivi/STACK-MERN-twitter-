import React, { Component } from 'react';

// import axios from 'axios';
// import { Redirect } from "react-router-dom";

// const baseURL = "http://localhost:4242";
// axios.defaults.withCredentials = true;

import TweetList from './TweetList'
import TweetForm from './TweetForm'

export default class Home extends Component {
    constructor(props) {
        super(props);

        console.log("props", props.greeting);

        console.log("this.props.search", this.props.search);
        console.log("this.props.search", this.props.search);
        // let userLogin = localStorage.getItem('login');
        // console.log("userLogin from Home :", userLogin);

        this.state = {
            loggedIn: "",
            redirection: false,
            tweets: []
        }

        const userLogin = localStorage.getItem('login');
        console.log("+++userLogin from here", userLogin)
        console.log("+++userLogin this state from here", this.state.loggedIn)

        this.setState({
            loggedIn: userLogin
        })

        console.log("+++userLogin this state from here", this.state.loggedIn)

        // if (!userLogin) {
        //     userLogin = "";
        //     this.setState({
        //         redirection: true
        //     })
        // }

        console.log("from Home state : ", this.state.loggedIn);
    }



    render() {

        return (
            <div>
                <h1>Home</h1>
                <h2>Welcome {this.state.loggedIn}</h2>
                <TweetForm />
                <TweetList />

            </div>
        )
    }

}

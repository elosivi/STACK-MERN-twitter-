import React, { Component } from 'react';
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

        console.log("from Home state : ", this.state.loggedIn);
    }



    render() {
        const userConnected = localStorage.getItem('login')
        return (
            <div>
                <h1>Home {userConnected} </h1>
                <h2>Welcome {this.state.loggedIn}</h2>
                <TweetForm />
                <TweetList />

            </div>
        )
    }

}

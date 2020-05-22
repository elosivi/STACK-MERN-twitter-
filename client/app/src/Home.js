import React, { Component } from 'react';

import TweetList from './TweetList'
import TweetForm from './TweetForm'

import axios from 'axios';
const baseURL = "http://localhost:4242";
axios.defaults.withCredentials = true;

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tweets: [],
        }

        this.handlePostTweets = this.handlePostTweets.bind(this);
    }

    getTweets() {
        axios
            .get(
                baseURL + "/tweets",
            )
            .then(response => {
                const tweets = response.data
                this.setState(
                    {tweets}
                )
                console.log("GET TWEETS RESPONSE :", this.state.tweets);
            })
            .catch(error => {
                console.log("GET TWEETS ERROR :", error)
                console.log(error);
            });  
    }

    postTweetAndUpdateTweetsList(content) {
        axios
            .post(
                baseURL + "/tweets", 
                {
                    content: content
                }
            )
            .then(response => {
                console.log("POST TWEETS RESPONSE :", response)
                this.getTweets();

            })
            .catch(error => {
                console.log("POST TWEETS ERROR :", error)
            });
    }

    handlePostTweets(content) {
        this.postTweetAndUpdateTweetsList(content);
    }

    // ======================================================================
    // When component is loaded, it requests for the tweets
    componentDidMount() {
        this.getTweets();
    }

    // ======================================================================
    render() {

        return (
            <div>
                <h1>/!\ BE CAREFUL /!\ Home</h1>
                <h2>Welcome {this.state.loggedIn}</h2>
                <TweetForm onPost={this.handlePostTweets} />
                <TweetList tweets={this.state.tweets} />
            </div>
        )
    }

}

import React, { Component } from 'react';
import axios from 'axios';

import TweetList from './TweetList'
import TweetForm from './TweetForm'

const baseURL = "http://localhost:4242";
axios.defaults.withCredentials = true;

export default class MyProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            myProfile: "",
            tweets: []
        }

        this.handlePostTweets = this.handlePostTweets.bind(this);
        this.handleTweetDelete = this.handleTweetDelete.bind(this);
        this.handleTweetUpdate = this.handleTweetUpdate.bind(this);

    }

    // ======================================================================
    // When component is loaded, it requests for the tweets
    componentDidMount() {
        this.getMyself();
        this.getTweets();
    }

    // ======================================================================
    getMyself() {
        axios
            .get(
                baseURL + "/login"
            )
            .then(response => {
                console.log("=== GET /login RESPONSE ===", response);
                this.setState({
                    myProfile: response.data.message
                })
            })
            .catch(error => {
                console.log("=== GET /login ERROR ===", error)

            });
    }
    
    // ======================================================================
    getTweets() {
        axios
            .get(
                baseURL + "/mytweets",
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

    // ======================================================================
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

    // ======================================================================
    deleteTweetAndUpdateTweetsList(tweetId) {
        axios
            .delete(
                baseURL + "/tweets/" + tweetId
            )
            .then(response => {
                console.log("DELETE TWEET RESPONSE :", response)
                this.getTweets();

            })
            .catch(error => {
                console.log("DELETE TWEET ERROR :", error)
            });
    }

    // ======================================================================
    updateTweetAndUpdateTweetsList(tweetId, tweetValue) {
        axios
            .put(
                baseURL + "/tweets/" + tweetId, 
                {
                    content: tweetValue
                }
            )
            .then(response => {
                console.log("UPDATE TWEET RESPONSE :", response)
                this.getTweets();

            })
            .catch(error => {
                console.log("UPDATE TWEET ERROR :", error)
            });
    }

    handlePostTweets(content) {
        this.postTweetAndUpdateTweetsList(content);
    }

    handleTweetDelete(tweetId) {
        this.deleteTweetAndUpdateTweetsList(tweetId);
    }

    handleTweetUpdate(tweetId, tweetValue) {
        this.updateTweetAndUpdateTweetsList(tweetId, tweetValue);
    }

    // ======================================================================
    render() {
        return (
            <div>
                <h1>My profile</h1>

                <h3>{this.state.myProfile}</h3>

                <TweetForm
                    onPost={this.handlePostTweets}
                />

                <h2>My tweets</h2>

                <TweetList 
                    tweets={this.state.tweets} 
                    onDelete={this.handleTweetDelete}
                    onUpdate={this.handleTweetUpdate}
                />
                
            </div>
        );
    }
}

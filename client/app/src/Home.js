import React, { Component } from 'react';

import HomeTweetList from './HomeTweetList'
import TweetForm from './TweetForm'

import axios from 'axios';
const baseURL = "http://localhost:4242";
axios.defaults.withCredentials = true;

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tweets: [],
            tweetPostError: null
        }

        this.handlePostTweets = this.handlePostTweets.bind(this);
        this.handleTweetDelete = this.handleTweetDelete.bind(this);
        this.handleTweetUpdate = this.handleTweetUpdate.bind(this);
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
                if (error.response) {
                    console.log("GET TWEETS ERROR :", error.response.data.message)
                }
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
                let tweetPostError = "";
                tweetPostError = (error.response) ? error.response.data.message : "Check server connection";
                this.setState({
                    tweetPostError
                })
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
    // When component is loaded, it requests for the tweets
    componentDidMount() {
        this.getTweets();
    }

    // ======================================================================
    render() {
       
        return (
            <div>

                <h1>Home</h1>

                <TweetForm 
                    onPost={this.handlePostTweets} 
                    tweetPostError={this.state.tweetPostError}
                />
                
                <HomeTweetList 
                    tweets={this.state.tweets}
                    onDelete={this.handleTweetDelete}
                    onUpdate={this.handleTweetUpdate}
                />
            </div>
        )
    }

}

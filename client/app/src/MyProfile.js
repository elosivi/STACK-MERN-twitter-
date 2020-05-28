import React, { Component } from 'react';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col } from 'react-bootstrap';

import MyInformations from './MyInformations'
import TweetList from './TweetList'
import TweetForm from './TweetForm'


const baseURL = "http://localhost:4242";
// axios.defaults.withCredentials = true;

export default class MyProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            myProfile: "",
            userInformations: {},
            tweets: [],
            tweetPostError: null,
            updateUserError: ""
        }

        this.handlePostTweets = this.handlePostTweets.bind(this);
        this.handleTweetDelete = this.handleTweetDelete.bind(this);
        this.handleTweetUpdate = this.handleTweetUpdate.bind(this);
        this.updateUserInformations = this.updateUserInformations.bind(this);
    }

    // ======================================================================
    // When component is loaded, it requests for the tweets
    componentDidMount() {
        this.getMyself();
        this.getTweets();
    }

    updateUserInformations(updatedInformations) {
        console.log("REQUEST FOR PUT /myProfile")
        axios
            .put(
                baseURL + "/myProfile", 
                updatedInformations
            )
            .then(response => {
                this.setState({
                    updateUserError: "User profile has been updated, please logout then login again"
                })
                console.log("===== PUT /myProfile RESPONSE =====", response)

                // ===== Store login informations in browser =====
                const loginInformations = {login: updatedInformations.login, loginStatus: "LOGGED_IN"}
                localStorage.setItem("loginInformations", JSON.stringify(loginInformations));

                this.getMyself();

                // ===== Call parent component to re-render
                this.props.onUpdate();
            })
            .catch(error => {
                let updateUserError = "";
                updateUserError = (error.response) ? error.response.data.message : "Check server connection";
                this.setState({
                    updateUserError
                })
                console.log("===== PUT /myProfile ERROR =====", updateUserError)

            });
    }

    // ======================================================================
    getMyself() {
        axios
            .get(
                baseURL + "/myProfile"
            )
            .then(response => {
                console.log("=== GET /login RESPONSE ===", response.data.user);
                this.setState({
                    userInformations: response.data.user
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
                if (error.response) {
                    console.log("GET TWEETS ERROR :", error.response.data.message)
                }
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
    render() {
        console.log("je passe ici avec :", this.state.updateUserError)
        return (
            <div>
                <Row>
                    <Col className="MyProfileTweetContainer">
                        <h2>My tweets</h2>
                        <TweetList 
                            tweets={this.state.tweets} 
                            onDelete={this.handleTweetDelete}
                            onUpdate={this.handleTweetUpdate}
                        />
                    </Col>

                    <Col> 
                        <div className="newTweet center">
                            <TweetForm
                                onPost={this.handlePostTweets}
                                tweetPostError={this.state.tweetPostError}
                            />
                        </div>

                        <div className="myProfile mainContainer center bigShadow ">
                            <h2>My profile</h2>
                            <MyInformations 
                                user={this.state.userInformations}
                                updateUserError={this.state.updateUserError}
                                onUpdate={this.updateUserInformations}
                            />
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

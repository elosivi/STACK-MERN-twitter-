import React, { Component } from 'react';
import axios from 'axios';

const baseURL = "http://localhost:4242";
axios.defaults.withCredentials = true;

export default class TweetList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tweets: []
        };
    }

    componentDidMount() {
        axios
            .get(
                baseURL + "/tweets", 
            )
            .then(response => {
                this.setState({
                    tweets: response.data
                })
                console.log("TweetList :", this.state.tweets);
            })
            .catch(error => {
                console.log(error);
            });    
    }

    render () {
        return (
            <ul>
                { this.state.tweets.map(tweet => {
                    return (
                        <li>
                            {tweet.content}
                            <button>

                            </button>
                        </li>                
                    ) 
                }) }
            </ul>
        )
    }

}
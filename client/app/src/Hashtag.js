import React, { Component } from 'react';
import Moment from 'moment';
import axios from 'axios';
import { withRouter } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import { MdFace } from 'react-icons/md';

import Linkify from 'linkifyjs/react';
import * as linkify from 'linkifyjs';
import hashtag from "linkifyjs/plugins/hashtag";

const baseURL = "http://localhost:4242";
axios.defaults.withCredentials = true;


class Hashtag extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tweets:[],
            hashtag:this.props.match.params.hashtagContent
            };
        }

    componentDidMount() {
        
        this.getTweetWithHashtah();
    }


    getTweetWithHashtah(){
               const url= baseURL+"/hashtag/"+this.state.hashtag
        console.log("--->try to get "+url)
        axios
        .get(url)
        .then(res => {
        const tweets = res.data;
        console.log("--> ok! (mess from client) #",hashtag, "-->",+tweets)
        this.setState({ tweets });
        })
        .catch(error => {
            console.log("--> ERROR ! (mess from client) hashtag: try get tweets from: "+ url+" but: ", error)//TEST CONSOL ok 
        });
    }
    

    render(){
    
        
        hashtag(linkify);
    
        let linkifyOptions = {
            formatHref: function (href, type) {
                if (type === 'hashtag') {
                    href = 'http://localhost:3000/hashtag/' + href.substring(1);
                }
                return href;
            }
        }

        return (
            <div className="mainContainer">
                <h2>{this.state.hashtag}</h2>
                
                    <Linkify options={linkifyOptions}>
                    { 
                        this.state.tweets.map(tweet => {
                            if (tweet.author !== this.state.login) {
                                
                                
                                return (
                                    
                                        <div className="mytweet">
                                            <p className="flex tweetHeader">
                                                <div className="mytweetFace"><MdFace /></div>
                                                @<h4 className="tweetName">{tweet.author}.</h4>
                                                <small className="tweetDate"> [{Moment(tweet.creationDate).format('d MMM YYYY / HH:MM')}]</small> 
                                            </p>
                                            <p className="mytweetContent">{tweet.content}</p>
                                        </div>                           
                                    
                            )
                            } else if (tweet._id !== this.state.tweetIdToUpdate) {
                                return (
                                    <div className="tweet">
                                        
                                        <div onClick={() => this.handleClick(tweet._id, tweet.content)}>
                                            <p className="flex tweetHeader">
                                                <div className="tweetFace"><MdFace /></div>
                                                @<h4 className="tweetName">{tweet.author}.</h4>
                                                <small className="tweetDate"> [{Moment(tweet.creationDate).format('d MMM YYYY / HH:MM')}]</small>
                                            </p>
                                            <p className="tweetContent">{tweet.content}</p>
                                            
                                        </div>                           
                                        <button className="deleteTweet" onClick={() => this.handleDelete(tweet._id)}>
                                            delete post
                                        </button>
                                    </div>
                            )} else {
                                return (
                                    <div>
                                        @{tweet.author}:
                                        <form className="form" onSubmit={this.handleTweetSubmit}>
                                            <input 
                                                type="text" 
                                                name="tweetUpdate" 
                                                value={this.state.tweetValue} 
                                                placeHolder="Tweet update" 
                                                onChange={this.handleChange} 
                                            />
                                            <button>Update</button>
                                        </form>
                                        {tweet._id}
                                    </div>
                                )
                            }
                        })

                        
                    }
                    </Linkify>
                
            </div>
        )
    }
    
}
export default withRouter(Hashtag);
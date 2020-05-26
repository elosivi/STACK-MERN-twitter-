import React, { Component } from 'react';
import Moment from 'moment';

import { MdFace } from 'react-icons/md';

import Linkify from 'linkifyjs/react';
import * as linkify from 'linkifyjs';
import hashtag from "linkifyjs/plugins/hashtag";



const linkifyOptions = 
            {
                formatHref: function (href, type) {
                    if (type === 'hashtag') {
                        href = baseURL+'/hashtag/' + href.substring(1);
                        console.log("--->TEST LINKIFY : "+ href)
                    }
                    console.log("--->TEST LINKIFY - output : "+ href)
                    return href;
                }
            }

// console.log("---->test hashtag:" +hashtag)


const TWEET_MAX_LENGTH = 140;
const baseURL = "http://localhost:3000";

export default class HomeTweetList extends Component {
    constructor(props) {
        super(props);

        let loginInformations = {
            login: "DEFAULT_USER",
            loginStatus: "NOT_LOGGED_IN",
        };
        if (localStorage.getItem("loginInformations")) {
            loginInformations =
            JSON.parse(localStorage.getItem("loginInformations"));
        }
        this.state = {
            showTweetUpdateForm: false,
            tweetIdToUpdate: null,
            tweetValue: "",
            tweetLength: 0,
            login: loginInformations.login,
        }

        this.handleTweetSubmit = this.handleTweetSubmit.bind(this );
        this.handleChange = this.handleChange.bind(this);

    }

// -------------------------------------------- HASHTAG MANAGEMENT -----------------------------------------//
  
    //    Hashtag(content) 
    //     {
    //         formatHref: function(href, type) {
    //         if (type === 'hashtag') {
    //             href = baseURL+'/hashtag/' + href.substring(1);
    //         }
    //         return href;
    //         }
    //     }
    

// ---------------------------------------------- TWEET MANAGEMENT -------------------------------//
    handleChange(event) {
        const value = event.currentTarget.value;
        const valueLength = value.length
        
        if (valueLength > TWEET_MAX_LENGTH) {
            return;
        }
        this.setState({
            tweetValue: value,
            tweetLength: valueLength
        })
    }

    handleTweetSubmit(event) {
        event.preventDefault();
        this.props.onUpdate(this.state.tweetIdToUpdate, this.state.tweetValue);
        this.setState({
            tweetIdToUpdate: null
        })
    }

    handleDelete(id) {
        console.log(id);
        this.props.onDelete(id);
    }

    handleClick(id, currentValue) {
        this.setState({
            tweetIdToUpdate: id,
            tweetValue: currentValue
        })
    }

// ---------------------------------------------- RENDER -------------------------------//
    render () {
        hashtag(linkify);
    
        let linkifyOptions = {
            formatHref: function (href, type) {
                if (type === 'hashtag') {
                    href = 'http://localhost:3000/hashtag/' + href.substring(1);
                    console.log("!!!!TEST!!!!")
                }
                console.log("!!!!TEST!!!!"+href)
                return href;
            }
        }

        return (
            <div className="mainContainer">
               
                    <Linkify options={linkifyOptions}>
                    { 
                        this.props.tweets.map(tweet => {
                            if (tweet.author !== this.state.login) {
                                
                                
                                return (
                                    
                                        <div className="tweet">
                                            <p className="flex tweetHeader">
                                                <div className="tweetFace"><MdFace /></div>
                                                @<h4 className="tweetName">{tweet.author}.</h4>
                                                <small className="tweetDate"> [{Moment(tweet.creationDate).format('d MMM YYYY / HH:MM')}]</small> 
                                            </p>
                                            <p className="tweetContent">{tweet.content}</p>

                                        {/* <Linkify className= "linkify" options={linkifyOptions}> coucou les #loups </Linkify>; */}
                                        {/* <Linkify >{tweet.content}</Linkify>; */}
                                    
                                        </div>                           
                                    
                            )
                            } else if (tweet._id !== this.state.tweetIdToUpdate) {
                                return (
                                    <div className="tweet">
                                        
                                        <div onClick={() => this.handleClick(tweet._id, tweet.content)}>
                                            [{Moment(tweet.creationDate).format('d MMM YYYY / HH:MM')}] @{tweet.author}: 
                                            <p>{tweet.content}</p>
                                            {/* <Linkify options={linkifyOptions}>{tweet.content}</Linkify>;  */}
                                            {/* <Linkify >{tweet.content}</Linkify>; */}
                                        </div>                           
                                        <button onClick={() => this.handleDelete(tweet._id)}>
                                            X
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
                    </Linkify>;
               
            </div>
        )
    }

}



                   
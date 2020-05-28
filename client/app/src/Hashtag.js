import React, { Component } from 'react';
import Moment from 'moment';
import axios from 'axios';
import { withRouter } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import { MdFace } from 'react-icons/md';
import {BsCircleFill} from 'react-icons/bs';
import {RiChatDeleteLine} from 'react-icons/ri';

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
                <h2>All <span className="hashtagTitle">#{this.state.hashtag}</span>'s tweets !</h2>
                
                    
                    { 
                        this.state.tweets.map(tweet => {
                            if (tweet._id !== this.state.tweetIdToUpdate) {
                                return (
                                    <Linkify options={linkifyOptions}>
                                    <div className="mytweet">
                                        
                                        <div onClick={() => this.handleClick(tweet._id, tweet.content)}>
                                            <p className="flex tweetHeader">
                                                <div className="tweetFace"><MdFace /></div>
                                                <p className="at">@</p>
                                                <h4 className="tweetName">{tweet.author}<BsCircleFill/></h4>
                                                <small className="tweetDate"> <span>posted the: </span> {Moment(tweet.creationDate).format('LLLL')}</small>
                                            </p>
                                            <p className="tweetContent">{tweet.content}</p>
                                        
                                        </div >      
                                        <div className="deleteTweet">                      
                                            <button onClick={() => this.handleDelete(tweet._id)} title="delete post">
                                                <RiChatDeleteLine />
                                            </button>
                                        </div>
                                    </div>
                            </Linkify>                       
                                    
                            )
                            } else if (tweet.author !== this.state.login) {
                                return (
                                    <div className="tweet">
                                        
                                        <div onClick={() => this.handleClick(tweet._id, tweet.content)}>
                                            <p className="flex tweetHeader">
                                                <div className="tweetFace"><MdFace /></div>
                                                <p className="at">@</p>
                                                <h4 className="tweetName">{tweet.author}.</h4>
                                                <small className="tweetDate"> <span>posted the: </span> {Moment(tweet.creationDate).format('LLLL')}</small>
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
                    
                
            </div>
        )
    }
    
}
export default withRouter(Hashtag);
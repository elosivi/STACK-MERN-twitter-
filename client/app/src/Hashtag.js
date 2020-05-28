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
        let loginInformations = {
            login: "DEFAULT_USER",
            loginStatus: "NOT_LOGGED_IN",
        };
        if (localStorage.getItem("loginInformations")) {
            loginInformations =
            JSON.parse(localStorage.getItem("loginInformations"));
        }
        this.state = {
            tweets:[],
            hashtag:this.props.match.params.hashtagContent,
            login: loginInformations.login,

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
                            console.log("tweet.author= "+tweet.author)
                            console.log("this.state.login= "+this.state.login )
                            if (tweet.author !== this.state.login) {

                                return (
                                    <Linkify options={linkifyOptions}>
                                        <div className="tweet">
                                            <p className="flex tweetHeader">
                                                <div className="tweetFace"><MdFace /></div>
                                                <p className="at">@</p>
                                                <h4 className="tweetName">{tweet.author}.</h4>
                                                <small className="tweetDate"> <span>posted the:</span> {Moment(tweet.creationDate).format('LLLL')}</small> 
                                            </p>
                                            <p className="mytweetContent">{tweet.content}</p>
                                        </div>
                                    </Linkify>                        
                                )
                            } else if (tweet._id !== this.state.tweetIdToUpdate) {
                                return (
                                    <Linkify options={linkifyOptions}>
                                        <div className="mytweet">
                                            
                                            <div>
                                                <p className="flex tweetHeader">
                                                    <div className="tweetFace"><MdFace /></div>
                                                    <p className="at">@</p>
                                                    <h4 className="tweetName">{tweet.author}<BsCircleFill/></h4>
                                                    <small className="tweetDate"> <span>posted the: </span> {Moment(tweet.creationDate).format('LLLL')}</small>
                                                </p>
                                                <p className="tweetContent">{tweet.content}</p>
                                            
                                            </div >      
                                            
                                        </div>
                                    </Linkify>
                            )} 
                        })                 
                    }
            </div>
        )
    }
}
export default withRouter(Hashtag);
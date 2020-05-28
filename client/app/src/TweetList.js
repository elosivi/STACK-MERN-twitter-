import React, { Component } from 'react';
import Moment from 'moment';

import { MdFace } from 'react-icons/md';
import {BsCircleFill} from 'react-icons/bs';
import {RiChatDeleteLine} from 'react-icons/ri';

import Linkify from 'linkifyjs/react';
import * as linkify from 'linkifyjs';
import hashtag from "linkifyjs/plugins/hashtag";


const TWEET_MAX_LENGTH = 140;

export default class TweetList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showTweetUpdateForm: false,
            tweetIdToUpdate: null,
            tweetValue: "",
            tweetOldValue: "",
            tweetLength: 0
        }

        // this.handleDelete = this.handleDelete.bind(this)
        this.handleTweetSubmit = this.handleTweetSubmit.bind(this );
        this.handleChange = this.handleChange.bind(this);

    }


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

    handleDelete(id) {
        console.log(id);
        this.props.onDelete(id);
    }

    handleTweetSubmit(event) {
        event.preventDefault();
        if (this.state.tweetOldValue === this.state.tweetValue) {
            this.setState({
                tweetIdToUpdate: null
            })
            return;
        }
        this.props.onUpdate(this.state.tweetIdToUpdate, this.state.tweetValue);
        this.setState({
            tweetIdToUpdate: null
        })
    }

    handleClick(id, currentValue) {
        this.setState({
            tweetIdToUpdate: id,
            tweetValue: currentValue,
            tweetOldValue: currentValue
        })
    }

    render () {

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
            <div>
                { 
                    this.props.tweets.map(tweet => {
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
                        )} else {
                            return (
                                <Linkify options={linkifyOptions}>
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
                                            {/* {tweet._id} */}
                                        </div>
                                    </Linkify>
                            )
                        }
                    })
                }
            </div>
        )
    }

}

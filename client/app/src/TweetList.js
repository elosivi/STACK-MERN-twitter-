import React, { Component } from 'react';
import Moment from 'moment';

const TWEET_MAX_LENGTH = 140;

export default class TweetList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showTweetUpdateForm: false,
            tweetIdToUpdate: null,
            tweetValue: "",
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
        // this.setState({
        //     [event.target.name]: event.target.value
        // });
    }

    handleDelete(id) {
        console.log(id);
        this.props.onDelete(id);
    }

    handleTweetSubmit(event) {
        event.preventDefault();
        this.props.onUpdate(this.state.tweetIdToUpdate, this.state.tweetValue);
        this.setState({
            tweetIdToUpdate: null
        })
    }

    handleClick(id, currentValue) {
        // if (this.setState.tweetIdToUpdate) {
        //     this.setState({
        //         tweetIdToUpdate: null
        //     })
        //     return;
        // }
        this.setState({
            tweetIdToUpdate: id,
            tweetValue: currentValue
        })
    }

    render () {

        return (
            <ul>
                { 
                    this.props.tweets.map(tweet => {
                        if (tweet._id !== this.state.tweetIdToUpdate) {
                            return (
                                <li>
                                    <div onClick={() => this.handleClick(tweet._id, tweet.content)}>
                                    [{Moment(tweet.creationDate).format('d MMM YYYY / HH:MM')}] @{tweet.author}: "{tweet.content}"
                                    </div>                           
                                    <button onClick={() => this.handleDelete(tweet._id)}>
                                        X
                                    </button>
                                </li> 
                        )} else {
                            return (
                                <li>
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
                                </li>
                            )
                        }
                    })
                }
            </ul>
        )
    }

}

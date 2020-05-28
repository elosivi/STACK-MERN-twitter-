import React, { Component } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Card } from 'react-bootstrap';

const TWEET_MAX_LENGTH = 140;

export default class TweetForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: "abcd",
            newTweet: "",
            tweetLength: 0
            // tweetLength: 
        };

        this.handleSubmit = this.handleSubmit.bind(this );
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const value = event.currentTarget.value;
        const valueLength = value.length
        
        if (valueLength > TWEET_MAX_LENGTH) {
            return;
        }
        this.setState({
            newTweet: value,
            tweetLength: valueLength,
        })
        // this.setState({
        //     [event.target.name]: event.target.value
        // });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.onPost(this.state.newTweet);
        this.setState({
            newTweet: "",
            tweetLength: 0
        })
    }


    render () {
        const placeholder = `tweet content max ${TWEET_MAX_LENGTH} characters`;

        return (
            <div className="fullContainer separation center">
                <h2>Post new tweet</h2>
                <Card className="tweetForm">
                <Card.Body className="bigShadow lightPurple">
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="formBasicLogin">
                            <Form.Control
                                as="textarea" 
                                rows="2"
                                type="text"
                                value={this.state.newTweet}
                                // name="content"
                                placeholder = {placeholder}
                                onChange={this.handleChange}
                            />
                        </Form.Group>
                        
                        <Button variant="primary" type="submit">Tweet</Button>
                        <p>Tweet length : {this.state.tweetLength}/{TWEET_MAX_LENGTH}</p>
                    </Form>
                    <p className="error">{this.props.tweetPostError}</p>
                </Card.Body>
                </Card>
            </div>
        );
    }

}
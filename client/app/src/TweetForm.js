import React, { Component } from 'react';
import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Card } from 'react-bootstrap';

const baseURL = "http://localhost:4242";
axios.defaults.withCredentials = true;


export default class TweetList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: ""
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    countTweetChar(content) {
        console.log('tweet length :', content.length);
    }

    handleChange(event) {
        // this.countTweetChar(this.state.content);
        // if (this.state.content.length >= 5) {
        //     return;
        // } else {
        //     this.setState({
        //         [event.target.name]: event.target.value
        //     });
        // }
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        // console.log("=== HERE IN POST LOGIN ===");
        axios
            .post(
                baseURL + "/tweets", 
                {
                    content: this.state.content
                }
            )
            .then(response => {

                console.log("Tweet form response :", response)

            })
            .catch(error => {
                console.log("Tweet form error :", error)

            });
       
    }

    render () {
        return (
            <div >
                <h1>Tweet Form</h1>
                <Card className="login" style={{ width: '30rem' , margin:'auto'}}>
                <Card.Body>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="formBasicLogin">
                            <Form.Control
                                type="text"
                                name="content"
                                placeholder="tweet content max 140 characters"
                                value={this.state.login}
                                onChange={this.handleChange}
                            />
                        </Form.Group>
                        
                        <Button variant="primary" type="submit">Login</Button>
                    </Form>
                    {/* <p className="error">{this.state.loginErrors}</p> */}
                </Card.Body>
                </Card>
            </div>
        );
    }

}
import React, { Component } from 'react';

import axios from 'axios';
import { Redirect } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import './style.css';

const baseURL = "http://localhost:4242";
// axios.defaults.withCredentials = true;

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loginError: null,
            redirection: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleSubmit(event) {
        event.preventDefault();
        axios
            .post(
                baseURL + "/login", 
                {
                    login: this.state.login,
                    password: this.state.password,
                }
            )
            .then(response => {
                this.setState({
                    redirection: true,
                    loginError: response.data.message
                });
                localStorage.setItem('localStorageLogin', response.data.user.login);  
            })
            .catch(error => {
                let loginError = "";
                loginError = (error.response) ? error.response.data.message : "Check server connection";
                this.setState({
                    loginError
                })
                console.log("Login error :", loginError);
            });
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {

        const { redirection } = this.state;
        if (redirection) {
            return <Redirect to='/home'/>
        }
        return (
            <div >
                <h1>Login</h1>
                <Card className="login" style={{ width: '30rem' , margin:'auto'}}>
                <Card.Body>
                    <Form onSubmit={this.handleSubmit}>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Control
                                type="text"
                                name="login"
                                placeholder="login"
                                value={this.state.login}
                                onChange={this.handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Control
                                type="password"// to change
                                name="password"
                                placeholder="password"
                                value={this.state.password}
                                onChange={this.handleChange}
                            />
                        </Form.Group>
                        
                        <Button variant="primary" type="submit">Login</Button>
                    </Form>
                    <p className="error">{this.state.loginError}</p>
                </Card.Body>
                </Card>

            </div>
        );
    }
}

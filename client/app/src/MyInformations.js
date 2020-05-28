import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Card } from 'react-bootstrap';

import axios from 'axios';
// const baseURL = "http://localhost:4242";
axios.defaults.withCredentials = true;

export default class MyInformations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: "",
            email: "",
            password: "",
            confirm_password: "",
            askForUpdate: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleClick(event) {
        this.setState({
            askForUpdate: true
        })
    }

    handleSubmit(event) {
        event.preventDefault();

        const updateUserInformations = {};

        if (this.state.login) {
            updateUserInformations.login = this.state.login;
        }
        if (this.state.email) {
            updateUserInformations.email = this.state.email;
        }
        if (this.state.password) {
            updateUserInformations.password = this.state.password;
        }
        if (this.state.confirm_password) {
            updateUserInformations.confirm_password = this.state.confirm_password;
        }

        if (this.state.login || this.state.email || this.state.password) {
            this.props.onUpdate(updateUserInformations);
        }
    }

    handleCancel() {        
        this.setState({
            askForUpdate: false
        })
    }

    render() {
        const askForUpdate = this.state.askForUpdate;
        console.log("askForUpdate", askForUpdate);
        const user = this.props.user;

        return (
            <div>
                {askForUpdate 
                ?
                <div>
                    <h2>Update profile</h2>
                    <Card className="center">
                        <Card.Body className="lightPurple">
                            <Form onSubmit={this.handleSubmit}>

                                <Form.Group controlId="formBasicLogin"> 
                                    <Form.Control
                                        type="text"
                                        name="login"
                                        placeholder="updated login"
                                        onChange={this.handleChange}
                                    />
                                </Form.Group>

                                <Form.Group controlId="formBasicEmail">
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        placeholder="updated email"
                                        onChange={this.handleChange}
                                    />
                                </Form.Group>    

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        placeholder="password"
                                        onChange={this.handleChange}
                                    />
                                </Form.Group>  

                                <Form.Group controlId="formBasicPasswordConf">
                                <Form.Control
                                    type="password"
                                    name="confirm_password"
                                    placeholder="password"
                                    onChange={this.handleChange}
                                />
                                </Form.Group>
                                <div className="RightAlign">
                                    <Button variant="primary" type="submit">Update profile</Button>
                                </div>
                                
                            </Form>
                            <p class="error">{this.props.updateUserError}</p>
                            <div className="RightAlign">
                                <Button variant="danger" onClick={this.handleCancel}>Cancel</Button>
                            </div>
                        
                        </Card.Body>
                    </Card>
                </div>
                :
                <div>
                    <div>
                        <p>Login : {user.login} </p>
                    </div>
                    <div>
                       <p>Email : {user.email}</p>
                    </div>
                    <div className="RightAlign update">
                        <button onClick={() => this.handleClick()}>UPDATE INFO</button>
                    </div>
                </div>                
                }


            </div>
        )
    }
}
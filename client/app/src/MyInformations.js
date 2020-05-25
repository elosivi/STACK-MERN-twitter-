import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Card } from 'react-bootstrap';

import axios from 'axios';
const baseURL = "http://localhost:4242";
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
            // login: this.props.user.login,
            // email: this.props.user.email,
            askForUpdate: true
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        const updateUserInformations = {
            login: this.state.login,
            email: this.state.email,
            password: this.state.password,
            confirm_password: this.state.confirm_password,
        }
        this.props.onUpdate(updateUserInformations);
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

        console.log("pppppppppppppppppppppppppppp", this.props.updateUserError);

        return (
            <div>
                {askForUpdate 
                ?
                <div>
                    <h1>Update profile</h1>
                    <Card style={{ width: '30rem' , margin:'auto'}}>
                        <Card.Body>
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

                                <Button variant="primary" type="submit">Update profile</Button>
                                
                            </Form>
                            <p class="error">{this.props.updateUserError}</p>
                            <Button variant="danger" onClick={this.handleCancel}>Cancel</Button>
                        </Card.Body>
                    </Card>
                </div>
                :
                <div>
                    <div>
                        Login : {user.login}
                    </div>
                    <div>
                        Email : {user.email}
                    </div>
                    <button onClick={() => this.handleClick()}>UPDATE INFO</button>
                </div>                
                }


            </div>
        )
    }
}
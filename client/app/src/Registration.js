import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Card } from 'react-bootstrap';
import './style.css';

// Axios setup
const instance = axios.create({
    baseURL: 'http://localhost:4242',
    // withCredentials: true,
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

export default class Registration extends Component {
    constructor(props) {
        super(props);

        this.state = {
            login: "",
            email: "",
            password: "",
            password_confirmation: "",
            registrationErrors: "",
            redirection: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {
        console.log("=== ICI ===");
        instance.post("/register", {
            login: this.state.login,
            email: this.state.email,
            password: this.state.password,
            confirm_password: this.state.password_confirmation
        }).then(response => {
            console.log("ici");
            console.log("registration response :::", response.data.newUser);
            this.setState({ redirection: true });
        }).catch(error => {
                        this.setState({registrationErrors: error.response.data.message});
            console.log("registration error", error.response);
        });

        console.log("form submitted");
        event.preventDefault();
    }


    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }


    render() {
        const { redirection } = this.state;
        if (redirection) {
        //Affichage de la redirection
        return <Redirect to='/login'/>;
        }
        return (
            <div>
                <h1>Registration</h1>
                <Card style={{ width: '30rem' , margin:'auto'}}>
                    <Card.Body>
                        <Form onSubmit={this.handleSubmit}>

                            <Form.Group controlId="formBasicLogin"> 
                                <Form.Control
                                    type="text"
                                    name="login"
                                    placeholder="login"
                                    value={this.state.login}
                                    onChange={this.handleChange}
                                />
                            </Form.Group>

                            <Form.Group controlId="formBasicEmail">
                                <Form.Control
                                    type="email"
                                    name="email"
                                    placeholder="name@email.com"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                />
                            </Form.Group>    

                            <Form.Group controlId="formBasicPassword">
                                <Form.Control
                                    type="password"
                                    name="password"
                                    placeholder="password"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                />
                            </Form.Group>  

                            <Form.Group controlId="formBasicPasswordConf">
                            <Form.Control
                                type="password"
                                name="password_confirmation"
                                placeholder="password_confirmation"
                                value={this.state.password_confirmation}
                                onChange={this.handleChange}
                            />
                            </Form.Group>

                            <Button variant="primary"  type="submit">Register</Button>
                        </Form>
                        <p class="error">{this.state.registrationErrors}</p>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

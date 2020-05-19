import React, { Component } from 'react';
import axios from 'axios';

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
            registrationErrors: ""
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
        }).catch(error => {
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
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        name="login"
                        placeholder="login"
                        value={this.state.login}
                        onChange={this.handleChange}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="name@email.com"
                        value={this.state.email}
                        onChange={this.handleChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                    />
                    <input
                        type="password"
                        name="password_confirmation"
                        placeholder="password_confirmation"
                        value={this.state.password_confirmation}
                        onChange={this.handleChange}
                    />
                    <button type="submit">Register</button>
                </form>
            </div>
        );
    }
}

import React, { Component } from 'react';
import axios from 'axios';

const baseURL = "http://localhost:4242";

localStorage.setItem('myData', "123");
// axios.defaults.withCredentials = true;

// Axios setup
// const instance = axios.create({
//     baseURL: 'http://localhost:4242',
//     withCredentials: true,
//     timeout: 1000,
//     headers: {
//         // 'Content-Type': 'application/json',
//         'Accept': 'application/json'
//     }
// });

// const instance = axios.create({
//     baseURL: 'http://localhost:4242',
//     withCredentials: true,
// })

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            login: "",
            password: "",
            loginErrors: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {
        console.log("=== HERE IN POST LOGIN ===");
        axios.post(
            baseURL + "/login", {
                login: this.state.login,
                password: this.state.password
            }).then(response => {
                console.log("=== Login response ===", response.data.user);
            }).catch(error => {
                this.setState({loginErrors: error.response.data.message})
                console.log("=== Login error ===", error.response.data.message);
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
                        type="password"
                        name="password"
                        placeholder="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                    />
                    <button type="submit">Login</button>
                </form>
                <h3>{this.state.loginErrors}</h3>
            </div>
        );
    }
}

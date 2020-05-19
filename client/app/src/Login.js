import React, { Component } from 'react';
import axios from 'axios';

const baseURL = "http://localhost:4242";
axios.defaults.withCredentials = true;

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
        this.handleSessionSubmit = this.handleSessionSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        
    }

    handleSubmit(event) {
        console.log("=== HERE IN POST LOGIN ===");
        axios
            .post(
                baseURL + "/login", 
                {
                    login: this.state.login,
                    password: this.state.password
                }
            )
            .then(response => {
                console.log("=== youpi ===");
                console.log("res from login", response)
                // if (response.data.status === 200) {
                //     console.log("res data status ", response.request);
                //     console.log("res data status type ", typeof(response.request));
                    this.props.handleSuccessfulAuth(response.data)
                    // axios.defaults.headers.common['Cookie'] = 
                // }
                // console.log("=== YOUPI !!! ===");
                // const message = `${response.headers} is logged in`;
                
                
                // console.log("data :", response.data);
                // console.log("status :", response.status);
                // console.log("statusText :", response.statusText);
                // console.log("headers :", response.headers);
                // console.log("config :", response.config);
                // console.log("request :", response.request);
                // this.state({loginErrors: message});

            })
            .catch(error => {
                console.log("login error...", error)
                // if (error) {
                //     console.log("=== ERROR !!! ===", error.response)
                    // this.setState({loginErrors: error.response.data.message});
                //     console.log("=== Login error ===", error.response.data.message);
                // }
            });

        console.log("form submitted");
        event.preventDefault();
        
    }

    handleSessionSubmit(event) {
        event.preventDefault();
        console.log("=== HERE IN SESSION !!! ===");
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
                        type="text"
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

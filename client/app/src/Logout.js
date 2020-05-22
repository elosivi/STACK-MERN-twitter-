/* eslint-disable */
import React, { Component } from 'react';
import './style.css';
import { Redirect } from "react-router-dom";
import { Button } from 'react-bootstrap';
import axios from 'axios';

const baseURL = "http://localhost:4242";
axios.defaults.withCredentials = true;

export default class Logout extends Component {
    constructor(props) {
        super(props);
        // let userLogin = localStorage.getItem('login');
        this.state = {
            redirection : false,
            logoutError: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log("=== LOGOUT ANSWERED ===");
        axios
            .get(
                baseURL + "/logout"
            )
            .then(response => {
                console.log("=== LOGOUT response ===", response);
                localStorage.clear();
                // localStorage.removeItem("login"),
                // localStorage.removeItem("email"),
                // localStorage.removeItem("userid"),
                // localStorage.removeItem("admin"),
                // localStorage.removeItem("coucou"),
                this.setState({ redirection : true})
            })
            .catch(error => {
                console.log("===LOGOUT.JS error ===", error)//TEST CONSOL
                this.setState({
                    logoutError: error.message
                })
            })
    }

    render() {
        const {redirection} = this.state;

        if (redirection){
            return <Redirect to="/login" />;
        }
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <Button type="submit">Logout</Button>
                </form>
                <h3>{this.state.logoutError}</h3>
            </div>

        )
        
    }   
}

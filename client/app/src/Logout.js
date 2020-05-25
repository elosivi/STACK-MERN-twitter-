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
        // this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
    // handleSubmit(event) {
        // event.preventDefault();
        axios
            .get(
                baseURL + "/logout"
            )
            .then(response => {
                // ===== Remove login informations from browser =====
                localStorage.clear();
                this.setState({ redirection : true});

                // ===== Call parent component to re-render
                this.props.onLogout();

            })
            .catch(error => {
                let logoutError = "";
                logoutError = (error.response) ? error.response.data.message : "Check server connection";
                this.setState({
                    logoutError
                })
                console.log("Logout error :", logoutError);
                // ===== Remove login informations from browser =====
                localStorage.clear();
                // ===== Call parent component to re-render
                this.props.onLogout();
            })
    }

    render() {
        const {redirection} = this.state;

        if (redirection){
            return <Redirect to="/login" />;
        }
        return (
            null
            // <div>
            //     <form onSubmit={this.handleSubmit}>
            //         <Button type="submit">Logout</Button>
            //     </form>
            //     <h3>{this.state.logoutError}</h3>
            // </div>
        )

    }   
}

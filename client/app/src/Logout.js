/* eslint-disable */
import React, { Component } from 'react';
import './style.css';
import { Redirect } from "react-router-dom";
import { Button } from 'react-bootstrap';
import axios from 'axios';

const baseURL = "http://localhost:4242";
axios.defaults.withCredentials = true;

export default class Logout extends Component {
    state = {
        navigate : false
    };

    handleSubmit() {
        console.log("=== LOGOUT ANSWERED ===");
        axios
            .get(
                baseURL + "/logout"
            )
            .then(response => {
            localStorage.removeItem("login"),
            localStorage.removeItem("email"),
            localStorage.removeItem("userid"),
            localStorage.removeItem("admin"),
            this.setState({ navigate : true})
             })
            .catch(error => {
                console.log("===LOGOUT.JS error ===", error)//TEST CONSOL
            })
    }

    // handleSessionSubmit(event) {
    //     event.preventDefault();
    //     console.log("===LOGout HANDLEsESSIONsUBMIT ===");//TEST CONSOL
    // }


    // handleChange(event) {
    //     this.setState({
    //         [event.target.name]: event.target.value
    //     });
    // }


    render() {
        const {navigate} = this.state;

        if (navigate){
            return <Redirect to="/login" push = {true}/>;
        }
        return (
        <form onSubmit={this.handleSubmit}>
            <Button type="submit">Logout</Button>
        </form>)
        
    }   
}

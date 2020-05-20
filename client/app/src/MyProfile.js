import React, { Component } from 'react';
import axios from 'axios';

const baseURL = "http://localhost:4242";
axios.defaults.withCredentials = true;


export default class MyProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            myProfile: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log("=== HERE IN MY PROFILE ===");
        axios
            .get(
                baseURL + "/login"
            )
            .then(response => {
                console.log("=== GET /login ===", response);
                this.setState({
                    myProfile: response.data.message
                })


            })
            .catch(error => {
                console.log("=== ERROR GET /login ===", error)

            });
       
    }

    render() {
        return (
            <div>
                <h1>My profile</h1>
                <h3>Who am I ?</h3>
                <form onSubmit={this.handleSubmit}>
                    <button type="submit">Who am I</button>
                </form>
                <h3>{this.state.myProfile}</h3>
            </div>
        );
    }
}

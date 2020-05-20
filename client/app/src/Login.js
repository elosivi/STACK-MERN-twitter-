import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Card } from 'react-bootstrap';
import './style.css';
// import Home from './Home';
// import {
//     BrowserRouter as Router,
//     // Switch,
//     Route,
//     // Link
//   } from "react-router-dom";
const baseURL = "http://localhost:4242";
axios.defaults.withCredentials = true;



export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            login: "",
            password: "",
            loginErrors: "",
            email:"",
            admin:"",
            redirection: false
        }
        

        console.log("===LOGIN.JS===this.state.rediction in constructor :",this.state.rerirection);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSessionSubmit = this.handleSessionSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        
    }
    /** added by elo 19/05 */
        // updateChild(loggedInStatus){
        //     updateState(loggedInStatus)
        // }
        /** end of added by elo 19/05 */
    
    handleSubmit(event) {
        console.log("=== HERE IN POST LOGIN ===");
        axios
            .post(
                baseURL + "/login", 
                {
                    login: this.state.login,
                    password: this.state.password,
                }
            )
            .then(response => {
                console.log("=== LOGIN.JS: youpi ===");//TEST CONSOL
                console.log("===LOGIN.JS=== res from login", response)//TEST CONSOL
                this.setState({ redirection: true });
                console.log("===LOGIN.JS=== this.state.rediction in handleSubmit :",this.state.rerirection);//TEST CONSOL
                this.setState({loginErrors: response.data.message});
                localStorage.setItem('login', response.data.user.login)
                localStorage.setItem('email', response.data.user.email)
                localStorage.setItem('userid', response.data.user.userid)
                localStorage.setItem('admin', response.data.user.admin)
                console.log("===LOGIN.JS ===his.props.loggedInStatus updated in Login.js", this.props.loggedInStatus)//TEST CONSOL
            })
            .catch(error => {
                console.log("===LOGIN.JS===login error...", error)//TEST CONSOL
            });

        console.log("===LOGIN.JS===form submitted");//TEST CONSOL
        event.preventDefault();
        
    }

    handleSessionSubmit(event) {
        event.preventDefault();
        console.log("===LOGIN.JS===HERE IN SESSION !!! ===");//TEST CONSOL
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
        return <Redirect to='/home'/>
               
        }else{
        return (
            <div >
                <h1>Login</h1>
                <Card className="login" style={{ width: '30rem' , margin:'auto'}}>
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
                        <Form.Group controlId="formBasicPassword">
                            <Form.Control
                                type="text"// to change
                                name="password"
                                placeholder="password"
                                value={this.state.password}
                                onChange={this.handleChange}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">Login</Button>
                    </Form>
                    <p className="error">{this.state.loginErrors}</p>
                </Card.Body>
                </Card>
            </div>
        );
        }
    }
}

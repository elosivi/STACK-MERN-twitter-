import React, { Component } from 'react';

import AuthContext from "./AuthContext"

import axios from 'axios';
import { Redirect } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Card } from 'react-bootstrap';
import './style.css';

const baseURL = "http://localhost:4242";
axios.defaults.withCredentials = true;



export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            login: "",
            password: "",
            loginError: "",
            email:"",
            admin:"",
            redirection: false
        }
        

        console.log("===LOGIN.JS===this.state.rediction in constructor :",this.state.rerirection);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        
    }
    /** added by elo 19/05 */
        // updateChild(loggedInStatus){
        //     updateState(loggedInStatus)
        // }
        /** end of added by elo 19/05 */
    
    handleSubmit(event) {
        event.preventDefault();
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
                localStorage.setItem('localStorageLogin', response.data.user.login);
                // localStorage.setItem('login', response.data.user.login)
                // localStorage.setItem('email', response.data.user.email)
                // localStorage.setItem('userid', response.data.user._id)
                // localStorage.setItem('admin', response.data.user.admin)
                console.log("===LOGIN.JS ===his.props.loggedInStatus updated in Login.js", this.props.loggedInStatus)//TEST CONSOL
                
                this.props.onLogin(response.data.user.login);
                //ADDED BY ELO 19:05
                // this.updateChild(response.data.user.login)
                // console.log("===LOGIN.JS ===his.props.loggedInStatus updated in Login.js VS2", this.props.loggedInStatus)
                // this.props.updateApp
                
                    // localStorage.setItem("user", this.state.user);
                // this.state.user.email = response.data.user.email,
                // this.state.user.admin = response.data.user.admin,
                // localStorage.setItem("user_login", response.data.user.login);
                // localStorage.setItem("user_email", response.data.user.email);
                // localStorage.setItem("user_right", response.data.user.admin);
                //END OF ELO//
            })
            .catch(error => {
                console.log("===LOGIN.JS===login error...", error)//TEST CONSOL
                this.setState({
                    loginError: error.message
                })
            });

        console.log("===LOGIN.JS===form submitted");//TEST CONSOL
        
        
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
        const booleen = false;
        let myDiv;
        if (booleen) {
            myDiv = <h3>{this.state.loginError}</h3>
        }
        const { redirection } = this.state;
        if (redirection) {
        //Affichage de la redirection
        return <Redirect to='/home'/>
        
        }else{
        return (
            <AuthContext.Provider>
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
                                type="password"// to change
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

                {myDiv}

            </div>
            </AuthContext.Provider>
        );
        }
    }
}

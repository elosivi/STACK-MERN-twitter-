import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import './style.css';
import MyLeaders from './myLeaders';
import MyFollowers from './myFollowers';
import Users from './Users';

const baseURL = "http://localhost:4242";
axios.defaults.withCredentials = true;

export default class UsersView extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            users:[],
            userLogged:"",
            leaders:[],
        };  
        this.getLeaders = this.getLeaders.bind(this);
        this.leaderAdd = this.handleAdd.bind(this);
        
    }
        
    componentDidMount() {
        this.getUsers();
        this.getLeaders();
    }

    getUsers(){
        axios
        .get(baseURL+"/admin/users")
        .then(res => {
            const users = res.data.users;
            console.log("===> test get users: "+users)
            this.setState({ users });
        })
        .catch(error => {
            console.log("--> ERROR ! (mess from client) Users/ componentDidMount: ", error)//TEST CONSOL ok 
        });

    }
    
    getLeaders() {
        axios
            .get(baseURL+"/myleaders")
            .then(res => {
            const leaders = res.data;
            this.setState({ leaders });
            console.log("TTTTEEEEESSSSTTTTT--> ok! (mess from client) Users: leaders from axios:",leaders)
            })
            .catch(error => {
                console.log("--> ERROR ! (mess from client) users: try get myleaders but:", error)//TEST CONSOL ok 
            });
    }

    handleAdd= (leaderId)=> {
        const url= baseURL+"/myleaders/"+leaderId
        console.log("--> OK ! (mess from client) POST calling this:"+url)
        axios
        .post(url)
        .then(res=>{
            const newFollow = res.data;
            this.getLeaders();
            console.log("--> ok ! (mess from client) Users/add follow: ",newFollow)
        })
        .catch(error => {
            console.log("--> ERROR ! (mess from client) Users, handleAdd: ", error)//TEST CONSOL ok 
        });
    }
    

    render(){
        return (
            <Container>
                <Row>
                    <Col><Users users={this.state.users} getLeaders={this.getLeaders}/></Col>
                    <Col><MyLeaders leaders={this.state.leaders} getLeaders={this.getLeaders}/></Col>
                    <Col><MyFollowers getLeaders={this.getLeaders}/></Col>
                </Row>
            </Container>
        )
    }
}


   
    
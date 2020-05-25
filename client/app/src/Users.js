import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import './style.css';
import MyLeaders from './myLeaders';
import MyFollowers from './myFollowers';

const baseURL = "http://localhost:4242";
axios.defaults.withCredentials = true;

export default class Users extends Component {
    
    constructor(props) {
        
        super(props);

        this.state = {
            users:[],
            userLogged:"",
            };
        }

    componentDidMount() {
    axios
        .get(baseURL+"/admin/users")
        .then(res => {
            console.log("===> test user logged id :",localStorage.getItem('userid'))
            const users = res.data.users;
            this.setState({ users });
        })
        .catch(error => {
            console.log("--> ERROR ! (mess from client) Users/ componentDidMount: ", error)//TEST CONSOL ok 
        });
    }
    
    handleAdd(leaderId){
        axios
            .post(baseURL+"")
            .then()
            .catch(error => {
                console.log("===USERS.JS===login error...", error)//TEST CONSOL ok 
            });

    }

    handleAdd= (leaderId)=> {
        const url= baseURL+"/myleaders/"+leaderId
        console.log("--> OK ! (mess from client) POST calling this:"+url)
        axios
        .post(url)
        .then(res=>{
            const newFollow = res.data;
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
                    <Col>
                        <div>
                        <h1>Follolos</h1>
                        
                        {
                            this.state.users.length === 0
                            ? 'Loading Follolos...'
                            : this.state.users.map((user)   => {
                               
                                if(user._id !== localStorage.getItem('userid')){
                                
                                    return(
                                    <div>
                                        <div className="flex">
                                            <h4 key={user._id}>{user.login}</h4>
                                            <button onClick={() => this.handleAdd(user._id)}>Follow</button>
                                        </div>
                                        <p>{user.email}</p>
                                        
                                    </div>
                                    )
                                }
                            })
                        }
                
                        </div>
                    </Col>
                    <Col><MyLeaders /></Col>
                    <Col><MyFollowers /></Col>
                </Row>
     
            </Container>
        )
    }
}

   
    
import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import './style.css';
import  MyFollowers from "./myFollowers";
import  MyLeaders from "./myLeaders";

const baseURL = "http://localhost:4242";
axios.defaults.withCredentials = true;

export default class Users extends Component {

    constructor(props) {
        super(props);

        this.state = {
            users:[]
            };
        }

    componentDidMount() {
    axios
        .get(baseURL+"/admin/users")
        .then(res => {
        const users = res.data.users;
        this.setState({ users });
        console.log("users .then res:", res) //TEST CONSOL ok
        console.log("users .then  res.data.users:", res.data.users) //TEST CONSOL ok
        console.log("===Users.JS=== users in state:"+this.state.users);//TEST CONSOL
        })
        .catch(error => {
            console.log("===USERS.JS===login error...", error)//TEST CONSOL ok 
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

  render(){
    return (
       
        <Container>
        <Row >
            
            <Col > 
                 <MyFollowers />        
            </Col>

            <Col>    
                <MyLeaders />   
            </Col>

            <Col> 
                <h1>All Follolos</h1>
                
                    {
                        this.state.users.length === 0
                        ? 'Loading Follolos...'
                        : this.state.users.map((user) => {return(
                        <div>
                            <h4 key={user._id}>{user.login}</h4>
                            <p>{user.email}</p>
                            <button onClick={() => this.handleAdd(user._id)}>
                                Follow
                            </button>
                           
                        </div>
                        )
                        })
                    }
            
            </Col>
        </Row>
        </Container>
      
    )
  }
}

   
    
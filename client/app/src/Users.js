import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

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

  render(){
    return (
        <div> 
            <h1>Follolos</h1>
            
                {
                    this.state.users.length === 0
                    ? 'Loading Follolos...'
                    : this.state.users.map((user) => {return(
                    <div>
                        <h4 key={user.id}>{user.login}</h4>
                        <p>{user.email}</p>
                        <button>Follow</button>
                        <button>Stop Follow</button>
                        <button>Block </button>
                    </div>
                    )
                    })
                }
           
        </div>
      
    )
  }
}

   
    
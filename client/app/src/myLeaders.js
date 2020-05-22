import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

const baseURL = "http://localhost:4242";
axios.defaults.withCredentials = true;

export default class MyLeaders extends Component {

    constructor(props) {
        super(props);
        this.state = {
            leaders:[]
            };
        }

    componentDidMount() {

    axios
        .get(baseURL+"/myleaders")
        .then(res => {
        const leaders = res.data;
        this.setState({ leaders });
        console.log("--> ok! (mess from client) myLeaders: leaders from axios:",leaders)
        })
        .catch(error => {
            console.log("--> ERROR ! (mess from client) leaders: try get myleaders but:", error)//TEST CONSOL ok 
        });
    }

  render(){
    
        const myLeaders = this.state.leaders;
        let result;
        console.log("my leaders:" + myLeaders)

        if(myLeaders.length === 0){
            result = "No leaders in your relationships";
        }else{
            result = 
            (this.state.leaders.map((leader) => {return(
                <div>
                    <h4 key={leader.leaderId}>{leader.leaderLogin}</h4>
                    <p>Blocked: {leader.blocked}</p>
                    <button>Follow</button>
                    <button>Stop Follow</button>
                    <button>Block </button>
                </div>)
            })
            )
        }

        return(
            <div >
                <h1>My leaders</h1>
                {result}

            </div>
    )
  }
}
import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

const baseURL = "http://localhost:4242";
axios.defaults.withCredentials = true;

export default class MyFollowers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            followers:[]
            };
        }

    componentDidMount() {

    axios
        .get(baseURL+"/myfollowers")
        .then(res => {
        const followers = res.data;
        console.log("--> ok! (mess from client) myFollowers:followers from axios:",followers)
        this.setState({ followers });
        })
        .catch(error => {
            console.log("--> ERROR ! (mess from client) followers: try get myfollowers but:", error)//TEST CONSOL ok 
        });
    }

  render(){
    
        const myFollowers = this.state.followers;
        let result;
        console.log("my followers:" + myFollowers)

        if(myFollowers.length === 0){
            result = "No followers in your relationships";
        }else{
            result = 
            (this.state.followers.map((follower) => {return(
                <div>
                    <h4 key={follower.followerId}>{follower.followerLogin}</h4>
                    <p>Blocked: {follower.blocked}</p>
                    <button>Follow</button>
                    <button>Stop Follow</button>
                    <button>Block </button>
                </div>)
            })
            )
        }

        return(
            <div>
                <h1>My Followers</h1>
                {result}

            </div>
    )
  }
}
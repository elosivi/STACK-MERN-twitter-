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
        this.getFollowers();
    }

    getFollowers(){
        axios
        .get(baseURL+"/myfollowers")
        .then(res => {
        const followers = res.data;
        console.log("--> ok! (mess from client) myFollowers:followers from axios2:",followers)
        this.setState({ followers });
        })
        .catch(error => {
            console.log("--> ERROR ! (mess from client) followers: try get myfollowers2 but:", error)//TEST CONSOL ok 
        });
    }
    

    handleAdd= (leaderId)=> {
        const url= baseURL+"/myleaders/"+leaderId
        console.log("--> OK ! (mess from client) POST calling this:"+url)
        axios
        .post(url)
        .then(res=>{
            const newFollow = res.data;

            //update parent's state.leaders
            this.props.getLeaders()
            console.log("--> ok ! (mess from client) Users/add follow: ",newFollow);
            
        })
        .catch(error => {
            console.log("--> ERROR ! (mess from client) Users, handleAdd: ", error)//TEST CONSOL ok 
        });
    }

    Block= (followerId)=> {
        const url= baseURL+"/blockFollower/"+followerId
        console.log("--> OK ! (mess from client) POST calling this:"+url)
        axios
        .put(url)
        .then(res=>{
            const blockInfo = res.data;
            console.log("--> ok ! (mess from client) Users blocked: ",blockInfo)
            this.getFollowers();
        })
        .catch(error => {
            console.log("--> ERROR ! (mess from client) Users, Block: ", error)//TEST CONSOL ok 
        });
    }

    Unblock= (followerId)=> {
        const url= baseURL+"/unblockFollower/"+followerId
        console.log("--> OK ! (mess from client) POST calling this:"+url)
        axios
        .put(url)
        .then(res=>{
            const blockInfo = res.data;
            console.log("--> ok ! (mess from client) Users blocked: ",blockInfo)
            this.getFollowers();
        })
        .catch(error => {
            console.log("--> ERROR ! (mess from client) Users, Block: ", error)//TEST CONSOL ok 
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
            (this.state.followers.map((follower) => {
                
                if(follower.blocked === true){
                
                    return(
                    <div>
                        <h4 key={follower.followerId}>{follower.followerLogin}</h4>
                        <p>Blocked </p>
                        <button onClick={() => this.handleAdd(follower.followerId)}>Follow</button>
                        <button onClick={() => this.Block(follower.followerId)}>Block </button>
                        <button onClick={() => this.Unblock(follower.followerId)}>Unblock </button>
                    </div>)
                }else{
                    return(
                        <div>
                            <h4 key={follower.followerId}>{follower.followerLogin}</h4>
                            <button onClick={() => this.handleAdd(follower.followerId)}>Follow</button>
                            <button onClick={() => this.Block(follower.followerId)}>Block </button>
                            <button onClick={() => this.Unblock(follower.followerId)}>Unblock </button>
                        </div>)

                }
            })
            )
        }

        return(
            <div>
                <h2>My Followers</h2>
                {result}

            </div>
    )
  }
}
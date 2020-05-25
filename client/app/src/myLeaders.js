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
        this.getLeaders();
    }

    getLeaders() {
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

    stopFollow= (leaderId)=> {
        const url= baseURL+"/myleaders/"+leaderId
        console.log("--> OK ! (mess from client) DELETE from myLeaders calling this:"+url)
        axios
        .delete(url)
        .then(res=>{
            const newFollow = res.data;
            console.log("--> ok ! (mess from client) myLeaders/add follow: ",newFollow)
            this.getLeaders();
        })
        .catch(error => {
            console.log("--> ERROR ! (mess from client) myLeaders, handleAdd: ", error)//TEST CONSOL ok 
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
            (this.state.leaders.map((leader) => {
                
                if(leader.blocked === true){
                
                return(
                <div>
                    <h4 key={leader.leaderId}>{leader.leaderLogin}</h4>
                    <p>Blocked me</p>
                    <button onClick={() => this.stopFollow(leader.leaderId)}>Stop follow</button>
    
                </div>)
            }else{
                return(
                    <div>
                        <h4 key={leader.leaderId}>{leader.leaderLogin}</h4>
                        <button onClick={() => this.stopFollow(leader.leaderId)}>Stop follow</button>
                       
                    </div>)

            }
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
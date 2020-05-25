import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
// import UsersView from './UsersView';

const baseURL = "http://localhost:4242";
axios.defaults.withCredentials = true;

export default class MyLeaders extends Component {

    constructor(props) {
        super(props);
    }


    stopFollow= (leaderId)=> {
       
        const url= baseURL+"/myleaders/"+leaderId
        console.log("--> OK ! (mess from client) DELETE from myLeaders calling this:"+url)
        axios
        .delete(url)
        .then(res=>{
            const stopFollowData = res.data;
            console.log("--> ok ! (mess from client) myLeaders/stop follow: ",stopFollowData)
            
            //update parent's state.leaders
            this.props.getLeaders()
            
        })
        .catch(error => {
            console.log("--> ERROR ! (mess from client) myLeaders, handleAdd: ", error)//TEST CONSOL ok 
        });
    }

    


    render(){
    
        const myLeaders = this.props.leaders;
        let result;
       

        if(myLeaders.length === 0){
            result = "No leaders in your relationships";
        }else{
            result = 
            (myLeaders.map((leader) => {
                
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
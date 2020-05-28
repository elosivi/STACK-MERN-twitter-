import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import { RiUserUnfollowLine } from 'react-icons/ri';

const baseURL = "http://localhost:4242";
axios.defaults.withCredentials = true;

export default class MyLeaders extends Component {

    // constructor(props) {
    //     super(props);
    // }

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
                <div className="userProfil">
                    <div className="flex ">
                        <p className="at">@</p>
                        <h4 key={leader.leaderId}>{leader.leaderLogin}</h4>
                        <p className="at"> (Blocked me)</p>
                        <div className="usersButton RightAlign">
                            <button onClick={() => this.stopFollow(leader.leaderId)}className="Follow white">.....<RiUserUnfollowLine /></button>
                        </div>
                    </div>
                </div>
                )
            }else{
                return(
                    <div className="userProfil">
                        <div className="flex ">
                            <p className="at">@</p>
                            <h4 key={leader.leaderId}>{leader.leaderLogin}</h4>
                            <div className="usersButton RightAlign">
                                <button onClick={() => this.stopFollow(leader.leaderId)} className="Follow white" title="stop follow">.....<RiUserUnfollowLine /></button>
                            </div>
                        </div>
                    </div>
                    )

            }
        })
        )
    }
        return(
            <div >
                <h2 className="soulignement ">My leaders</h2>
                {result}

            </div>
    )
  }
}
import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

import { RiUserFollowLine   } from 'react-icons/ri';

const baseURL = "http://localhost:4242";
axios.defaults.withCredentials = true;



export default class Users extends Component {

    // constructor(props) {
    //     super(props);
    // }

    handleAdd= (leaderId)=> {
        const url= baseURL+"/myleaders/"+leaderId
        console.log("--> OK ! (mess from client) POST calling this:"+url)
        axios
        .post(url)
        .then(res=>{
            const newFollow = res.data;

            //update parent's state.leaders
            this.props.getLeaders()
            console.log("--> ok ! (mess from client) Users/add follow: ",newFollow)
        })
        .catch(error => {
            console.log("--> ERROR ! (mess from client) Users, handleAdd: ", error)//TEST CONSOL ok 
        });
    }

    

    render(){
        console.log("---->test: this props users: " + this.props.users)
        const users = this.props.users;
        let result;

        if(users.length === 0){
            result= "Loading users ..."
        }else{
            result=
            (
                users.map((user) => {
                    if(user._id !== localStorage.getItem('userid')){
                        return(
                        <div className="userProfil">
                            <div className="flexFullScreen">
                                <div className="flex">
                                    <p className="at">@</p>
                                    <h4 key={user._id}>{user.login}</h4>
                                </div>
                                <div className="usersButton RightAlign">
                                    <button onClick={() => this.handleAdd(user._id)} className="Follow" title="follow">.....<RiUserFollowLine/></button>
                                </div>
                            </div>
                            <p>{user.email}</p>
                        </div>
                        )
                    }
                })
            )
        }

        return(
            <div>
                <h2 className="soulignement">Users</h2>
                {result}
            </div>
        )
    }          
                    
}
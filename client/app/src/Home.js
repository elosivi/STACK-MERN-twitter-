import React, { Component } from 'react';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: this.props.loggedInStatus
        }
        console.log(this.state.loggedIn);
    }

    render() {
        return (
            <div>
                <h2>{this.state.loggedIn}</h2>
            </div>
        )
    }

}

import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';

import Registration from './Registration'
import Login from './Login'
// import './index.css';


class App extends React.Component {
    render() {
        return (
            <div>
                <h1>Registration</h1>
                <Registration />
            </div>

        );
    }
}

// ========================================

ReactDOM.render(
    <App />,
    document.getElementById('root')
);

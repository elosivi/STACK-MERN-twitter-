import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import { GrChatOption } from 'react-icons/gr';
import { AiOutlineArrowUp, AiFillWechat } from 'react-icons/ai';
import MyNav from './myNav';
import './style.css';


class App extends React.Component {
    constructor(props) {
        super(props);
        // this.myRef = React.createRef() 
        this.state = {
            loggedInStatus: "NOT_LOGGED_IN",
            is_visible: false,
            user: {
                login: "NOT LOGGED IN"
                
            },
            userLogin: ""
        }
        
        this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
        this.handleIndexLogin = this.handleIndexLogin.bind(this);
        
    }

    componentDidMount() {
        var scrollComponent = this;
        document.addEventListener("scroll", function(e) {
          scrollComponent.toggleVisibility();
        });
      }
      
      toggleVisibility() {
        if (window.pageYOffset > 150) {
          this.setState({
            is_visible: true
          });
        } else {
          this.setState({
            is_visible: false
          });
        }
    }
    
    scrollToTop() {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }

    updateState(){
        this.setState({ loggedInStatus: "LOGGED_IN"});
    }
 
    handleSuccessfulAuth(data) {
        this.setState({
            user: data.user,
            loggedInStatus: data.user.login,
            userLogin: ""
        });

        console.log("=== INDEX.JS state === this.state.user:", this.state.user);
      
    }

    handleIndexLogin(userLogin){
        console.log("From index !!!!", userLogin)
        this.setState({
            userLogin: userLogin
        })
        localStorage.setItem("coucou ", userLogin);
    }

    render() {

        return (
            <div>
               
                <div className="microbloggos">
                    <h1>MICRO-BLOGGOS</h1>
                    <p className="chatIcon"><AiFillWechat /></p>
                </div>
                <div>
                    <MyNav />
                </div>
                <div className="scroll-to-top">
                        {this.state.is_visible && (
                            <button onClick={() => this.scrollToTop()} className="buttonTop">
                                Top <AiOutlineArrowUp />
                            </button>
                        )}
                </div>
                
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <App />,
    document.getElementById('root')
);



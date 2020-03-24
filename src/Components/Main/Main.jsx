import React from 'react';
import "./Main.css";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ReactDOM from 'react-dom';
import App from '../App/App.jsx';
import Chat from '../Chat/Chat.jsx';
import Navigation from '../Navigation/Navigation.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import firebase, { auth, provider } from "../../firebaseConfig.js"

export const db = firebase.database();
class Main extends React.Component {
    constructor() {
        super();
        this.state = {
          user: null            
        }
        this.login = this.login.bind(this); 
        this.logout = this.logout.bind(this); 
    }
    componentDidMount() {
        auth.onAuthStateChanged((user) => {
          if (user) {
            this.setState({ user });
          } 
        });
    }

    handleChange(e) {
        /* ... */
      }
      logout() {
        auth.signOut()
        .then(() => {
          this.setState({
            user: null
          });
        });
      }
      login() {
        auth.signInWithPopup(provider) 
          .then((result) => {
            const user = result.user;
            this.setState({
              user
            });
          });
      }
   render() {
        return (
            
            <div className="bg2">

            <Navigation user={this.state.user} login = {this.login} logout = {this.logout} >
            
            </Navigation>
            <BrowserRouter>
            <Switch>
            <Route exact path="/" component={App} />
            <Route path="/movies/:id" component={Chat} />
            </Switch>

            </BrowserRouter>

            </div>
        )
    }
}
export default Main;

 
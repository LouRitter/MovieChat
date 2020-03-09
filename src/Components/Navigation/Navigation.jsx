import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import './Navigation.css';
import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';




const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

class Navigation extends React.Component {
  render() {
    // const {
    //   user,
    //   signOut,
    //   signInWithGoogle,
    // } = this.props;

     return (
      <Navbar className="navbar">
      <Navbar.Brand href="/">
        <img
          src={require('../../movietalk.png')} 
          width="auto"
          height="60"
          className="d-inline-block align-top"
          alt="React Bootstrap logo"
        />
      </Navbar.Brand>
      <Navbar.Toggle />
    <Navbar.Collapse className="justify-content-end">
  
  
      <Navbar.Text className ="accounttext">
  
      {this.props.user ?
        <button className="signinout" onClick={this.props.logout}>Log Out</button>                
        :
        <button className="signinout" onClick={this.props.login}>Log In</button>              
      }
      </Navbar.Text>
  
    </Navbar.Collapse>
    </Navbar>
     )
     }
    } export default Navigation; 
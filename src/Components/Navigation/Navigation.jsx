import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import './Navigation.css';
import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from '../../firebaseConfig';



const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

class Navigation extends React.Component {
  render() {
    const {
      user,
      signOut,
      signInWithGoogle,
    } = this.props;
     return (
      <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">
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
  
        {
          user
            ? <p>Hello, {user.displayName}</p>
  
            : <button className="signinout" onClick={signInWithGoogle}>Sign in with Google</button>
            
        }    
      </Navbar.Text>
  
    </Navbar.Collapse>
    </Navbar>
     )
     }
    } export default withFirebaseAuth({
      providers,
      firebaseAppAuth,
    })(Navigation);
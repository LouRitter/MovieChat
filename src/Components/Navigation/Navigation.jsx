import React, { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import './Navigation.css';
import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Modal';




class Navigation extends React.Component {
  constructor() {
    super();
    this.state = {
      show: false,
      setShow: false
    }
  }
  
  
  render() {
    // const {
    //   user,
    //   signOut,
    //   signInWithGoogle,
    // } = this.props;

    
    const handleClose = () => this.setState({show:false});
    const handleShow = () => this.setState({show:true});
     return (
      <div>
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
          <button className="signinout" onClick={handleShow}>Log Out</button>                
          :
          <button className="signinout" onClick={handleShow}>Log In</button>              
        }
        </Navbar.Text>
    
      </Navbar.Collapse>
      </Navbar>
      <Modal show={this.state.show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
    </div>
     )
     }
    } export default Navigation; 
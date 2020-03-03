import React from 'react';
import unirest from 'unirest';
import './Chat.css';
import Navbar from 'react-bootstrap/Navbar';

import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from '../../firebaseConfig';




class Chat extends React.Component {
    state = {
        title: { },
        image:{ },
        plotOutline:{},
        id: {}
    }
    sendRequest = (id) => {
        var req = unirest("GET", "https://imdb8.p.rapidapi.com/title/get-overview-details");

        req.query({
            "tconst": id
        });
        
      req.headers({
       "x-rapidapi-host": "imdb8.p.rapidapi.com",
       "x-rapidapi-key": "GJnF3zwATmmshyz03tiXO7Rg13v6p1RDW2bjsnKV4XqoYfWoRj"
      });
      req.end((res) => {
       if (res.error) throw new Error(res.error);
       const details = res.body;
       console.log(details);
       this.setState({title: details.title,
        image: details.image, 
        plotOutline: details.plotOutline, 
        id: details.id});
     });
     
    }
    componentDidMount(){
        var id = this.props.location.state.id.id.replace("/title/","");
        id = id.replace('/','');
        this.sendRequest(id);
    }

    render() {
        const title = this.state.title
        console.log(title.title);
        return (

            <div className = "Chat">
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
        this.props.user
          ? <p>Hello, {this.props.user.displayName}</p>

          : <button className="signinout" onClick={this.props.signInWithGoogle}>Sign in with Google</button>
          
      }    
    </Navbar.Text>

  </Navbar.Collapse>
  </Navbar>
            <h1>{title.title}</h1>
            </div>
        );

    }
  }

export default Chat;
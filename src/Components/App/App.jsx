import React from 'react';
import './App.css';
import unirest from 'unirest';
import Movie from "../Movie/Movie.jsx";
import Search from "../Search/Search.jsx";
import Jumbotron from 'react-bootstrap/Jumbotron';
import CardColumns from 'react-bootstrap/CardColumns';
import Navbar from 'react-bootstrap/Navbar';

import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from '../../firebaseConfig';



const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

class App extends React.Component {

  state = {
     movies: []
 }
 sendRequest = (title) => {
  var req = unirest("GET", "https://imdb8.p.rapidapi.com/title/find");
  req.query({
    "q": title

   });
   req.headers({
    "x-rapidapi-host": "imdb8.p.rapidapi.com",
    "x-rapidapi-key": "GJnF3zwATmmshyz03tiXO7Rg13v6p1RDW2bjsnKV4XqoYfWoRj"
   });
   req.end((res) => {
    if (res.error) throw new Error(res.error);
    const movies = res.body.results;
    
    this.setState({movies});
  });
  
 }
 render() {
  const {
    user,
    signOut,
    signInWithGoogle,
  } = this.props;
   return (

     <div className="App">
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
       <header className="App-header">
      <h1>Search For A Movie</h1>
      <Search handleSendRequest={this.sendRequest}/>


       </header>
       <CardColumns>
       {

        // eslint-disable-next-line array-callback-return
        this.state.movies.map((movie) => {
          if(movie.image && movie.title ){
            return <Movie {...movie}/>
          }
        })
        }

        </CardColumns>
     </div>
     
   );
   
 }
}
export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App);
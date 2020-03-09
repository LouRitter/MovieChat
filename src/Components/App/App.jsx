import React from 'react';
import './App.css';
import unirest from 'unirest';
import Movie from "../Movie/Movie.jsx";
import Search from "../Search/Search.jsx";
import Jumbotron from 'react-bootstrap/Jumbotron';
import CardColumns from 'react-bootstrap/CardColumns';


class App extends React.Component {

  state = {
     movies: [],
     user: null 
 }
 sendRequest = (title) => {

  var request = require("request");
  var options = {
    method: 'GET',
    url: 'https://movie-database-imdb-alternative.p.rapidapi.com/',
    qs: {page: '1', r: 'json', s: title},
    headers: {
      'x-rapidapi-host': 'movie-database-imdb-alternative.p.rapidapi.com',
      'x-rapidapi-key': 'GJnF3zwATmmshyz03tiXO7Rg13v6p1RDW2bjsnKV4XqoYfWoRj'
    }
  };
  
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
  
    const object = JSON.parse(body);
    const movies = object.Search;
    console.log(movies);

    this.setState({movies});
  }.bind(this)); 
 }
 render() {

   return (

     <div className="App">
   
       <Jumbotron className="App-header">
      <h1>Search For A Movie</h1>
      <Search handleSendRequest={this.sendRequest}/>


       </Jumbotron>
       <CardColumns>
       {

        // eslint-disable-next-line array-callback-return
        this.state.movies.map((movie) => {
          if(movie.Title && movie.imdbID){
            return <Movie {...movie}/>
          }
        })
        }

        </CardColumns>
     </div>
     
   );
   
 }
}
export default App;
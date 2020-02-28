import React from 'react';
import './App.css';
import unirest from 'unirest';
import Movie from "./Movie.jsx";
import Search from "./Search.jsx";
import Jumbotron from 'react-bootstrap/Jumbotron';
import CardColumns from 'react-bootstrap/CardColumns';

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
    console.log(res.body.results);
    const movies = res.body.results;
    
    this.setState({movies});
  });
  
 }
 render() {
   return (
     <div className="App">
       <header className="App-header">
        <Search handleSendRequest={this.sendRequest}/>



       </header>
       <CardColumns>
       {

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
export default App;
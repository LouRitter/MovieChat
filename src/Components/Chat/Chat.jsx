import React from 'react';
import unirest from 'unirest';
import './Chat.css';
import Comments from '../Comments/Comments'
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';

class Chat extends React.Component {
    handleToggleClick = this.handleToggleClick.bind(this);
    state = {
        title: "",
        image: "",
        year: "",
        plotOutline:"",
        id: "",
        genres: "",
        ratings: "",
        showMore: true,

    }
    sendRequest = (imdbID) => {
        var request = require("request");

        var options = {
          method: 'GET',
          url: 'https://movie-database-imdb-alternative.p.rapidapi.com/',
          qs: {i: imdbID, r: 'json'},
          headers: {
            'x-rapidapi-host': 'movie-database-imdb-alternative.p.rapidapi.com',
            'x-rapidapi-key': 'GJnF3zwATmmshyz03tiXO7Rg13v6p1RDW2bjsnKV4XqoYfWoRj'
          }
        };
        
        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            const object = JSON.parse(body);
                console.log(object);
                this.setState({
                        title: object.Title,
                        year: object.Year,
                        image: object.Poster, 
                        plotOutline: object.Plot, 
                        id: object.imdbID,
                        genres: object.Genre,
                        ratings: object.imdbRating 
                    });
     }.bind(this));
     
    }

    handleToggleClick() {
        this.setState(state => ({
          showMore: !state.showMore
        }));
      }

    componentDidMount(){
        var id = this.props.match.params.id

        console.log(id)
        this.sendRequest(id);
    }

    render() {
        const title = this.state.title;
        
        let  shortPlot = "";

        if(this.state.plotOutline.text != null && this.state.plotOutline.text.length > 150){
            shortPlot = this.state.plotOutline.text.substring(0, this.state.plotOutline.text.indexOf(".") +1);

        }else{
            shortPlot = this.state.plotOutline.text;
        }
        
        return (
            <div className = "Chat">
                <Jumbotron className="Jumbo">

                <div className='row'>
                <div className="imgholder col-md-4">
                <img className='poster' src={this.state.image} alt="poster"/>
                </div>
                <div className='col-md-8 movietext'>
                    <div className="row">
                    <h1>{title}</h1>
                    <h3 className="movieyear">({this.state.year})</h3>
                    </div>

                <div className="row plotRow">
                {this.state.showMore ? ( 

                    <span className='details'>{this.state.plotOutline} 
                    <Button className="showMoreButton btn-xs" onClick={this.handleToggleClick}>Show Less</Button>
                    </span>

                ) : (
                    <span className ="details" >{shortPlot} 
                    <Button className="dots" onClick={this.handleToggleClick}>Info</Button>
                    </span>
                )}
                </div>
                <div className="row">
                    <span className="genreList col-md-6"><b>Genres:</b> {this.state.genres}</span>
                    <span className="genreList col-md-6"><b>Rating:</b> {this.state.ratings}</span>
                </div>
                </div>
                </div>

                </Jumbotron>
                <Comments movieid = {this.props.match.params.id}></Comments>
            </div>
        );

    }
  }

export default Chat;
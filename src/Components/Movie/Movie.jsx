import React from 'react';
import "./Movie.css";
import {Switch, Link} from "react-router-dom"
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
class Movie extends React.Component {
   render() {
       const {Title, imdbID, Poster, Year} = this.props;
       return (
           <Card style={{ width: '18rem', backgroundColor: '#282c34' }} className="movie">
               <Card.Body>
                <div className="title-year">
                    <Card.Title className="title">{Title}</Card.Title>
                    <Card.Subtitle className="year">{Year}</Card.Subtitle>
                </div>
               </Card.Body>

                   <Card.Img src={Poster} alt="my movie poster"/>
                   <Link to={{
                            pathname: `movies/${imdbID}`,
                            state: {
                                title: {Title},
                                imdbID: {imdbID},
                                image: {Poster}, 
                                year: {Year}
                            }
                    }}>
                        <Button className="chatbutton">
                            <span>Chat About It</span>
                        </Button>
                    </Link>
           </Card>
       )
   }
}
export default Movie;
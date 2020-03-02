import React from 'react';
import "./Movie.css";
import {Switch, Link} from "react-router-dom"
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
class Movie extends React.Component {
   render() {
       const {title, id,image, year} = this.props;
       return (
           <Card style={{ width: '18rem', backgroundColor: '#282c34' }} className="movie">
               <Card.Body>
                <div className="title-year">
                    <Card.Title className="title">{title}</Card.Title>
                    <Card.Subtitle className="year">{year}</Card.Subtitle>
                </div>
               </Card.Body>

                   <Card.Img src={image.url} alt="my movie poster"/>
                   <Link to={`/movies${id}`}>
                        <Button className="chatbutton">
                            <span>Chat About It</span>
                        </Button>
                    </Link>
           </Card>
       )
   }
}
export default Movie;
import React from 'react';
import "./Movie.css";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
class Movie extends React.Component {
   render() {
       const {title, image, year} = this.props;
       return (
           <Card style={{ width: '18rem', backgroundColor: '#282c34' }} className="movie">
               <Card.Body>
                <div className="title-year">
                    <Card.Title className="title">{title}</Card.Title>
                    <Card.Subtitle className="year">{year}</Card.Subtitle>
                </div>
               </Card.Body>

                   <Card.Img src={image.url} alt="my movie poster"/>

                   <Button variant="primary">Chat About It</Button>

           </Card>
       )
   }
}
export default Movie;
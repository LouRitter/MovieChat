import React from 'react';
import unirest from 'unirest';
import './Chat.css';
import Comments from '../Comments/Comments'
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';

class Chat extends React.Component {
    handleToggleClick = this.handleToggleClick.bind(this);
    state = {
        title: { title:'Please Wait', image:{ url:'https://imgplaceholder.com/330x500/303030'}},
        plotOutline:{},
        id: {},
        genres: [],
        ratings: {},
        showMore: false,

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
       this.setState({
            title: details.title,
            image: details.image, 
            plotOutline: details.plotSummary, 
            id: details.id,
            genres: details.genres,
            ratings: details.ratings
        });
     });
     
    }

    handleToggleClick() {
        this.setState(state => ({
          showMore: !state.showMore
        }));
      }

    componentDidMount(){
        var id = this.props.location.state.id.id.replace("/title/","");
        id = id.replace('/','');
        this.sendRequest(id);
    }

    render() {
        const title = this.state.title;

        console.log(title.title);
        let  shortPlot = "";

        if(this.state.plotOutline.text != null && this.state.plotOutline.text.length > 150){
            shortPlot = this.state.plotOutline.text.substring(0, this.state.plotOutline.text.indexOf(".") +1);

        }else{
            shortPlot = this.state.plotOutline.text;
        }

        const listItems = this.state.genres.map((genre) =>
        <li className="genre">{genre}, </li>
        );
        return (
            <div className = "Chat">
                <Jumbotron className="Jumbo">

                <div className='row'>
                <div className="imgholder col-md-4">
                <img className='poster' src={title.image.url} alt="poster"/>
                </div>
                <div className='col-md-8'>
                <h1>{title.title} ({title.year}) </h1>
                <div className="row plotRow">
                {this.state.showMore ? ( 

                    <span className='details'>{this.state.plotOutline.text} 
                    <Button className="showMoreButton btn-xs" onClick={this.handleToggleClick}>Show Less</Button>
                    </span>

                ) : (
                    <span className ="details" >{shortPlot} 
                    <Button className="dots" onClick={this.handleToggleClick}>...</Button>
                    </span>
                )}
                </div>
                <div className="row">
                    <span className="genreList col-md-6"><b>Genres:</b> {listItems}</span>
                    <span className="genreList col-md-6"><b>Rating:</b> {this.state.ratings.rating}</span>
                </div>
                </div>
                </div>

                </Jumbotron>
                <Comments></Comments>
            </div>
        );

    }
  }

export default Chat;
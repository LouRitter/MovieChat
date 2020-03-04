import React from 'react';
import unirest from 'unirest';
import './Chat.css';

import Jumbotron from 'react-bootstrap/Jumbotron';


class Chat extends React.Component {
    state = {
        title: { title:'Please Wait', image:{ url:'https://via.placeholder.com/300x500'}},
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
        plotOutline: details.plotSummary, 
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
            <Jumbotron className="Jumbo">
            <div className = "Chat">
                <h1>{title.title}</h1>
                <div className='row'>
                <div className="imgholder col-md-4">
                <img className='poster' src={title.image.url} alt="poster"/>
                </div>
                <span className='col-md-8'>{this.state.plotOutline.text}</span>

                </div>
            </div>
            </Jumbotron>
        );

    }
  }

export default Chat;
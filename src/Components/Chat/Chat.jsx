import React from 'react';
import unirest from 'unirest';

class Chat extends React.Component {
    state = {
        details: []
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
        console.log(id);
       if (res.error) throw new Error(res.error);
       console.log(res.body);
       const details = res.body.body;
       
       this.setState({details});
     });
     
    }
    componentDidMount(){
        var id = this.props.location.state.id.id.replace("/title/","");
        id = id.replace('/','');
        this.sendRequest(id);
    }

    render() {
      return (<h1>Hello, {this.props.title}</h1>);
      
    }
  }

export default Chat;